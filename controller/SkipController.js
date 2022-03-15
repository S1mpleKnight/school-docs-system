const {Skip} = require('../models/models')
const apiError = require('../error/ApiError')
const {validationResult} = require('express-validator')

class SkipController {
    async findAll(req, res) {
        const skips = await Skip.findAll()
        return res.json(skips)
    }

    async create(req, res, next) {

    }
}

module.exports = new SkipController()