const {Voucher} = require('../models/models')
const apiError = require('../error/ApiError')

class VoucherService {
    async findAll(req, res, next) {
        try {
            const rawVouchers = await Voucher.findAll()
            const vouchers = JSON.parse(JSON.stringify(rawVouchers))
            let responseBody = [];
            for (const voucher of vouchers) {
                const {documentUrl, uploadDate, id} = voucher
                responseBody.push({id, documentUrl, uploadDate})
            }
            console.log('\x1b[32m%s\x1b[0m', `Vouchers send: ${responseBody.length} date: ${new Date(Date.now()).toUTCString()}}`)
            return res.json(responseBody)
        } catch (e) {
            console.log('\x1b[31m%s\x1b[0m', `Error in the VoucherController findAll method ${e}`)
            next(apiError.badRequest(e.message))
        }
    }

    async uploadVoucher(req, res, next) {
        try {
            const documentUrl = req.file.path
            const uploadDate = Date.now()
            const voucher = await Voucher.create({documentUrl, uploadDate})
            const id = voucher.id
            return res.json({id, documentUrl, uploadDate})
        } catch (e) {
            console.log('\x1b[31m%s\x1b[0m', `Error in the VoucherController upload method ${e}`)
            next(apiError.badRequest(e.message))
        }
    }

    async findById(req, res, next) {
        try {
            const voucher = await Voucher.findOne({where: {"id": req.params.id}})
            if (!voucher) {
                return next(apiError.notFound(`voucher with id: ${req.params.id} do not exist`))
            }
            const {documentUrl, uploadDate, id} = voucher
            return res.json({id, documentUrl, uploadDate})
        } catch (e) {
            console.log('\x1b[31m%s\x1b[0m', `Error in the VoucherController findById method ${e}`)
            next(apiError.badRequest(e.message))
        }
    }
}

module.exports = new VoucherService()