const ApiError = require('../error/ApiError')
const {User} = require('../models/models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

/**
 * Генерация JWT токена
 * ХЗ пригодится или нет, пусть поляжит
 * @param {*} id 
 * @param {*} user_name 
 * @returns 
 */
const generateJWT = (id, user_name, role) => {
    return jwt.sign(
        { id, user_name, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController{
    /**
     * Регистрация пользователя
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */
    async registration(req, res, next){
        const {user_name, password, role} = req.body
        if(!user_name || !password){
            return next(ApiError.badReques('Неверное имя пользователя или пароль'))
        }
        const candidate = await User.findOne({where: {user_name}})
        if(candidate){
            return next(ApiError.badReques('Такой пользователь уже существует'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({user_name, password: hashPassword, role})
        const token = generateJWT(user.id, user.user_name, user.role)
        return res.json({token})
    }

    /**
     * @param {*} req 
     * @param {*} res
     */
    async deleteUser(req, res, next){
        var {userId} = req.body
        if (!userId){
            return next(ApiError.badReques('Пользователь для удаления не указан'))
        }
        const result = await User.destroy({where: {
            id: userId
          }})
        return res.json({message: result})
    }

    /**
     * Авторизация
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */
    async login(req, res, next){
        const {user_name, password} = req.body
        const user = await User.findOne({where: {user_name}})
        if (!user) {
            return next(ApiError.internal('Неверное имя пользователя или пароль'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword){
            return next(ApiError.internal('Неверное имя пользователя или пароль'))
        }
        const token = generateJWT(user.id, user.user_name, user.role)
        return res.json({token})
    }

    async check(req, res, next){
        const token = generateJWT(req.user.id, req.user.user_name, req.user.role)
        return res.json({token})
    }

    /**
     * Полукчение всех пользователей
     * @param {*} req 
     * @param {*} res 
     * @returns
     */
    async getAll(req, res){
        const users = await User.findAll({attributes: ['id', 'user_name', 'role']})
        return res.json(users)
    }
}

module.exports = new UserController()