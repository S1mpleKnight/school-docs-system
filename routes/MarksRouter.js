const Router = require('express')
const router = new Router()
const markController = require('../controller/MarkController')
const validator = require('../validator/EntityValidator')

router.get('/:term/students/:id', markController.findStudentTermMarks)

module.exports = router