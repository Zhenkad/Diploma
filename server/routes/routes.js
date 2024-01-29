const Router = require('express')
const userController = require('../controllers/userController')
const router = new Router()

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/users', userController.getAll)
router.get('/auth', userController.check)
//router.delete('/user', userController.deleteUser)

module.exports = router