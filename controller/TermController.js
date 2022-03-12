const {Term} = require('../models/models')
const apiError = require('../error/ApiError')
const {validationResult} = require('express-validator')

class TermController {
    async findAll(req, res) {
        const terms = await Term.findAll()
        return res.json(terms)
    }

    async create(req, res, next) {

    }

    async findById(req, res) {

    }
}

module.exports = new TermController()