const Router = require('express')
const router = new Router()
const userController = require('../controller/UserController')
const validator = require('../validator/EntityValidator')
const roleMiddleware = require("../middleware/RoleMiddleware");
const STUDENT_ROLE_ID = 3
const ADMIN_STRING_VIEW = 'ADMIN'
const TEACHER_STRING_VIEW = 'TEACHER'

router.post('/', validator.getUserCreationValidator(),
    function (req, res,next) {
        req.roleId = STUDENT_ROLE_ID
        next()
    },
    userController.create)
router.get('/taught', roleMiddleware(TEACHER_STRING_VIEW), userController.findStudentsByTeacher)
router.get('/', roleMiddleware(ADMIN_STRING_VIEW), userController.findAllStudents)
router.get('/:id', roleMiddleware(ADMIN_STRING_VIEW), userController.findStudentById)
router.delete('/:id', roleMiddleware(ADMIN_STRING_VIEW), userController.deleteStudent)
router.put('/:id', roleMiddleware(ADMIN_STRING_VIEW), validator.getUserUpdateValidator(), userController.updateStudent)

module.exports = router