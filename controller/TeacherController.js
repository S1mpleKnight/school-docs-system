const {Teacher} = require('../models/models')
const apiError = require('../error/ApiError')
const {validationResult} = require('express-validator')
const bcrypt = require('bcrypt')
const config = require('config')
const SALT_ROUNDS = parseInt(config.get("salt"), 10)
const TEACHER_ROLE_ID = config.get("teacher_role")
const parsingErrors = require('../error/ErrorParser')


class TeacherController {
    async create(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                let errorMessages = parsingErrors(errors);
                return next(apiError.badRequest([...errorMessages]))
            }
            const {firstName, lastName, middleName, login, password} = req.body
            const candidate = await Teacher.findOne({where: {login: login}})
            if (candidate) {
                return next(apiError.unprocessableEntity("Teacher with this login already exists"))
            }
            let passwordHash;
            await bcrypt.genSalt(SALT_ROUNDS).then(salt => {
                return bcrypt.hash(password, salt)
            }).then(hash => {
                passwordHash = hash
            })
            const teacher = await Teacher.create({
                firstName,
                lastName,
                middleName,
                login,
                passwordHash,
                TEACHER_ROLE_ID
            })
            return res.json(teacher)
        } catch (e) {
            next(apiError.badRequest(e.message))
        }
    }

    async findAll(req, res) {
        const rawTeachers = await Teacher.findAll()
        const teachers = JSON.parse(JSON.stringify(rawTeachers))
        let responseBody = [];
        for (const teacher of teachers) {
            const {id, login, firstName, lastName, middleName} = teacher
            responseBody.push({id, login, firstName, lastName, middleName})
        }
        return res.json(responseBody)
    }

    async findById(req, res) {
        try {
            const teacher = await Teacher.findOne({where: {"id": req.params.id}})
            if (!teacher) {
                return next(apiError.notFound(`Teacher with id: ${req.params.id} do not exist`))
            }
            const {id, login, firstName, lastName, middleName} = teacher
            return res.json({id, login, firstName, lastName, middleName})
        } catch (e) {
            next(apiError.badRequest(e.message))
        }
    }
}

module.exports = new TeacherController()