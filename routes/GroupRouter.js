const Router = require('express')
const router = new Router()
const groupController = require('../controller/GroupController')
const userController = require('../controller/UserController')
const validator = require('../validator/EntityValidator')
const roleMiddleware = require("../middleware/RoleMiddleware");
const ADMIN_STRING_VIEW = 'ADMIN'
const TEACHER_STRING_VIEW = 'TEACHER'

router.post('/', roleMiddleware(ADMIN_STRING_VIEW), validator.getGroupCreationValidator(), groupController.create)
router.get('/', roleMiddleware(ADMIN_STRING_VIEW), groupController.findAll)
router.get('/taught', roleMiddleware(TEACHER_STRING_VIEW), groupController.findTeacherGroupsByCurrentTerm)
router.get('/:id', roleMiddleware(ADMIN_STRING_VIEW), groupController.findById)
router.delete('/:id', roleMiddleware(ADMIN_STRING_VIEW), groupController.delete)
router.put('/:id', roleMiddleware(ADMIN_STRING_VIEW), validator.getGroupCreationValidator(), groupController.update)
router.get('/:id/students', roleMiddleware(ADMIN_STRING_VIEW), userController.findStudentsByGroup)

module.exports = router