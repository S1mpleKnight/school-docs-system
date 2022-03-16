const Router = require('express')
const router = new Router()
const groupController = require('../controller/GroupController')
const validator = require('../validator/EntityValidator')

router.post('/', validator.getGroupCreationValidator(), groupController.create)
router.get('/', groupController.findAll)
router.get('/:id', groupController.findById)

module.exports = router