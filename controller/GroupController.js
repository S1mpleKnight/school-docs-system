const {Group} = require('../models/models')
const apiError = require('../error/ApiError')
const {validationResult} = require('express-validator')

class GroupController {
    async findAll(req, res) {
        const groups = await Group.findAll()
        return res.json(groups)
    }

    async create(req, res, next) {

    }

    async findById(req, res) {

    }
}

module.exports = new GroupController()