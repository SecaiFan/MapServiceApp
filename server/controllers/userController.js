const {validationResult, cookie} = require('express-validator');
const userService = require('../services/userServise');
const ApiError = require('../errors/apiError');

class UserController {
    async registration(req, res, next) {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return next(ApiError.badRequest('Ощибка валидации', errors.array()));
            }
            const {login, password, rep_password, role} = req.body;
            const userData = await userService.registration(login, password, rep_password, role);
            res.cookie('refreshToken', userData.refreshJWT,
                {maxAge: 30*24*3600*1000, httpOnly: true,});
            return res.json(userData);
        } catch(e) {
            next(e);
        }
    }
    async login(req, res, next) {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                const fstError = errors.array({ onlyFirstError: true })[0];
                console.log(fstError);
                return res.json({
                    msg: fstError.msg,
                });
            }
            const {login, password, role} = req.body;
            if(!login || !password) {
                return next(ApiError.badRequest("Некорректный login или password!"));
            }
            const userData = await userService.login(login, password, role);
            res.cookie('refreshToken', userData.refreshJWT,
                {maxAge: 30*24*3600*1000, httpOnly: true,});
            return res.json(userData);
        } catch(e) {
            next(e);
        }
    }
    async logout(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const token = await userService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.json(token);
        } catch(e) {
            next(e);
        }
    }
    async check(req, res, next) {
        const {id} = req.query;
        if(!id) return next(ApiError.badRequest('Пользователь не определён'));
        return res.json(id);
    }
    async getActivation(req, res, next) {
        try {
            const {email} = req.body;
            const {refreshToken} = req.cookies;
            const user = await userService.getActivationLink(refreshToken, email);
            return res.json(user);
        }
        catch(e) {
            next(e);
        }
    }
    async activate(req, res, next) {
        try {
            const activationlink = req.params.link;
            await userService.activate(activationlink);
            return res.redirect(process.env.CLIENT_URL);
        } catch(e) {
            next(e);
        }
    }
    async tokenRefresh(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const userData = await userService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken,
                {maxAge: 30*24*3600*1000, httpOnly: true,});
            return res.json(userData);
        }
         catch(e) {
             next(e);
        }
    }
}

module.exports = new UserController();