const Router = require('express')
const router = new Router()
const userController = require('../controller/UserController')
const validator = require('../validator/EntityValidator')

router.post('/', validator.getUserCreationValidator(),
    function (req, res,next) {
        req.roleId = 2
        next()
    },
    userController.create)
router.get('/', userController.findAllTeachers)
router.get('/:id', userController.findTeacherById)
router.delete('/:id', userController.deleteTeacher)
router.put('/:id', validator.getUserUpdateValidator(), userController.updateTeacher)

module.exports = router