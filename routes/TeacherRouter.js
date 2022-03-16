const Router = require('express')
const router = new Router()
const teacherController = require('../controller/TeacherController')
const validator = require('../validator/EntityValidator')

router.post('/', validator.getUserCreationValidator(), teacherController.create)
router.get('/', teacherController.findAll)
router.get('/:id', teacherController.findById)

module.exports = router