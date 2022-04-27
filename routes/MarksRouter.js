const Router = require('express')
const router = new Router()
const markController = require('../controller/MarkController')
const roleMiddleware = require("../middleware/RoleMiddleware");
const ADMIN_STRING_VIEW = 'ADMIN'
const TEACHER_STRING_VIEW = 'TEACHER'
const STUDENT_STRING_VIEW = 'STUDENT'

router.get('/:term/students/:id', roleMiddleware(ADMIN_STRING_VIEW), markController.findStudentTermMarks)
router.delete('/subjects/:subjectId/students/:studentId/:date', roleMiddleware(TEACHER_STRING_VIEW), markController.delete)
router.get('/', roleMiddleware(STUDENT_STRING_VIEW, TEACHER_STRING_VIEW), markController.findAll)
router.post('/create', roleMiddleware(TEACHER_STRING_VIEW), markController.create)

module.exports = router