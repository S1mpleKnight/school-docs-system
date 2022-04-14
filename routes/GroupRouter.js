const Router = require('express')
const router = new Router()
const groupController = require('../controller/GroupController')
const userController = require('../controller/UserController')
const validator = require('../validator/EntityValidator')

router.post('/', validator.getGroupCreationValidator(), groupController.create)
router.get('/', groupController.findAll)
router.get('/:id', groupController.findById)
router.delete('/:id', groupController.delete)
router.put('/:id', validator.getGroupCreationValidator(), groupController.update)
router.get('/:id/students', userController.findStudentsByGroup)

module.exports = router