const sequelize = require('../db')
const {DataTypes, STRING} = require('sequelize')

const User = sequelize.define('users', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    user_name: {type: DataTypes.STRING, unique: true, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false},
    role: {type: DataTypes.STRING, defaultValue: "User"}
})

const Levels = sequelize.define('levels', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const Tokens = sequelize.define('tokens', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    token: {type: DataTypes.STRING, unique: true, allowNull: false},
})

Levels.hasMany(Tokens)
User.hasMany(Tokens)

module.exports = {
    User,
    Levels,
    Tokens
}