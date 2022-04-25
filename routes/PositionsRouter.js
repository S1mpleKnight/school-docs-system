const Router = require('express')
const router = new Router()
const positionsController = require('../controller/PositionsController')
const validator = require('../validator/EntityValidator')

router.get('/', positionsController.findAll)
router.post('/', validator.getPositionsValidator(), positionsController.create)
router.delete('/:id', positionsController.delete)
router.put('/:id', validator.getPositionsValidator(), positionsController.update)

module.exports = router