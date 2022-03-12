const {Miss} = require('../models/models')
const apiError = require('../error/ApiError')
const {validationResult} = require('express-validator')

class MissController {
    async findAll(req, res) {
        const misses = await Miss.findAll()
        return res.json(misses)
    }

    async create(req, res, next) {

    }
}

module.exports = new MissController()