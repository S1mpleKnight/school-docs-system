const {Student} = require('../models/models')
const apiError = require('../error/ApiError')
const {validationResult} = require('express-validator')
const parsingErrors = require("../error/ErrorParser");
const bcrypt = require("bcrypt");
const config = require("config");
const SALT_ROUNDS = parseInt(config.get("salt"), 10)

class StudentController {
    async findAll(req, res) {
        const rawStudents = await Student.findAll()
        const students = JSON.parse(JSON.stringify(rawStudents))
        let responseBody = [];
        for (const student of students) {
            const {id, login, firstName, lastName, middleName} = student
            responseBody.push({id, login, firstName, lastName, middleName})
        }
        return res.json(responseBody)
    }

    async create(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                let errorMessages = parsingErrors(errors);
                return next(apiError.badRequest([...errorMessages]))
            }
            const {firstName, lastName, middleName, login, password} = req.body
            const candidate = await Student.findOne({where: {login: login}})
            if (candidate) {
                return next(apiError.unprocessableEntity("Student with this login already exists"))
            }
            let passwordHash;
            await bcrypt.genSalt(SALT_ROUNDS).then(salt => {
                return bcrypt.hash(password, salt)
            }).then(hash => {
                passwordHash = hash
            })
            const student = await Student.create({firstName, lastName, middleName, login, passwordHash})
            return res.json(student)
        } catch (e) {
            next(apiError.badRequest(e.message))
        }
    }

    async findById(req, res, next) {
        try {
            const student = await Student.findOne({where: {"id": req.params.id}})
            if (!student) {
                return next(apiError.notFound(`Student with id: ${req.params.id} do not exist`))
            }
            const {id, login, firstName, lastName, middleName} = student
            return res.json({id, login, firstName, lastName, middleName})
        } catch (e) {
            next(apiError.badRequest(e.message))
        }
    }
}

module.exports = new StudentController()