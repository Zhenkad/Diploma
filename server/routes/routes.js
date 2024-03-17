const Router = require('express')
const userController = require('../controllers/userController')
const levelController = require('../controllers/levelController')
const router = new Router()
const authMiddleware = require('../middleware/authMiddleware')
const checkRole = require('../middleware/checkRoleMiddleware')


//User routes
router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/users', userController.getAll)
router.get('/auth', authMiddleware, userController.check)
router.delete('/deleteuser', checkRole('ADMIN'), userController.deleteUser)


/*Level routes
router.post('/createlevel', checkRole('ADMIN'), levelController.createLevel)
router.get('/levels', levelController.getAllLevels)
router.post('/createtoken', levelController.createToken)
router.post('/checktoken')
 */


module.exports = router