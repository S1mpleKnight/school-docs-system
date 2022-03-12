const Router = require('express')
const router = new Router()
const teacherRouter = require('./TeacherRouter')
const markRouter = require('./MarksRouter')
const studentRouter = require('./StudentRouter')
const missRouter = require('./MissRouter')

router.use('/', function (req, res, next) {
    console.log(req)
    console.log(res)
    next()
})

router.use('/teachers', teacherRouter)
router.use('/students', studentRouter)
router.use('/marks', markRouter)
router.use('/misses', missRouter)
// router.use('/login',)

module.exports = router