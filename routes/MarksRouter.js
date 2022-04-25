const Router = require('express')
const router = new Router()
const markController = require('../controller/MarkController')
const roleMiddleware = require("../middleware/RoleMiddleware")
const ADMIN_STRING_VIEW = 'ADMIN'
const STUDENT_STRING_VIEW = 'STUDENT'

router.get('/:term/students/:id', roleMiddleware(ADMIN_STRING_VIEW), markController.findStudentTermMarks)
router.get('/', roleMiddleware(STUDENT_STRING_VIEW), markController.findAllStudentMarks)

module.exports = router