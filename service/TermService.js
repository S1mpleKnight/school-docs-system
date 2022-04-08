const {Term} = require('../models/models')
const apiError = require('../error/ApiError')

class TermService {
    async findAll(req, res, next) {
        try {
            const terms = await Term.findAll()
            return res.json(terms)
        } catch (e) {
            console.log(`Error in the TermController findAll method ${e}`)
            next(apiError.badRequest(e.message))
        }
    }

    async create(req, res, next) {

    }

    async findById(req, res) {

    }
}

module.exports = new TermService()