const Router = require('express')
const router = new Router()
const teacherRouter = require('./TeacherRouter')
const studentRouter = require('./StudentRouter')
const groupRouter = require('./GroupRouter')
const voucherRouter = require('./VoucherRouter')
const timetableRouter = require('./TimetableRouter')
const subjectRouter = require('./SubjectRouter')
const termRouter = require('./TermRouter')
const authController = require('../controller/AuthController')
const authMiddleware = require('../middleware/AuthMiddleware')
const roleMiddleware = require('../middleware/RoleMiddleware')

router.post('/login', authController.login)

router.use('/teachers', authMiddleware, roleMiddleware('ADMIN'), teacherRouter)
router.use('/students', authMiddleware, roleMiddleware( 'ADMIN'), studentRouter)
router.use('/groups', authMiddleware, roleMiddleware('ADMIN'), groupRouter)
router.use('/vouchers', authMiddleware, roleMiddleware('ADMIN'), voucherRouter)
router.use('/subjects', authMiddleware, roleMiddleware('ADMIN'), subjectRouter)
router.use('/term', authMiddleware, roleMiddleware('ADMIN'), termRouter)
router.use('/timetable', authMiddleware, roleMiddleware('ADMIN'), timetableRouter)

module.exports = router