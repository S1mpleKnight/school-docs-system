const {Positions, Group, Term} = require('../models/models')
const {Op} = require("sequelize")
const apiError = require('../error/ApiError')

class PositionService {
    async findAll(req, res, next) {
        try {
            const date = new Date()
            const firstTerm = await Term.findOne({
                where: {
                    [Op.and]: [
                        {
                            startDate: {
                                [Op.lte]: date
                            }
                        },
                        {
                            endDate: {
                                [Op.gte]: date
                            }
                        }
                    ]
                }
            })
            const secondTerm = await Term.findOne({
                where: {
                    startDate: {
                        [Op.gt]: firstTerm.endDate
                    }
                },
                order: [['startDate', 'ASC']]
            })
            const lessons = await Positions.findAll({
                where: {
                    term: {
                        [Op.in]: [firstTerm.id, secondTerm.id]
                    }
                }
            })
            return res.json(lessons)
        } catch (e) {
            console.log('\x1b[31m%s\x1b[0m', `Error in the PositionsController findAll method ${e}`)
            next(apiError.badRequest(e.message))
        }
    }

    async findAllGroupsByTeacher(req, res, next) {
        try {
            const lessons = await Positions.findAll({
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
            console.log('\x1b[31m%s\x1b[0m', `Error in the PositionsService findAllGroupByTeacher method ${e}`)
            next(apiError.badRequest(e.message))
        }
    }

    async delete(req, res, next) {

    }

    async create(req, res, next) {

    }

    async findById(req, res, next) {

    }

    async update(req, res, next) {

    }
}

module.exports = new PositionService()