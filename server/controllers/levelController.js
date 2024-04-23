const db = require('../db')
const ApiError = require('../error/ApiError')
const { User, Levels, Tokens } = require('../models/models')
const randomiser = require('randomstring')
const uuid = require('uuid')
const path = require('path')
var moment = require('moment')

class levelController {

    async createLevel(req, res, next) {
        try {
            const { name, url } = req.body
            if (!name || !url) {
                return next(ApiError.badReques('Название теста или его порт не указаны.'))
            }
            const candidate = await Levels.findOne({ where: { name } })
            if (candidate) {
                return next(ApiError.badReques('Тест с таким названием уже существует.'))
            }
            const { img } = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const level = await Levels.create({ name, url, img: fileName })
            return res.json(level)
        } catch (e) {
            next(ApiError.badReques(e.message))
        }
    }

    async createTokensForOneUser(req, res, next) {
        const { userId } = req.body
        const candidate = await Tokens.findOne({ where: { userId } })
        if (candidate) {
            return next(ApiError.badReques('Ключ для этого пользователя уже существует.'))
        }
        let levelsId = await Levels.findAll({ attributes: ['id'] })
        for (let i = 0; i < levelsId.length; i++) {
            let obj = levelsId[i];
            const levelId = JSON.stringify(obj.id)
            const token = randomiser.generate({ length: 24 })
            const newTokens = Tokens.create({ levelId, userId, token })
        }
        return res.json(true)
    }

    async getAllLevels(req, res, next) {
        const user = req.query
        let levels = await db.query(`select levels.id, levels.name, levels.url, levels.img, tokens.tokenStatus from levels right join tokens on levels.id = tokens.levelId where tokens.userId = ` + user.userId, {type: db.QueryTypes.SELECT})
        return res.json(levels)
    }

    async createTokensForAllUsers(req, res, next) {
        const { levelId } = req.body
        let usersId = await User.findAll({ attributes: ['id'] })
        for (let i = 0; i < usersId.length; i++) {
            let obj = usersId[i]
            const userId = JSON.stringify(obj.id)
            const token = randomiser.generate({ length: 24 })
            const tokens = await Tokens.create({levelId, userId, token})
        }
        return res.json(true)
    }

    async checkToken(req, res, next) {
        const { levelId, token, userId } = req.body
        const candidate = await Tokens.findOne({ attributes: ['token'], where: { userId, levelId, token } })
        if (!candidate){
            return next(ApiError.badReques('Неверный ключ'))
        }
        let dateTime = moment().format('YYYY-MM-DD HH:mm:ss')
        const some = await Tokens.update({ tokenStatus: 1, passDate: dateTime }, {where: {userId, levelId}})
        return res.json({message: 'Задание выполнено'})
    }
}

module.exports = new levelController()