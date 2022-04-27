const service = require('../service/PositionService')

class PositionsController {
    async findAll(req, res, next) {
        if (req.userRole === 1) {
            await service.findAll(req, res, next)
        } else if (req.userRole === 2) {
            await service.findAllPositionsByTeacherCurrentNextTerm(req, res, next)
        }
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

    async findAllGroupsByTeacher(req, res, next) {
        await service.findAllGroupsByTeacher(req, res, next)
    }
}

module.exports = new PositionsController()