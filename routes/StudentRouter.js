const Router = require('express')
const router = new Router()
const StudentController = require('../controller/StudentController')

router.post('/', StudentController.create)
router.get('/', StudentController.findAll)

module.exports = router