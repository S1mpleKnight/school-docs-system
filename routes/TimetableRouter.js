const Router = require('express')
const router = new Router()
const TimetableController = require('../controller/TimetableController')
const validator = require('../validator/EntityValidator')

router.get('/', TimetableController.findAll)

module.exports = router