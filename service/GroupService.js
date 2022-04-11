const {Group} = require('../models/models')
const apiError = require('../error/ApiError')
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
            return res.json(responseBody)
        } catch (e) {
            console.log(`Error in the GroupController findAll method ${e}`)
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
            const {formLetter, number} = req.body
            const letter = String(formLetter).toUpperCase().trim()
            const group = await Group.create({letter, number})
            return res.json(group)
        } catch (e) {
            console.log(`Error in the GroupController creation method ${e}`)
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
            console.log(`Error in the GroupController findById method ${e}`)
            next(apiError.badRequest(e.message))
        }
    }
}

module.exports = new GroupService()