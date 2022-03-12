const {Student} = require('../models/models')
const apiError = require('../error/ApiError')
const {validationResult} = require('express-validator')

class StudentController {
    async findAll(req, res) {
        const students = await Student.findAll()
        return res.json(students)
    }

    async create(req, res, next) {

    }

    async findById(req, res) {

    }
}

module.exports = new StudentController()