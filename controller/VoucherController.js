const service = require('../service/VoucherService')

class VoucherController {
    async findAll(req, res, next) {
        await service.findAll(req, res, next)
    }

    async uploadVoucher(req, res, next) {
        await service.uploadVoucher(req, res, next)
    }

    async findById(req, res, next) {
        await service.findById(req, res, next)
    }
}

module.exports = new VoucherController()