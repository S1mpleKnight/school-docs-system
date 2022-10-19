const Router = require('express')
const router = new Router()
const positionsController = require('../controller/PositionsController')
const validator = require('../validator/EntityValidator')
const roleMiddleware = require("../middleware/RoleMiddleware")
const ADMIN_STRING_VIEW = 'ADMIN'
const TEACHER_STRING_VIEW = 'TEACHER'

router.get('/', roleMiddleware(ADMIN_STRING_VIEW, TEACHER_STRING_VIEW), positionsController.findAll)
router.post('/', roleMiddleware(ADMIN_STRING_VIEW), validator.getPositionsValidator(), positionsController.create)
router.delete('/:id', roleMiddleware(ADMIN_STRING_VIEW), positionsController.delete)
router.put('/:id', roleMiddleware(ADMIN_STRING_VIEW), validator.getPositionsValidator(), positionsController.update)

module.exports = router