const sequelize = require('../db')
const {DataTypes, STRING} = require('sequelize')

const User = sequelize.define('users', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    user_name: {type: DataTypes.STRING, unique: true, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false},
    phone_number: {type: DataTypes.STRING, unique: true, allowNull: false},
    role: {type: DataTypes.STRING, defaultValue: "USER"}
})

const Levels = sequelize.define('levels', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    url: {type: DataTypes.STRING, unique: true, allowNull: false},
    img: {type: DataTypes.STRING, allowNull: true}
})

const Tokens = sequelize.define('tokens', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    token: {type: DataTypes.STRING, unique: true, allowNull: false},
    tokenStatus: {type: DataTypes.BOOLEAN, defaultValue: false},
    passDate: {type: DataTypes.DATE}
})

const Statistic = sequelize.define('statistic', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    timeStart :{type: DataTypes.TIME, allowNull: true},
    timePass: {type: DataTypes.TIME, allowNull: true},
    timeForLevel: {type: DataTypes.TIME, allowNull: true},
    atempts: {type: DataTypes.INTEGER, defaultValue: 0},
})

Levels.hasMany(Tokens)
User.hasMany(Tokens)

Levels.hasMany(Statistic)
User.hasMany(Statistic)

module.exports = {
    User,
    Levels,
    Tokens,
    Statistic
}