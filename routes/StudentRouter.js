const Router = require('express')
const router = new Router()
const studentController = require('../controller/StudentController')
const validator = require('../validator/EntityValidator')

router.post('/', validator.getUserCreationValidator(), studentController.create)
router.get('/', studentController.findAll)
router.get('/:id', studentController.findById)

module.exports = router