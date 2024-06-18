const db = require('../db')
const ApiError = require('../error/ApiError')
const { User, Levels, Tokens, Statistic } = require('../models/models')
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
        let levels = await db.query(`select levels.id, levels.name, levels.url, levels.img, tokens.tokenStatus, tokens.passDate from levels right join tokens on levels.id = tokens.levelId where tokens.userId = ` + user.userId, { type: db.QueryTypes.SELECT })
        return res.json(levels)
    }

    async createTokensForAllUsers(req, res, next) {
        const { levelId } = req.body
        let usersId = await User.findAll({ attributes: ['id'] })
        for (let i = 0; i < usersId.length; i++) {
            let obj = usersId[i]
            const userId = JSON.stringify(obj.id)
            const token = randomiser.generate({ length: 24 })
            const tokens = await Tokens.create({ levelId, userId, token })
        }
        return res.json(true)
    }

    async checkToken(req, res, next) {
        const { levelId, token, userId } = req.body
        const candidate = await Tokens.findOne({ attributes: ['token'], where: { userId, levelId, token } })
        if (!candidate) {
            return next(ApiError.badReques('Неверный ключ'))
        }
        let datePass = moment().format('YYYY-MM-DD HH:mm:ss')
        let timePassForStat = moment().format('HH:mm:ss')
        await Tokens.update({ tokenStatus: 1, passDate: datePass }, { where: { userId, levelId } })
        await Statistic.update({ timePass: timePassForStat }, { where: { levelId, userId } })
        return res.json(true)
    }

    async countTimeForLevel(req, res, next) {
        const { levelId, userId } = req.body
        const timeStart = await Statistic.findOne({ attributes: ['timeStart', 'timePass'], where: { levelId, userId } })

        var seconds1 = new Date('1970-01-01T' + timeStart.timeStart + 'Z').getTime()
        var seconds2 = new Date('1970-01-01T' + timeStart.timePass + 'Z').getTime()
        var timeDifference = seconds2 - seconds1

        var daysDifference = Math.floor(timeDifference / 1000 / 60 / 60 / 24)
        timeDifference -= daysDifference * 1000 * 60 * 60 * 24

        var hoursDifference = Math.floor(timeDifference / 1000 / 60 / 60)
        timeDifference -= hoursDifference * 1000 * 60 * 60

        var minutesDifference = Math.floor(timeDifference / 1000 / 60)
        timeDifference -= minutesDifference * 1000 * 60

        var secondsDifference = Math.floor(timeDifference / 1000)

        const difference = hoursDifference + ":" + minutesDifference + ":" + secondsDifference
        await Statistic.update({ timeForLevel: difference }, { where: { levelId, userId } })
        return res.json(true)
    }

    async createStatForAllUsers(req, res, next) {
        const { levelId } = req.body
        let usersId = await User.findAll({ attributes: ['id'] })
        for (let i = 0; i < usersId.length; i++) {
            let obj = usersId[i]
            const userId = JSON.stringify(obj.id)
            const result = await Statistic.create({ levelId, userId })
        }
        return res.json(true)
    }

    async createStatForOneUser(req, res, next) {
        const { userId } = req.body
        let levelsId = await Levels.findAll({ attributes: ['id'] })
        for (let i = 0; i < levelsId.length; i++) {
            let obj = levelsId[i]
            const levelId = JSON.stringify(obj.id)
            const result = await Statistic.create({ levelId, userId })
        }
        return res.json(true)
    }

    async setTimeStart(req, res, next) {
        const { levelId, userId, currentTime } = req.body
        let atempts = await Statistic.findOne({ attributes: ['atempts'], where: { levelId, userId } })
        console.log(atempts)
        if (!atempts) {
            atempts.atempts = 1
        } else {
            atempts.atempts += 1
        }
        await Statistic.update({ atempts: atempts.atempts }, { where: { levelId, userId } })
        await Statistic.update({ timeStart: currentTime },  { where: { levelId, userId } })
        return res.json(true)
    }

    async getStatistic(req, res, next) {
        const { userId } = req.query
        const statistic = await db.query(`SELECT levels.name, tokens.tokenStatus, tokens.passDate, statistics.timeForLevel, statistics.atempts
                                        FROM levels RIGHT JOIN tokens ON levels.id = tokens.levelId
                                        RIGHT JOIN statistics ON levels.id = statistics.levelId AND tokens.userId = statistics.userId
                                        WHERE statistics.userId = ` + userId, { type: db.QueryTypes.SELECT })
        return res.json(statistic)
    }

    async getLevelsForAdmin(req, res, next) {
        const levels = await Levels.findAll()
        return res.json(levels)
    }

    async deleteLevel(req, res, next) {
        const { id } = req.body
        await Tokens.destroy({where: {levelId: id}})
        await Statistic.destroy({where: {levelId: id}})
        const result = await Levels.destroy({ where: { id } })
        return res.json(result)
    }
}

module.exports = new levelController()