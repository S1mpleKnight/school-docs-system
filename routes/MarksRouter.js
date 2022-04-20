const Router = require('express')
const router = new Router()
const markController = require('../controller/MarkController')
const roleMiddleware = require("../middleware/RoleMiddleware");

router.get('/:term/students/:id', roleMiddleware('ADMIN'), markController.findStudentTermMarks)
router.get('/', roleMiddleware('STUDENT'), markController.findAllStudentMarks)

module.exports = router