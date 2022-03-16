const {Group} = require('../models/models')
const apiError = require('../error/ApiError')
const {validationResult} = require('express-validator')
const parsingErrors = require("../error/ErrorParser");

class GroupController {
    async findAll(req, res) {
        const rawGroups = await Group.findAll()
        const groups = JSON.parse(JSON.stringify(rawGroups))
        let responseBody = [];
        for (const group of groups) {
            const {id, letter, number} = group
            responseBody.push({id, letter, number})
        }
        return res.json(responseBody)
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
            next(apiError.badRequest(e.message))
        }
    }

    async findById(req, res) {

    }
}

module.exports = new GroupController()