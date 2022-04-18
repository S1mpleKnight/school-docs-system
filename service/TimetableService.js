const {Timetable, Group} = require('../models/models')
const {Op} = require("sequelize")
const apiError = require('../error/ApiError')

class TimetableService {
    async findAll(req, res, next) {
        try {
            const lessons = await Timetable.findAll()
            return res.json(lessons)
        } catch (e) {
            console.log('\x1b[31m%s\x1b[0m', `Error in the TimetableController findAll method ${e}`)
            next(apiError.badRequest(e.message))
        }
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
            console.log('\x1b[31m%s\x1b[0m', `Error in the TimetableService delete method ${e}`)
            next(apiError.badRequest(e.message))
        }
    }

    async findAllGroupsByTeacher(req, res, next) {
        try {
            const lessons = await Timetable.findAll({
                where: {
                    "teacher": req.params.id,
                },
                attributes: ['groupId']
            })
            const lessonSet = new Set()
            for (const lesson of lessons.map(l => l.groupId).map(l => l + "")) {
                lessonSet.add(lesson)
            }
            const groupIds = Array.from(lessonSet)
            let groups = []
            if (groupIds.length !== 0) {
                groups = await Group.findAll({
                    where: {
                        "id": {
                            [Op.in] : groupIds
                        }
                    },
                    attributes: ['letter', 'number']
                })
            }
            return res.json(groups)
        } catch (e) {
            console.log('\x1b[31m%s\x1b[0m', `Error in the TimetableService findAllGroupByTeacher method ${e}`)
            next(apiError.badRequest(e.message))
        }
    }

    async create(req, res, next) {

    }

    async findById(req, res, next) {

    }

    async update(req, res, next) {

    }
}

module.exports = new TimetableService()