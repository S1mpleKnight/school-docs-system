const Router = require('express')
const router = new Router()
const MarkController = require('../controller/MarkController')

router.post('/', MarkController.create)
router.get('/', MarkController.findAll)

module.exports = router