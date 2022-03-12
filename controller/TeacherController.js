const {Teacher} = require('../models/models')
const apiError = require('../error/ApiError')
const {validationResult} = require('express-validator')
const bcrypt = require('bcrypt')
const config = require('config')
const SALT_ROUNDS = parseInt(config.get("salt"), 10)
const TEACHER_ROLE_ID = config.get("teacher_role")


class TeacherController {
    async create(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                let errorMessages = parsingErrors(errors);
                return next(apiError.badRequest([...errorMessages]))
            }
            const {firstName, lastName, secondName, login, password} = req.body
            const candidate = await Teacher.findOne({where: {login : login}})
            if (candidate) {
                return next(apiError.unprocessableEntity("Teacher with this login already exists"))
            }
            let passwordHash;
            await bcrypt.genSalt(SALT_ROUNDS).then(salt => {
                return bcrypt.hash(password, salt)
            }).then(hash => {
                passwordHash = hash
            })
            const teacher = await Teacher.create({firstName, lastName, secondName, login, passwordHash, TEACHER_ROLE_ID})
            return res.json(teacher)
        } catch (e) {
            next(apiError.badRequest(e.message))
        }
    }

    async findAll(req, res) {
        const teachers = await Teacher.findAll()
        return res.json(teachers)
    }

    async findById(req, res) {

    }
}
function parsingErrors(errors) {
    let errorMessages = new Set();
    for (let error of errors.array()) {
        errorMessages.add(error.msg)
    }
    return errorMessages;
}

module.exports = new TeacherController()