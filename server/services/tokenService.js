const Token = require('../models/tokenModel');
const jwt = require('jsonwebtoken');
const {Sequelize} = require("sequelize");

class TokenService {
    generateTokens(payload) {
        console.log('Payload', payload);
        const accessJWT = jwt.sign(payload, process.env.JWT_ACCESS_KEY, {expiresIn: '30m'});
        const refreshJWT = jwt.sign(payload, process.env.JWT_REFRESH_KEY, {expiresIn: '30d'});
        return {accessJWT, refreshJWT}
    }
    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_KEY);
            return userData;
        } catch(e) {
            return null;
        }
    }
    validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_KEY);
            return userData;
        } catch(e) {
            return null;
        }
    }
    async saveToken(userID, refreshToken) {
        const possiblyData = await Token.findOne({where: {userId: userID}});
        if(possiblyData) {
            await possiblyData.update({refreshToken});
            /*possiblyData.refreshToken = refreshToken;
            return possiblyData.save();*/
            return possiblyData;
        }
        const token = await Token.create({userId: userID, refreshToken});
        return token;
    }
    async removeToken(refreshJWT) {
        const token = await Token.destroy({where: {refreshToken: refreshJWT}});
        await Token.sync({alter: true});
        return token;
    }
    async findToken(refreshJWT) {
        const token = await Token.findOne({where: {refreshToken: refreshJWT}});
        return token;
    }
}

module.exports = new TokenService();