const Router = require('express')
const router = new Router()
const userController = require('../controller/UserController')
const validator = require('../validator/EntityValidator')
const STUDENT_ROLE_ID = 3

router.post('/', validator.getUserCreationValidator(),
    function (req, res,next) {
        req.roleId = STUDENT_ROLE_ID
        next()
    },
    userController.create)
router.get('/', userController.findAllStudents)
router.get('/:id', userController.findStudentById)
router.delete('/:id', userController.deleteStudent)
router.put('/:id', validator.getUserUpdateValidator(), userController.updateStudent)

module.exports = router