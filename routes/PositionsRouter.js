const Router = require('express')
const router = new Router()
const PositionsController = require('../controller/PositionsController')
const validator = require('../validator/EntityValidator')

router.get('/', PositionsController.findAll)

module.exports = router