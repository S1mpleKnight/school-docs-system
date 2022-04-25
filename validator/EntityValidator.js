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

function getMarkCreationValidator() {
    return [
        check('studentId', 'Invalid student id').isNumeric(),
        check('teacherId', 'Invalid teacher id').isNumeric(),
        check('markRoleId', 'Invalid mark role id').isNumeric(),
        check('subjectId', 'Invalid subject id').isNumeric(),
        check('termId', 'Invalid term id').isNumeric(),
        check('value', 'Invalid mark value').isNumeric().isLength({max: 2, min: 1}),
        check('date', 'Invalid date ').isDate()
    ]
}

function getMarkUpdateValidator() {
    return [
        check('studentId', 'Invalid student id').isNumeric(),
        check('subjectId', 'Invalid subject id').isNumeric(),
        check('date', 'Invalid date ').isDate(),
        check('value', 'Invalid mark value').isNumeric().isLength({max: 2, min: 1})
    ]
}

function getPositionsValidator() {
    return [
        check('teacher', 'Invalid teacher id').isNumeric(),
        check('subject', 'Invalid subject id').isNumeric(),
        check('term', 'Invalid term id').isNumeric(),
        check('groupId', 'Invalid group id').isNumeric()
    ]
}

module.exports = {
    getUserCreationValidator,
    getGroupCreationValidator,
    getUserUpdateValidator,
    getTermValidator,
    getSubjectValidator,
    getMarkUpdateValidator,
    getMarkCreationValidator,
    getPositionsValidator
}