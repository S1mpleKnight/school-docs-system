const {Student} = require('../models/models')
const apiError = require('../error/ApiError')
const {validationResult} = require('express-validator')

class StudentController {
    async findAll(req, res) {
        const rawStudents = await Student.findAll()
        const students = JSON.parse(JSON.stringify(rawStudents))
        let responseBody = [];
        for (const student of students) {
            const {id, login, firstName, lastName, secondName} = student
            responseBody.push({id, login, firstName, lastName, secondName})
        }
        return res.json(responseBody)
    }

    async create(req, res, next) {

    }

    async findById(req, res) {

    }
}

module.exports = new StudentController()