const service = require('../service/MarkService')
const {User} = require('../models/models')
// const jwt = require("jsonwebtoken");
// const SECRET = process.env.SECRET

class MarkController {
    async findAll(req, res, next) {
        await service.findAll(req, res, next)
    }

    async create(req, res, next) {
        await service.create(req, res, next)
    }

    async update(req, res, next) {
        await service.update(req, res, next)
    }

    async delete(req, res, next) {
        await service.delete(req, res, next)
    }

    async findStudentTermMarks(req, res, next) {
        await service.findStudentTermMarks(req, res, next)
    }

    async findTeachersMarksCurrentTerm(req, res, next) {
        await service.findTeachersMarksCurrentTerm(req, res, next)
    }

    async findMarks(req, res, next) {
        const user = User.findOne({where: {"id": req.userId}})
        console.log("its here" + user.roleId)
        await service.findAllStudentMarks(req, res, next)
    }


}

module.exports = new MarkController()