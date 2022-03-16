const Router = require('express')
const router = new Router()
const teacherRouter = require('./TeacherRouter')
const studentRouter = require('./StudentRouter')
const skipRouter = require('./SkipRouter')
const groupRouter = require('./GroupRouter')

router.use('/', function (req, res, next) {
    console.log('request')
    console.log('response')
    next()
})

router.use('/teachers', teacherRouter)
router.use('/students', studentRouter)
router.use('/skips', skipRouter)
router.use('/groups', groupRouter)

module.exports = router