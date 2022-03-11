const {Teacher} = require('../models/models')
const ApiError = require('../error/ApiError')

class TeacherController {
    async create(req, res, next) {
        try {
            const {firstName, lastName, secondName, login, password, roleId} = req.body
            const teacher = await Teacher.create({firstName, lastName, secondName, login, password, roleId})
            return res.json(teacher)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {
        const teachers = await Teacher.findAll()
        return res.json(teachers)
    }
}

module.exports = new TeacherController()