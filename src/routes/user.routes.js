const { Router } = require('express')

const controllers = require('../controllers/index.js')
const middleware = require('../middleware/index')

const router = Router()

router.post('/create', middleware.users.isValid, controllers.user.create)
router.get('/getAll', middleware.users.isValid, controllers.user.getAll)
router.post('/login',  controllers.user.login)

module.exports = router