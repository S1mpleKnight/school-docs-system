const {check} = require("express-validator");

function getUserCreationValidator() {
    return [
        check('firstName', 'Invalid first name').trim().isLength({max: 50, min: 3}).not().matches(/[^A-Za-z]/),
        check('lastName', 'Invalid last name').trim().isLength({max: 50, min: 2}).not().matches(/[^A-Za-z]/),
        check('middleName', 'Invalid middle name').trim().isLength({max: 50, min: 3}).not().matches(/[^A-Za-z]/),
        check('password', 'Invalid password (from 10 to 50)').isLength({min: 10, max: 50}),
        check('login', 'Invalid login (from 10 to 50)').trim().isLength({max: 50, min: 10})
    ];
}

function getGroupCreationValidator() {
    return [
        check('letter', 'Invalid form letter').trim().isLength({max: 1}).not().matches(/[^A-Za-z]/),
        check('number', 'Invalid form number').trim().isLength({max: 2, min: 1}).not().matches(/[^0-9]/),
    ]
}

module.exports = {
    getUserCreationValidator,
    getGroupCreationValidator
}