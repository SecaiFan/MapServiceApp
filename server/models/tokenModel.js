const sequelize = require('../DB.js');
const {DataTypes} = require('sequelize');

const Token = sequelize.define('token', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    refreshToken: {type: DataTypes.STRING, required: true}
});

module.exports = Token;