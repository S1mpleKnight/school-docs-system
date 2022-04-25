const {Positions, Group, Term, User, Subject} = require('../models/models')
const {Op} = require("sequelize")
const apiError = require('../error/ApiError')
const {validationResult} = require("express-validator");
const parsingErrors = require("../error/ErrorParser");

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
            console.log('\x1b[32m%s\x1b[0m', `Positions sent: ${lessons.length} date: ${new Date(Date.now()).toUTCString()}}`)
            return res.json(lessons)
        } catch (e) {
            console.log('\x1b[31m%s\x1b[0m', `Error in the PositionsService findAll method ${e}`)
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
            console.log('\x1b[32m%s\x1b[0m', `Positions send: ${groups.length} date: ${new Date(Date.now()).toUTCString()}}`)
            return res.json(groups)
        } catch (e) {
            console.log('\x1b[31m%s\x1b[0m', `Error in the PositionsService findAllGroupByTeacher method ${e}`)
            next(apiError.badRequest(e.message))
        }
    }

    async create(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                let errorMessages = parsingErrors(errors);
                return next(apiError.badRequest([...errorMessages]))
            }
            const {teacher, groupId, term, subject} = req.body
            const specifiedTeacher = await User.findByPk(teacher)
            const specifiedGroup = await Group.findByPk(groupId)
            const specifiedTerm = await Term.findByPk(term)
            const specifiedSubject = await Subject.findByPk(subject)
            if (!specifiedTeacher) {
                return next(apiError.notFound(`User with id: ${teacher} does not exist`))
            }
            if (!specifiedGroup) {
                return next(apiError.notFound(`Group with id: ${groupId} does not exist`))
            }
            if (!specifiedTerm) {
                return next(apiError.notFound(`Term with id: ${term} does not exist`))
            }
            if (!specifiedSubject) {
                return next(apiError.notFound(`Subject with id: ${subject} does not exist`))
            }
            const position = await Positions.create({teacher, groupId, term, subject})
            return res.json(position)
        } catch (e) {
            console.log('\x1b[31m%s\x1b[0m', `Error in the PositionsService create method ${e}`)
            next(apiError.badRequest(e.message))
        }
    }

    async delete(req, res, next) {
        try {
            const position = await Positions.findOne({where: {"id": req.params.id}})
            if (!position) {
                return next(apiError.notFound(`Position with id: ${req.params.id} do not exist`))
            }
            await Positions.destroy({
                where: {
                    id: position.id
                }
            })
            const message = `Position with id ${position.id} was deleted successfully`
            return res.json({message})
        } catch (e) {
            console.log('\x1b[31m%s\x1b[0m', `Error in the PositionsService delete method ${e}`)
            next(apiError.badRequest(e.message))
        }
    }

    async update(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                let errorMessages = parsingErrors(errors);
                return next(apiError.badRequest([...errorMessages]))
            }
            const position = await Positions.findByPk(req.params.id)
            if (!position) {
                return next(apiError.notFound(`Position with id: ${req.params.id} does not exist`))
            }
            const {teacher, groupId, term, subject} = req.body
            if (teacher) {
                const specifiedTeacher = await User.findByPk(teacher)
                if (!specifiedTeacher) {
                    return next(apiError.notFound(`User with id: ${teacher} does not exist`))
                }
                position.teacher = teacher;
            }
            if (groupId) {
                const specifiedGroup = await Group.findByPk(groupId)
                if (!specifiedGroup) {
                    return next(apiError.notFound(`Group with id: ${groupId} does not exist`))
                }
                position.groupId = groupId;
            }
            if (term) {
                const specifiedTerm = await Term.findByPk(term)
                if (!specifiedTerm) {
                    return next(apiError.notFound(`Term with id: ${term} does not exist`))
                }
                position.term = term;
            }
            if (subject) {
                const specifiedSubject = await Subject.findByPk(subject)
                if (!specifiedSubject) {
                    return next(apiError.notFound(`Subject with id: ${subject} does not exist`))
                }
                position.subject = subject;
            }
            await Positions.update(
                {
                    "teacher": position.teacher,
                    "groupId": position.groupId,
                    "term": position.term,
                    "subject": position.subject
                },
                {
                    where: {
                        "id": req.params.id
                    }
                })
            const message = `Position with id: ${req.params.id} updated successfully`
            return res.json({message})
        } catch (e) {
            console.log('\x1b[31m%s\x1b[0m', `Error in the PositionsService create method ${e}`)
            next(apiError.badRequest(e.message))
        }
    }
}

module.exports = new PositionService()