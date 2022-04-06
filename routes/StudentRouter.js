const Router = require('express')
const router = new Router()
const userController = require('../controller/UserController')
const validator = require('../validator/EntityValidator')

router.post('/', validator.getUserCreationValidator(),
    function (req, res,next) {
        req.roleId = 3
        next()
    },
    userController.create)
router.get('/', userController.findAllStudents)
router.get('/:id', userController.findStudentById)
router.delete('/:id', userController.deleteStudent)
router.put('/:id', validator.getUserUpdateValidator(), userController.updateStudent)

module.exports = router