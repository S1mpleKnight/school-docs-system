const service = require('../service/SubjectService')

class TimetableController {
    async findAll(req, res, next) {
        await service.findAll(req, res, next)
    }

    async create(req, res, next) {

    }

    async findById(req, res) {

    }
}

module.exports = new TimetableController()