const Router = require('express')
const router = new Router()
const TermController = require('../controller/TermController')
const validator = require('../validator/EntityValidator')

router.get('/', TermController.findAll)

module.exports = router