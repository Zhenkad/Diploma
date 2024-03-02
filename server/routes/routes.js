const Router = require('express')
const userController = require('../controllers/userController')
const router = new Router()
const authMiddleware = require('../middleware/authMiddleware')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/users', userController.getAll)
router.get('/auth', authMiddleware, userController.check)
router.delete('/deletuser', checkRole('Admin'), userController.deleteUser)

module.exports = router