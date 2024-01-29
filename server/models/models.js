const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('users', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    user_name: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING}
})

module.exports = {
    User
}