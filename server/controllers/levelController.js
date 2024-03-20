const ApiError = require('../error/ApiError')
const {User, Levels, Tokens} = require('../models/models')
const randomiser = require('randomstring')


class levelController{
    async createLevel(req, res, next){
        const {name, port} = req.body
        if (!name || !port){
            return next(ApiError.badReques('Название теста или его URL не указаны.'))
        }
        const candidate = await Levels.findOne({where:{name}})
        if (candidate){
            return next(ApiError.badReques('Тест с таким названием уже существует.'))
        }
        let level = await Levels.create({name, port})
        return res.json({message: level})
    }

    async createToken(req, res, next){
        const {userId, levelId} = req.body
        const candidate = await Tokens.findOne({where: {userId, levelId}})
        if (candidate){
            return next(ApiError.badReques('Ключ для этого пользователя уже существует.'))
        }
        const token = randomiser.generate({length: 12})
        let newToken = await Tokens.create({levelId, userId, token})
        return res.json({message: newToken})
    }

    async getAllLevels(req, res, next){
        let levels = await Levels.findAll()
        return res.json(levels)
    }

    async getOneTokenForUser(req, res, next){
        const {userId, levelId} = req.body
        const token = await Tokens.findOne({attributes: ['tokenStatus'], where: {userId: userId, levelId: levelId}})
        return res.json(token)
    }
}

module.exports = new levelController()