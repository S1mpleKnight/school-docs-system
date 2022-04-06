const {Timetable} = require('../models/models')
const apiError = require('../error/ApiError')
const {validationResult} = require('express-validator')

class TimetableController {
    async findAll(req, res, next) {
        try {
            const lessons = await Timetable.findAll()
            return res.json(lessons)
        } catch (e) {
            console.log(`Error in the TimetableController findAll method ${e}`)
            next(apiError.badRequest(e.message))
        }
    }

    async create(req, res, next) {

    }

    async findById(req, res) {

    }
}

module.exports = new TimetableController()