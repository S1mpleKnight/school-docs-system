const Router = require('express')
const router = new Router()
const teacherRouter = require('./TeacherRouter')
const studentRouter = require('./StudentRouter')
const groupRouter = require('./GroupRouter')
const voucherRouter = require('./VoucherRouter')
const positionsRouter = require('./PositionsRouter')
const subjectRouter = require('./SubjectRouter')
const termRouter = require('./TermRouter')
const markRouter = require('./MarksRouter')
const profileRouter = require('./ProfileRouter')
const authController = require('../controller/AuthController')
const authMiddleware = require('../middleware/AuthMiddleware')
const roleMiddleware = require('../middleware/RoleMiddleware')
const ADMIN_STRING_VIEW = 'ADMIN'
const TEACHER_STRING_VIEW = 'TEACHER'
const STUDENT_STRING_VIEW = 'STUDENT'

router.post('/login', authController.login)

router.use('/teachers', authMiddleware, roleMiddleware(ADMIN_STRING_VIEW), teacherRouter)
router.use('/students', authMiddleware, roleMiddleware( ADMIN_STRING_VIEW), studentRouter)
router.use('/groups', authMiddleware, groupRouter)
router.use('/vouchers', authMiddleware, roleMiddleware(ADMIN_STRING_VIEW), voucherRouter)
router.use('/subjects', authMiddleware, roleMiddleware(ADMIN_STRING_VIEW), subjectRouter)
router.use('/terms', authMiddleware, roleMiddleware(ADMIN_STRING_VIEW), termRouter)
router.use('/positions', authMiddleware, roleMiddleware(ADMIN_STRING_VIEW), positionsRouter)
router.use('/marks', authMiddleware, markRouter)
router.use('/profile', authMiddleware, roleMiddleware(STUDENT_STRING_VIEW, TEACHER_STRING_VIEW, ADMIN_STRING_VIEW), profileRouter)

module.exports = router