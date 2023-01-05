const User = require('../models/userModels');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const mailService = require('./mailService');
const tokenService = require('./tokenService');
const userDTO = require('../dtos/userDto');
const ApiError = require('../errors/apiError');
const {where} = require("sequelize");

class UserService {
    async registration(login, password, rep_password, role, next) {
        if(!login || !password || !rep_password) {
            throw ApiError.unknownError('Ошибка передачи данных');
        }
        let candidate;
        candidate = await User.findOne({where: {login: login}});
        if (candidate) {
            throw ApiError.badRequest(`Такой пользователь уже существует`);
        }
        if (password !== rep_password) {
            throw ApiError.badRequest(`Пароли не совпадают`);
        }
        const hashPassword = await bcrypt.hash(password, 5);

        let user = await User.create({login, password: hashPassword});
        const userDto = new userDTO(user);
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshJWT);

        return {...tokens, user: userDto};
    }
    async login(login, password, role, next) {
        const user = await User.findOne({where: {login: login}});
        let comparePassword;
        if (!user) throw ApiError.badRequest('Пользователь с таким логином не найден');
        comparePassword = await bcrypt.compare(password, user.password);
        if (!comparePassword) throw ApiError.badRequest("Неверный пароль");

        const userDto = new userDTO(user);
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshJWT);
        return {...tokens, user: userDto};
    }
    async logout(refreshJWT) {
        const token = await tokenService.removeToken(refreshJWT);
        return token;
    }
    async getActivationLink(refreshToken, email) {
        const activationLink = uuid.v4();
        if(!refreshToken) throw ApiError.unauthorizedError('Пользователь не авторизован');
        if(!email) throw ApiError.badRequest('Некорректный Email');

        const userData = tokenService.validateRefreshToken(refreshToken);
        if(!userData) throw ApiError.unauthorizedError('Пользователь не авторизован');

        let user = await User.update({activationLink: activationLink}, {where: {id: userData.id}});
        await mailService.sendActivationMail(email,
            `${process.env.API_URL}${process.env.PORT}/api/user/activate/${activationLink}`);
        return userData;
    }
    async activate(activationLink) {
        const user = User.findOne({where: {activationLink: activationLink}});
        if (!user) {
            throw ApiError.badRequest('Ссылка активации некорректна');
        }
        await user.update({isActivated: true});
    }
    async refresh(refreshToken) {
        if(!refreshToken) {
            throw ApiError.unauthorizedError('Пользователь не авторизован');
        }
        console.log('token: ', refreshToken);
        const userData = tokenService.validateRefreshToken(refreshToken);

        const tokenDB = await tokenService.findToken(refreshToken);
        if(!userData || !tokenDB) {
            throw ApiError.unauthorizedError('Пользователь не авторизован');
        }

        const user = await User.findByPk(userData.id);
        const userDto = new userDTO(user);
        const tokens = tokenService.generateTokens({...userDTO});
        await tokenService.saveToken(userDto.id, tokens.refreshJWT);
        return {...tokens, user: userDto};
    }
}

module.exports = new UserService();