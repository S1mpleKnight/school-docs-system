const {User, Role} = require('../models/models')
const apiError = require('../error/ApiError')
const {validationResult} = require('express-validator')
const bcrypt = require('bcrypt')
const config = require('config')
const SALT_ROUNDS = parseInt(config.get("salt_rounds"), 10)
const parsingErrors = require('../error/ErrorParser')

function getFilteredUsers(users, roleName) {
    let filteredUsers = [];
    for (const user of users) {
        if (user.roleName === roleName) {
            filteredUsers.push(user)
        }
    }
    return filteredUsers
}

class UserController {
    async create(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                let errorMessages = parsingErrors(errors);
                return next(apiError.badRequest([...errorMessages]))
            }
            const {firstName, lastName, middleName, login, password, roleId} = req.body
            const candidate = await User.findOne({where: {login: login}})
            if (candidate) {
                return next(apiError.unprocessableEntity("User with this login already exists"))
            }
            const passwordHash = bcrypt.hashSync(password, SALT_ROUNDS)
            const user = await User.create({
                firstName,
                lastName,
                middleName,
                login,
                passwordHash,
                roleId
            })
            return res.json(user)
        } catch (e) {
            console.log(`Error in the UserController creation method ${e}`)
            next(apiError.badRequest(e.message))
        }
    }

    async findAllStudents(req, res, next) {
        try {
            const rawRoles = await Role.findAll()
            const roles = JSON.parse(JSON.stringify(rawRoles))
            const rawUsers = await User.findAll()
            const users = JSON.parse(JSON.stringify(rawUsers))
            let responseBody = [];
            for (const user of users) {
                const {id, login, firstName, lastName, middleName, roleId} = user
                const roleName = roles[roleId - 1].name
                responseBody.push({id, login, firstName, lastName, middleName, roleName})
            }
            const students = getFilteredUsers(responseBody, 'STUDENT')
            return res.json(students)
        } catch (e) {
            console.log(`Error in the UserController findAllStudents method ${e}`)
            next(apiError.badRequest(e.message))
        }
    }

    async findAllTeachers(req, res, next) {
        try {
            const rawRoles = await Role.findAll()
            const roles = JSON.parse(JSON.stringify(rawRoles))
            const rawUsers = await User.findAll()
            const users = JSON.parse(JSON.stringify(rawUsers))
            let responseBody = [];
            for (const user of users) {
                const {id, login, firstName, lastName, middleName, roleId} = user
                const roleName = roles[roleId - 1].name
                responseBody.push({id, login, firstName, lastName, middleName, roleName})
            }
            const teachers = getFilteredUsers(responseBody, 'TEACHER')
            return res.json(teachers)
        } catch (e) {
            console.log(`Error in the UserController findAllTeachers method ${e}`)
            next(apiError.badRequest(e.message))
        }
    }

    async findStudentById(req, res, next) {
        try {
            const user = await User.findOne({where: {"id": req.params.id}})
            if (!user) {
                return next(apiError.notFound(`Student with id: ${req.params.id} do not exist`))
            }
            if (user.role !== 3) {
                return next(apiError.notFound(`Student with id: ${req.params.id} do not exist`))
            }
            const {id, login, firstName, lastName, middleName} = user
            return {id, login, firstName, lastName, middleName}
        } catch (e) {
            console.log(`Error in the UserController findById method ${e}`)
            next(apiError.badRequest(e.message))
        }
    }

    async findTeacherById(req, res, next){
        try {
            const user = await User.findOne({where: {"id": req.params.id}})
            if (!user) {
                return next(apiError.notFound(`Teacher with id: ${req.params.id} do not exist`))
            }
            if (user.role !== 2) {
                return next(apiError.notFound(`Teacher with id: ${req.params.id} do not exist`))
            }
            const {id, login, firstName, lastName, middleName} = user
            return {id, login, firstName, lastName, middleName}
        } catch (e) {
            console.log(`Error in the UserController findById method ${e}`)
            next(apiError.badRequest(e.message))
        }
    }
}

module.exports = new UserController()