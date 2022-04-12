const Router = require('express')
const router = new Router()
const termController = require('../controller/TermController')
const validator = require('../validator/EntityValidator')

router.get('/', termController.findAll)
router.get('/:id', termController.findById)
router.post('/', validator.getTermValidator(), termController.create)
router.delete('/:id', termController.delete)
router.put('/:id', validator.getTermValidator(), termController.update)

module.exports = router