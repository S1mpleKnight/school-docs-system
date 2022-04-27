const {Subject} = require('../models/models')
const apiError = require('../error/ApiError')
const {validationResult} = require("express-validator");
const parsingErrors = require("../error/ErrorParser");

class SubjectService {
    async findAll(req, res, next) {
        try {
            const subjects = await Subject.findAll()
            console.log('\x1b[32m%s\x1b[0m', `Subjects send: ${subjects.length} date: ${new Date(Date.now()).toUTCString()}}`)
            return res.json(subjects)
        } catch (e) {
            console.log('\x1b[31m%s\x1b[0m', `Error in the SubjectController findAll method ${e}`)
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
            const {name} = req.body
            const subject = await Subject.create({name})
            return res.json(subject)
        } catch (e) {
            console.log('\x1b[31m%s\x1b[0m', `Error in the subjectController creation method ${e}`)
            next(apiError.badRequest(e.message))
        }
    }

    async findById(req, res, next) {
        try {
            const subject = await Subject.findOne({where: {"id": req.params.id}})
            if (!subject) {
                return next(apiError.notFound(`Subject with id: ${req.params.id} do not exist`))
            }
            const {id, name} = subject
            return res.json({id, name})
        } catch (e) {
            console.log('\x1b[31m%s\x1b[0m', `Error in the SubjectService findById method ${e}`)
            next(apiError.badRequest(e.message))
        }
    }

    async delete(req, res, next) {
        try {
            const subject = await Subject.findOne({where: {"id": req.params.id}})
            if (!subject) {
                return next(apiError.notFound(`Subject with id: ${req.params.id} do not exist`))
            }
            await Subject.destroy({
                where: {
                    id: subject.id
                }
            })
            const message = `Subject with id ${subject.id} was deleted successfully`
            return res.json({message})
        } catch (e) {
            console.log('\x1b[31m%s\x1b[0m', `Error in the SubjectService delete method ${e}`)
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
            const subject = await Subject.findOne({where: {"id": req.params.id}})
            if (!subject) {
                return next(apiError.notFound(`Subject with id: ${req.params.id} do not exist`))
            }
            const {name} = req.body
            if (name) {
                subject.name = name
            }
            await subject.update(
                {
                    "name": subject.name
                },
                {
                    where: {
                        "id": req.params.id
                    }
                }
            )
            console.log(`Subject with id: ${req.params.id} updated successfully`)
            return res.json(subject)
        } catch (e) {
            console.log('\x1b[31m%s\x1b[0m', `Error in the subjectService update method ${e}`)
            next(apiError.badRequest(e.message))
        }
    }
}

module.exports = new SubjectService()