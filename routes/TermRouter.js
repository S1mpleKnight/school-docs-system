const Router = require('express')
const router = new Router()
const termController = require('../controller/TermController')
const validator = require('../validator/EntityValidator')
const roleMiddleware = require("../middleware/RoleMiddleware");
const ADMIN_STRING_VIEW = 'ADMIN'
const TEACHER_STRING_VIEW = 'TEACHER'

router.get('/', roleMiddleware(ADMIN_STRING_VIEW, TEACHER_STRING_VIEW), termController.findAll)
router.get('/:id', roleMiddleware(ADMIN_STRING_VIEW, TEACHER_STRING_VIEW), termController.findById)
router.post('/', roleMiddleware(ADMIN_STRING_VIEW), validator.getTermValidator(), termController.create)
router.delete('/:id', roleMiddleware(ADMIN_STRING_VIEW), termController.delete)
router.put('/:id', roleMiddleware(ADMIN_STRING_VIEW), validator.getTermValidator(), termController.update)

module.exports = router