const {Router} = require('express')
const router = Router()
const teacherRouter = require('./TeacherRouter')
const markRouter = require('./MarksRouter')
const studentRouter = require('./StudentRouter')
const missRouter = require('./MissRouter')

router.use('/teachers', teacherRouter)
router.use('/students', studentRouter)
router.use('/marks', markRouter)
router.use('/misses', missRouter)
// router.use('/login',)

module.exports = router