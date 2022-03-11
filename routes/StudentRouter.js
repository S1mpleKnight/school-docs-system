const {Router} = require('express')
const router = Router
const StudentController = require('../controller/StudentController')

router.post('/', StudentController.create)
router.get('/', StudentController.getAll)

module.exports = router