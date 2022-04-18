const Router = require('express')
const router = new Router()
const userController = require('../controller/UserController')
const timetableController = require('../controller/TimetableController')
const validator = require('../validator/EntityValidator')
const TEACHER_ROLE_ID = 2

router.post('/', validator.getUserCreationValidator(),
    function (req, res,next) {
        req.roleId = TEACHER_ROLE_ID
        next()
    },
    userController.create)
router.get('/', userController.findAllTeachers)
router.get('/:id', userController.findTeacherById)
router.delete('/:id', userController.deleteTeacher)
router.put('/:id', validator.getUserUpdateValidator(), userController.updateTeacher)
router.get('/:id/groups', timetableController.findAllGroupsByTeacher)

module.exports = router