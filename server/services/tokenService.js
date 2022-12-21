const jwt = require('jsonwebtoken');
const token = require('../models/tokenModel');
const {Sequelize} = require("sequelize");

class TokenService {
    generateTokens(payload) {
        const accessJWT = jwt.sign(payload, process.env.JWT_ACCESS_KEY, {expiresIn: '30m'});
        const refreshJWT = jwt.sign(payload, process.env.JWT_REFRESH_KEY, {expiresIn: '30d'});
        return {accessJWT, refreshJWT}
    }
    async saveToken(userID, refreshToken) {
        const possiblyData = await token.findOne({userId: userID});
        if(possiblyData) {
            await possiblyData.update({refreshToken});
            /*possiblyData.refreshToken = refreshToken;
            return possiblyData.save();*/
            return possiblyData;
        }
        const token = await token.create({userId: userID, refreshToken});
        return token;
    }
}

module.exports = new TokenService();