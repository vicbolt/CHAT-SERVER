const { Router } = require('express')

const controllers = require('../controllers/index')
const middleware = require('../middleware/index')

const router = Router()

router.post('/create', middleware.users.isValid, controllers.message.create)
router.get('/getAll', middleware.users.isValid, controllers.message.getAll)
router.post('/chat', middleware.users.isValid, controllers.message.chat)

module.exports = router