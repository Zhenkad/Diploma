const Router = require('express')
const router = new Router()

router.get('/users', (req, res) => {
    res.json({message: 'Working'})
})
router.post('/registration')
router.post('/login')

module.exports = router