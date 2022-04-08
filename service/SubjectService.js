const {Subject} = require('../models/models')
const apiError = require('../error/ApiError')

class SubjectService {
    async findAll(req, res, next) {
        try {
            const subjects = await Subject.findAll()
            return res.json(subjects)
        } catch (e) {
            console.log(`Error in the SubjectController findAll method ${e}`)
            next(apiError.badRequest(e.message))
        }
    }

    async create(req, res, next) {

    }

    async findById(req, res) {

    }
}

module.exports = new SubjectService()