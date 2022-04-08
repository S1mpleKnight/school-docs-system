const service = require('../service/SubjectService')

class SubjectController {
    async findAll(req, res, next) {
        await service.findAll(req, res, next)
    }

    async create(req, res, next) {

    }

    async findById(req, res) {

    }
}

module.exports = new SubjectController()