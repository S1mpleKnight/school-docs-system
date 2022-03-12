const {Mark} = require('../models/models')
const apiError = require('../error/ApiError')
const {validationResult} = require('express-validator')

class MarkController {
    async findAll(req, res) {
        const marks = await Mark.findAll()
        return res.json(marks)
    }

    async create(req, res, next) {

    }
}

module.exports = new MarkController()