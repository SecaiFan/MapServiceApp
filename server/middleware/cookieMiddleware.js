const jwt = require('jsonwebtoken');
const User = require('../models/userModels');
const ApiError = require('../errors/apiError');

module.exports = function (req, res, next) {
    if(req.method === 'OPTIONS') {
        next();
    }
    try {
        const refreshToken = req.cookies;
        if(!refreshToken) throw ApiError.unauthorizedError('Пользователь не авторизован');
        /*const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.login = decoded.login;*/
        console.log();
        next();
    } catch(e) {
        return res.status(401).json({message:"Cookie error"});
    }
};