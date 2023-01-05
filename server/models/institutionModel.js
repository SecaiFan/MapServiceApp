const sequelize = require('../DB.js');
const {DataTypes, Sequelize} = require('sequelize');
const User = require('./userModels');

const Institution = Sequelize.define('institution', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    owner: {},
});

Institution.hasOne(User);
User.belongsTo(Institution);

