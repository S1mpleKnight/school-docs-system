const Router = require('express')
const router = new Router()
const subjectController = require('../controller/SubjectController')
const validator = require('../validator/EntityValidator')
const roleMiddleware = require("../middleware/RoleMiddleware");
const ADMIN_STRING_VIEW = 'ADMIN'
const TEACHER_STRING_VIEW = 'TEACHER'

router.get('/', roleMiddleware(ADMIN_STRING_VIEW, TEACHER_STRING_VIEW), subjectController.findAll)
router.get('/:id', roleMiddleware(ADMIN_STRING_VIEW, TEACHER_STRING_VIEW), subjectController.findById)
router.post('/', validator.getSubjectValidator(), subjectController.create)
router.put('/:id', validator.getSubjectValidator(), subjectController.update)
router.delete('/:id', subjectController.delete)

module.exports = router