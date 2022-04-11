const Router = require('express')
const router = new Router()
const SubjectController = require('../controller/SubjectController')

router.get('/', SubjectController.findAll)

module.exports = router