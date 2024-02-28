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
const genetateJWT = (id, user_name, password) => {
    return jwt.sign(
        { id, user_name, password},
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
        const {user_name, password} = req.body
        if(!user_name || !password){
            return next(ApiError.badReques('Неверное имя пользователя или пароль'))
        }
        const candidate = await User.findOne({where: {user_name}})
        if(candidate){
            return next(ApiError.badReques('Такой пользователь уже существует'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({user_name, password: hashPassword})
        const token = jwt.sign(
            {id: user.id, user_name},
            process.env.SECRET_KEY,
            {expiresIn: '24h'}
            )
        return res.json(token)
    }

    /**
     * TODO: дописать удаление пользователей (пока не знаю как делать)
     * @param {*} req 
     * @param {*} res 
     */
    async deleteUser(req, res, next){
        const {id} = req.body
        if (!id){
            return next(ApiError.badReques('Пользователь для удаления не указан'))
        }
        let result = await User.destroy({where: {
            id: id
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
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword || !user){
            return next(ApiError.internal('Неверное имя пользователя или пароль'))
        }
        return res.json({token, message: "You passed"})
    }

    async check(req, res, next){
        const {id} = req.query
        if(!id){
            return next(ApiError.badReques('Не задан id'))
        }
        res.json(id)
    }

    /**
     * Полукчение всех пользователей
     * @param {*} req 
     * @param {*} res 
     * @returns
     */
    async getAll(req, res){
        const users = await User.findAll()
        return res.json(users)
    }
}

module.exports = new UserController()