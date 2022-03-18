const Router = require('express')
const router = new Router()
const teacherRouter = require('./TeacherRouter')
const studentRouter = require('./StudentRouter')
const groupRouter = require('./GroupRouter')
const authController = require('../controller/AuthController')
const authMiddleware = require('../middleware/AuthMiddleware')
const roleMiddleware = require('../middleware/RoleMiddleware')

router.post('/login', authController.login)

router.use('/', function (req, res, next) {
    console.log('request')
    console.log('response')
    next()
})

router.use('/teachers', authMiddleware, teacherRouter)
router.use('/students', authMiddleware, studentRouter)
router.use('/groups', authMiddleware, groupRouter)

module.exports = router