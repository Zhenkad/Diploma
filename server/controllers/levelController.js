const db = require('../db')
const ApiError = require('../error/ApiError')
const {User, Levels, Tokens} = require('../models/models')
const randomiser = require('randomstring')
const { QueryTypes } = require('sequelize');


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

    async createTokens(req, res, next){
        const {userId} = req.body
        const candidate = await Tokens.findOne({where: {userId}})
        if (candidate){
            return next(ApiError.badReques('Ключ для этого пользователя уже существует.'))
        }
        let levelsId = await Levels.findAll({attributes: ['id']})
        for(let i = 0; i < levelsId.length; i++) {
            let obj = levelsId[i];
            const levelId = JSON.stringify(obj.id)
            const token = randomiser.generate({length: 24})
            console.log(levelId)
            const newTokens = Tokens.create({levelId, userId, token})
        }
        return res.json(true)
    }

    async getAllLevels(req, res, next){
        let levels = await Levels.findAll({attributes: ['id', 'name', 'port', 'img']})
        return res.json(levels)
    }

    async getOneTokenForUser(req, res, next){
        const {userId, levelId} = req.query
        const token = await Tokens.findOne({attributes: ['tokenStatus'], where: {userId, levelId}})
        return res.json(token)
    }
}

module.exports = new levelController()