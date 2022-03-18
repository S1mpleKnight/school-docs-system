const Router = require('express')
const router = new Router()
const userController = require('../controller/UserController')
const validator = require('../validator/EntityValidator')

router.post('/', validator.getUserCreationValidator(), userController.create)
router.get('/', userController.findAllStudents)
router.get('/:id', userController.findStudentById)

module.exports = router