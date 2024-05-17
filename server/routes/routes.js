const Router = require('express')
const userController = require('../controllers/userController')
const levelController = require('../controllers/levelController')
const router = new Router()
const authMiddleware = require('../middleware/authMiddleware')
const checkRole = require('../middleware/checkRoleMiddleware')


//User routes
router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.post('/changerole', checkRole('ADMIN'), userController.changeUserRole)
router.get('/users', checkRole('ADMIN'), userController.getAll)
router.get('/auth', authMiddleware, userController.check)
router.delete('/deleteuser', checkRole('ADMIN'), userController.deleteUser)


//Level routes
router.post('/createlevel', checkRole('ADMIN'), levelController.createLevel)
router.post('/createtokens',  levelController.createTokensForOneUser)
router.post('/createtokensforallusers', checkRole('ADMIN'), levelController.createTokensForAllUsers)
router.post('/checktoken', authMiddleware, levelController.checkToken)
router.post('/createstatforallusers', authMiddleware, levelController.createStatForAllUsers)
router.post('/createstatforoneuser', levelController.createStatForOneUser)
router.post('/settimestart', authMiddleware, levelController.setTimeStart)
router.post('/timeforlevel', authMiddleware, levelController.countTimeForLevel)
router.get('/getstatistic', checkRole('ADMIN'), levelController.getStatistic)
router.get('/levels', levelController.getAllLevels)
router.get('/getlevelsforadmin', checkRole('ADMIN'), levelController.getLevelsForAdmin)

module.exports = router