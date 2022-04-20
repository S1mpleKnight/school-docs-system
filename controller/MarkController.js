const service = require('../service/MarkService')

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

    async findAllStudentMarks(req, res, next) {
        await service.findAllStudentMarks(req, res, next)
    }
}

module.exports = new MarkController()