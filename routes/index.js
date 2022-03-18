const Router = require('express')
const router = new Router()
const teacherRouter = require('./TeacherRouter')
const studentRouter = require('./StudentRouter')
const groupRouter = require('./GroupRouter')
const authController = require('../controller/AuthController')
const authMiddleware = require('../middleware/AuthMiddleware')
const roleMiddleware = require('../middleware/RoleMiddleware')

router.post('/login', authController.login)

router.use('/teachers', authMiddleware, roleMiddleware('ADMIN'), teacherRouter)
router.use('/students', authMiddleware, roleMiddleware( 'ADMIN'), studentRouter)
router.use('/groups', authMiddleware, roleMiddleware('ADMIN'), groupRouter)

module.exports = router