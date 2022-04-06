const Router = require('express')
const router = new Router()
const SubjectController = require('../controller/SubjectController')
const validator = require('../validator/EntityValidator')

router.get('/', SubjectController.findAll)

module.exports = router