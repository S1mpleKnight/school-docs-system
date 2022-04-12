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

function getUserUpdateValidator() {
    return [
        check('firstName', 'Invalid first name').trim().isLength({max: 50, min: 3}).not().matches(/[^A-Za-z]/),
        check('lastName', 'Invalid last name').trim().isLength({max: 50, min: 2}).not().matches(/[^A-Za-z]/),
        check('middleName', 'Invalid middle name').trim().isLength({max: 50, min: 3}).not().matches(/[^A-Za-z]/),
        check('login', 'Invalid login (from 10 to 50)').trim().isLength({max: 50, min: 10})
    ];
}

function getTermValidator() {
    return [
        check('startDate', 'Invalid start date').trim().isDate(),
        check('endDate', 'Invalid end date').trim().isDate(),
        check('number', 'Invalid term number').trim().isLength({max: 2, min: 1}).not().matches(/[^0-9]/),
    ]
}

function getSubjectValidator() {
    return [
        check('name', 'Invalid subject name').trim().isLength({max: 50, min: 2}).not().matches(/[^A-Za-z ]/)
    ]
}

module.exports = {
    getUserCreationValidator,
    getGroupCreationValidator,
    getUserUpdateValidator,
    getTermValidator,
    getSubjectValidator
}