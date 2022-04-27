const {Term} = require('../models/models')
const apiError = require('../error/ApiError')
const {validationResult} = require("express-validator");
const parsingErrors = require("../error/ErrorParser");

class TermService {
    async findAll(req, res, next) {
        try {
            const terms = await Term.findAll()
            console.log('\x1b[32m%s\x1b[0m', `Terms send: ${terms.length} date: ${new Date(Date.now()).toUTCString()}}`)
            return res.json(terms)
        } catch (e) {
            console.log('\x1b[31m%s\x1b[0m', `Error in the TermService findAll method ${e}`)
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
            let {startDate, endDate, number} = req.body
            startDate = new Date(startDate)
            endDate = new Date(endDate)
            const term = await Term.create({startDate, endDate, number})
            return res.json(term)
        } catch (e) {
            console.log('\x1b[31m%s\x1b[0m', `Error in the TermService creation method ${e}`)
            next(apiError.badRequest(e.message))
        }
    }

    async findById(req, res, next) {
        try {
            const term = await Term.findOne({where: {"id": req.params.id}})
            if (!term) {
                return next(apiError.notFound(`Term with id: ${req.params.id} do not exist`))
            }
            const {id, startDate, endDate, number} = term
            return res.json({id, startDate, endDate, number})
        } catch (e) {
            console.log('\x1b[31m%s\x1b[0m', `Error in the TermService findById method ${e}`)
            next(apiError.badRequest(e.message))
        }
    }

    async delete(req, res, next) {
        try {
            const term = await Term.findOne({where: {"id": req.params.id}})
            if (!term) {
                return next(apiError.notFound(`Term with id: ${req.params.id} do not exist`))
            }
            await Term.destroy({
                where: {
                    id: term.id
                }
            })
            const message = `Term with id ${term.id} was deleted successfully`
            return res.json({message})
        } catch (e) {
            console.log('\x1b[31m%s\x1b[0m', `Error in the TermService delete method ${e}`)
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
            const term = await Term.findOne({where: {"id": req.params.id}})
            if (!term) {
                return next(apiError.notFound(`Term with id: ${req.params.id} do not exist`))
            }
            const {startDate, endDate, number} = req.body
            if (startDate) {
                term.startDate = new Date(startDate)
            }
            if (endDate) {
                term.endDate = new Date(endDate)
            }
            if (number) {
                term.number = number
            }
            await Term.update(
                {
                    "endDate": term.endDate,
                    "startDate": term.startDate,
                    "number": term.number
                },
                {
                    where: {
                        "id": req.params.id
                    }
                }
            )
            console.log(`Term with id: ${req.params.id} updated successfully`)
            return res.json(term)
        } catch (e) {
            console.log('\x1b[31m%s\x1b[0m', `Error in the TermService update method ${e}`)
            next(apiError.badRequest(e.message))
        }
    }
}

module.exports = new TermService()