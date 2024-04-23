const sequelize = require('../db')
const {DataTypes, STRING} = require('sequelize')

const User = sequelize.define('users', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    user_name: {type: DataTypes.STRING, unique: true, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false},
    phone_number: {type: DataTypes.STRING, unique: true, allowNull: false},
    role: {type: DataTypes.STRING, defaultValue: "USER"}
}, {
    timestamps: true,
<<<<<<< HEAD
=======
    paranoid: true,
    underscored: true,
    freezeTableName: true,
>>>>>>> fa7c04319f7d690b5e5fb4b529af085213b3588c
    timezone: 'SYSTEM' // Добавить эту строку
} )

const Levels = sequelize.define('levels', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    url: {type: DataTypes.STRING, unique: true, allowNull: false},
    img: {type: DataTypes.STRING, allowNull: true}
}, {
    timestamps: true,
<<<<<<< HEAD
=======
    paranoid: true,
    underscored: true,
    freezeTableName: true,
>>>>>>> fa7c04319f7d690b5e5fb4b529af085213b3588c
    timezone: 'SYSTEM' // Добавить эту строку
})

const Tokens = sequelize.define('tokens', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    token: {type: DataTypes.STRING, unique: true, allowNull: false},
    tokenStatus: {type: DataTypes.BOOLEAN, defaultValue: 0},
    passDate: {type: DataTypes.DATE}
}, {
    timestamps: true,
<<<<<<< HEAD
=======
    paranoid: true,
    underscored: true,
    freezeTableName: true,
>>>>>>> fa7c04319f7d690b5e5fb4b529af085213b3588c
    timezone: 'SYSTEM' // Добавить эту строку
})

Levels.hasMany(Tokens)
User.hasMany(Tokens)

module.exports = {
    User,
    Levels,
    Tokens
}