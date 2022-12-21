const User = require('../models/userModels');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const mailService = require('./mailService');
const tokenService = require('./tokenService');
const userDTO = require('../dtos/userDto');

class UserService {
    async registration(login, email, password, rep_password, role) {
        try {
            const candidate = await User.findOne({where: login});
            if (candidate) {
                throw new Error(`Пользоавтель с логином ${login} уже существует`);
            }
            if (password !== rep_password) {
                throw new Error(`Пользоавтель с логином ${login} уже существует`);
            }
            const hashPassword = await bcrypt.hash(password, 5);
            const activationLink = uuid.v4();

            let user = await User.create({login, password: hashPassword, activationLink});
            if(email) {
                await mailService.sendActivationMail(email, activationLink);
            }

            const userDto = new userDTO(user);
            const tokens = tokenService.generateTokens({...userDTO});
            await tokenService.saveToken(userDto.id, tokens.refreshJWT);

            return {...tokens, user: userDto}
        } catch (e) {
            console.log(e);
            res.status(500).json({message: "Registration error!"});
        }
    }
}

module.exports = new UserService();