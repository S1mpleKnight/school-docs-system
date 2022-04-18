const service = require('../service/TimetableService')

class TimetableController {
    async findAll(req, res, next) {
        await service.findAll(req, res, next)
    }

    async create(req, res, next) {
        await service.create(req, res, next)
    }

    async findById(req, res, next) {
        await service.findById(req, res, next)
    }

    async update(req, res, next) {
        await service.update(req, res, next)
    }

    async delete(req, res, next) {
        await service.delete(req, res, next)
    }

    async findAllGroupsByTeacher(req, res, next) {
        await service.findAllGroupsByTeacher(req, res, next)
    }
}

module.exports = new TimetableController()