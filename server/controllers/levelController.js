const ApiError = require('../error/ApiError')
const {User, Levels, Tokens} = require('../models/models')
const randomiser = require('randomstring')


class levelController{
    async createLevel(req, res, next){
        const {name, url} = req.body
        if (!name || !url){
            return next(ApiError.badReques('Название теста или его URL не указаны.'))
        }
        const candidate = await Levels.findOne({where:{name}})
        if (candidate){
            return next(ApiError.badReques('Тест с таким названием уже существует.'))
        }
        let level = await Levels.create({name, url})
        return res.json({message: level})
    }

    async createToken(req, res, next){
        const {userId, levelId} = req.body
        const candidateUser = await User.findOne({where: userId})
        const candidateLevel = await Levels.findOne({where: levelId})
        if (candidateLevel || candidateUser){
            return next(ApiError.badReques('Указанного пользователя или уровня не существует.'))
        }
        const token = randomiser.generate({length: 12})
        let newToken = await Tokens.create({levelId, userId, token})
        return res.json({message: newToken})
    }

    async getAllLevels(req, res, next){
        const levels = await Levels.findAll()
        return res.json({message: levels})
    }
}