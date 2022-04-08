const service = require('../service/MarkService')

class MarkController {
    async findAll(req, res, next) {
        await service.findAll(req, res, next)
    }

    async create(req, res, next) {

    }

    async findStudentTermMarks(req, res, next) {
        await service.findStudentTermMarks(req, res, next)
    }
}

module.exports = new MarkController()