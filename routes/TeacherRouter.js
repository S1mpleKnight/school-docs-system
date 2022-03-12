const Router = require('express')
const router = new Router()
const teacherController = require('../controller/TeacherController')
const {check} = require("express-validator");

function getCreationValidatorChain() {
    return [
        check('firstName', 'Invalid first name').trim().isLength({max: 50, min: 3}).not().matches(/[^A-Za-z]/),
        check('lastName', 'Invalid last name').trim().isLength({max: 50, min: 2}).not().matches(/[^A-Za-z]/),
        check('secondName', 'Invalid second name').trim().isLength({max: 50, min: 3}).not().matches(/[^A-Za-z]/),
        check('password', 'Invalid password (from 10 to 50)').isLength({min: 10, max: 50}),
        check('login', 'Invalid login (from 10 to 50)').trim().isLength({max: 50, min: 10})
    ];
}

router.post('/', getCreationValidatorChain(), teacherController.create)
router.get('/', teacherController.findAll)

module.exports = router