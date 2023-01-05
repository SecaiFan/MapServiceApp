const ApiError = require('../errors/apiError');
const User = require('../models/userModels');
const tokenService = require('../services/tokenService');

module.exports = function (req, res, next) {
    if(req.method === 'OPTIONS') {
        next();
    }
    try {
        const {accessToken} = req.cookies;
        if(!accessToken) {
            return next(ApiError.unauthorizedError('Требуется подтверждение аккаунта'));
        }
        const userData = tokenService.validateAccessToken(accessToken);
        if(!userData) {
            return next(ApiError.unauthorizedError('Требуется подтверждение аккаунта'));
        }
        const user = User.findOne({where: {login: userData.login}});
        if(user.isActivated !== true) {
            return next(ApiError.unauthorizedError('Требуется подтверждение аккаунта'));
        }
        req.user = userData;
        next();
    } catch(e) {
        return next(ApiError.unauthorizedError('Требуется подтверждение аккаунта'));
    }
};