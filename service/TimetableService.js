const {Timetable} = require('../models/models')
const apiError = require('../error/ApiError')

class TimetableService {
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

    async findById(req, res, next) {

    }

    async update(req, res, next) {

    }

    async delete(req, res, next) {
        try {
            const lesson = await Timetable.findOne({where: {"id": req.params.id}})
            if (!lesson) {
                return next(apiError.notFound(`timetable with id: ${req.params.id} do not exist`))
            }
            await Timetable.destroy({
                where: {
                    id: lesson.id
                }
            })
            const message = `Lesson with id ${lesson.id} was deleted successfully`
            return res.json({message})
        } catch (e) {
            console.log(`Error in the TimetableService delete method ${e}`)
            next(apiError.badRequest(e.message))
        }
    }
}

module.exports = new TimetableService()