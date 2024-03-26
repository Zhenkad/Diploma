const db = require('../db')
const ApiError = require('../error/ApiError')
const {User, Levels, Tokens} = require('../models/models')
const randomiser = require('randomstring')
const uuid = require('uuid')
const path = require('path')


class levelController{
    async createLevel(req, res, next){
        try{
            const {name, port} = req.body
        if (!name || !port){
            return next(ApiError.badReques('Название теста или его URL не указаны.'))
        }
        const candidate = await Levels.findOne({where:{name}})
        if (candidate){
            return next(ApiError.badReques('Тест с таким названием уже существует.'))
        }
        const {img} = req.files
        let filename = uuid.v4() + ".jpg"
        img.mv(path.resolve(__dirname, '..', 'static', filename))
        const level = await Levels.create({name, port, img: filename})
        return res.json({level})
        } catch(e){
            next(ApiError.badReques(e.message))
        }
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
            const newTokens = Tokens.create({levelId, userId, token})
        }
        return res.json(true)
    }

    async getAllLevels(req, res, next){
        let levels = await Levels.findAll({attributes: ['id', 'name', 'port', 'img']})
        return res.json(levels)
    }

    async createTokensForAllUsers(req, res, next){
        const {levelId} = req.body
        let usersId = await User.findAll({attributes: ['id']})
        for(let i = 0; i < usersId.length; i++){
            let obj = usersId[i]
            const userId = JSON.stringify(obj.id)
            const token = randomiser.generate({length: 24})
            const tokens = await Tokens.create(levelId, userId, token)
        }
        return res.json(true)
    }

    async getOneTokenForUser(req, res, next){
        const {userId, levelId} = req.query
        const token = await Tokens.findOne({attributes: ['tokenStatus'], where: {userId, levelId}})
        return res.json(token)
    }
}

module.exports = new levelController()