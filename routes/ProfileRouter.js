const Router = require('express')
const router = new Router()
const userController = require('../controller/UserController')

router.get('/', userController.profile)

module.exports = router