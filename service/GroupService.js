const {Group, Positions, Term} = require('../models/models')
const apiError = require('../error/ApiError')
const {Op} = require('sequelize')
const {validationResult} = require('express-validator')
const parsingErrors = require("../error/ErrorParser");

class GroupService {
    async findAll(req, res, next) {
        try {
            const rawGroups = await Group.findAll()
            const groups = JSON.parse(JSON.stringify(rawGroups))
            let responseBody = [];
            for (const group of groups) {
                const {id, letter, number} = group
                responseBody.push({id, letter, number})
            }
            console.log('\x1b[32m%s\x1b[0m', `Groups sent: ${responseBody.length} date: ${new Date(Date.now()).toUTCString()}}`)
            return res.json(responseBody)
        } catch (e) {
            console.log('\x1b[31m%s\x1b[0m', `Error in the GroupService findAll method ${e}`)
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
            let {letter, number} = req.body
            letter = letter.toUpperCase()
            const group = await Group.create({letter, number})
            return res.json(group)
        } catch (e) {
            console.log('\x1b[31m%s\x1b[0m', `Error in the GroupService creation method ${e}`)
            next(apiError.badRequest(e.message))
        }
    }

    async findById(req, res, next) {
        try {
            const group = await Group.findOne({where: {"id": req.params.id}})
            if (!group) {
                return next(apiError.notFound(`Group with id: ${req.params.id} do not exist`))
            }
            const {id, letter, number} = group
            return res.json({id, letter, number})
        } catch (e) {
            console.log('\x1b[31m%s\x1b[0m', `Error in the GroupService findById method ${e}`)
            next(apiError.badRequest(e.message))
        }
    }

    async delete(req, res, next) {
        try {
            const group = await Group.findOne({where: {"id": req.params.id}})
            if (!group) {
                return next(apiError.notFound(`Group with id: ${req.params.id} do not exist`))
            }
            await Group.destroy({
                where: {
                    id: group.id
                }
            })
            const message = `Group with id ${group.id} was deleted successfully`
            return res.json({message})
        } catch (e) {
            console.log('\x1b[31m%s\x1b[0m', `Error in the GroupService delete method ${e}`)
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
            const group = await Group.findOne({where: {"id": req.params.id}})
            if (!group) {
                return next(apiError.notFound(`Group with id: ${req.params.id} does not exist`))
            }
            let {letter, number} = req.body
            if (letter) {
                group.letter = letter
            }
            if (number) {
                group.number = number
            }
            await Group.update(
                {
                    "letter": group.letter,
                    "number": group.number
                },
                {
                    where: {
                        "id": req.params.id
                    }
                }
            )
            console.log(`Group with id: ${req.params.id} updated successfully`)
            return res.json(group)
        } catch (e) {
            console.log('\x1b[31m%s\x1b[0m', `Error in the GroupService update method ${e}`)
            next(apiError.badRequest(e.message))
        }
    }

    async findTeacherGroupsByCurrentTerm(req, res, next) {
        try {
            const date = new Date()
            const term = await Term.findOne({
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
            const positions = await Positions.findAll({
                where: {
                    [Op.and]: [
                        {
                            term: term.id
                        },
                        {
                            teacher: req.userId
                        }
                    ]
                },
                attributes: ['groupId']
            })
            const groupIds = []
            for (const position of positions.map(p => p.groupId).map(l => l + "")) {
                groupIds.push(position)
            }
            const groups = await Group.findAll({
                where: {
                    id: {
                        [Op.in] : groupIds
                    }
                },
                attributes: ['number', 'letter', 'id']
            })
            console.log('\x1b[32m%s\x1b[0m', `Groups sent: ${groups.length} date: ${new Date(Date.now()).toUTCString()}`)
            return res.json(groups)
        } catch (e) {
            console.log('\x1b[31m%s\x1b[0m', `Error in the GroupService findTeacherGroupsByCurrentTerm method ${e}`)
            next(apiError.badRequest(e.message))
        }
    }
}

module.exports = new GroupService()