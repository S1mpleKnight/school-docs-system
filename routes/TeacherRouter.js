const {Router} = require('express')
const router = Router
const TeacherController = require('../controller/TeacherController')

router.post('/', TeacherController.create)
router.get('/', TeacherController.getAll)

module.exports = router