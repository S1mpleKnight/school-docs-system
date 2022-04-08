const service = require('../service/GroupService')

class GroupController {
    async findAll(req, res, next) {
        await service.findAll(req, res, next)
    }

    async create(req, res, next) {
        await service.create(req, res, next)
    }

    async findById(req, res, next) {
        await service.findById(req, res, next)
    }
}

module.exports = new GroupController()