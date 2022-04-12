const {User, Role} = require('../models/models')
const apiError = require('../error/ApiError')
const {validationResult} = require('express-validator')
const bcrypt = require('bcrypt')
const SALT_ROUNDS = process.env.SALT_ROUNDS
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

class UserService {
    async create(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                let errorMessages = parsingErrors(errors);
                return next(apiError.badRequest([...errorMessages]))
            }
            const {firstName, lastName, middleName, login, password} = req.body
            const candidate = await User.findOne({where: {login: login}})
            if (candidate) {
                return next(apiError.unprocessableEntity("User with this login already exists"))
            }
            const roleId = req.roleId
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
            console.log(`Error in the UserService creation method ${e}`)
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
            console.log(`Error in the UserService findAllStudents method ${e}`)
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
            console.log(`Error in the UserService findAllTeachers method ${e}`)
            next(apiError.badRequest(e.message))
        }
    }

    async findStudentById(req, res, next) {
        try {
            const user = await User.findOne({where: {"id": req.params.id}})
            if (!user || user.roleId !== 3) {
                return next(apiError.notFound(`Student with id: ${req.params.id} do not exist`))
            }
            const {id, login, firstName, lastName, middleName} = user
            return res.json({id, login, firstName, lastName, middleName})
        } catch (e) {
            console.log(`Error in the UserService findById method ${e}`)
            next(apiError.badRequest(e.message))
        }
    }

    async findTeacherById(req, res, next){
        try {
            const user = await User.findOne({where: {"id": req.params.id}})
            if (!user || user.roleId !== 2) {
                return next(apiError.notFound(`Teacher with id: ${req.params.id} do not exist`))
            }
            const {id, login, firstName, lastName, middleName} = user
            return res.json({id, login, firstName, lastName, middleName})
        } catch (e) {
            console.log(`Error in the UserService findById method ${e}`)
            next(apiError.badRequest(e.message))
        }
    }

    async deleteTeacher(req, res, next) {
        try {
            const teacher = await User.findOne({where: {"id": req.params.id}})
            if (!teacher || teacher.roleId !== 2) {
                return next(apiError.notFound(`Teacher with id: ${req.params.id} do not exist`))
            }
            await User.destroy({
                where: {
                    id: teacher.id
                }
            })
            const message = `Teacher with id ${teacher.id} was deleted successfully`
            return res.json({message})
        } catch (e) {
            console.log(`Error in the UserService findById method ${e}`)
            next(apiError.badRequest(e.message))
        }
    }

    async deleteStudent(req, res, next) {
        try {
            const student = await User.findOne({where: {"id": req.params.id}})
            if (!student || student.roleId !== 3) {
                return next(apiError.notFound(`Student with id: ${req.params.id} do not exist`))
            }
            await User.destroy({
                where: {
                    id: student.id
                }
            })
            const message = `Student with id ${student.id} was deleted successfully`
            return res.json({message})
        } catch (e) {
            console.log(`Error in the UserService findById method ${e}`)
            next(apiError.badRequest(e.message))
        }
    }

    async updateTeacher(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                let errorMessages = parsingErrors(errors);
                return next(apiError.badRequest([...errorMessages]))
            }
            const teacher = await User.findOne({where: {"id": req.params.id}})
            if (!teacher || teacher.roleId !== 2) {
                return next(apiError.notFound(`Teacher with id: ${req.params.id} do not exist`))
            }
            let {firstName, lastName, middleName, login, password} = req.body
            if (firstName) {
                teacher.firstName = firstName
            }
            if (lastName) {
                teacher.lastName = lastName
            }
            if (middleName) {
                teacher.middleName = middleName
            }
            if (login) {
                teacher.login = login
            }
            if (password) {
                if (password.length < 10 || password.length > 50) {
                    console.log('Error in UserService updateTeacher method: Invalid password (from 10 to 50)')
                    return next(apiError.badRequest('Invalid password (from 10 to 50)'))
                }
                teacher.passwordHash =  bcrypt.hashSync(password, SALT_ROUNDS)
            }
            const result = await User.update(
                {
                    "firstName" : teacher.firstName,
                    "lastName" : teacher.lastName,
                    "middleName" : teacher.middleName,
                    "passwordHash" : teacher.passwordHash,
                    "login" : teacher.login
                },
                {
                    where : {
                        "id" : req.params.id
                    }
                }
            )
            console.log(result)
            const message = `Teacher with id: ${req.params.id} updated successfully`
            return res.json({message})
        } catch (e) {
            console.log(`Error in the UserService findById method ${e}`)
            next(apiError.badRequest(e.message))
        }
    }

    async updateStudent(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                let errorMessages = parsingErrors(errors);
                return next(apiError.badRequest([...errorMessages]))
            }
            const student = await User.findOne({where: {"id": req.params.id}})
            if (!student || student.roleId !== 3) {
                return next(apiError.notFound(`Student with id: ${req.params.id} do not exist`))
            }
            let {firstName, lastName, middleName, login, password} = req.body
            if (firstName) {
                student.firstName = firstName
            }
            if (lastName) {
                student.lastName = lastName
            }
            if (middleName) {
                student.middleName = middleName
            }
            if (login) {
                student.login = login
            }
            if (password) {
                if (password.length < 10 || password.length > 50) {
                    console.log('Error in UserService updateStudent method: Invalid password (from 10 to 50)')
                    return next(apiError.badRequest('Invalid password (from 10 to 50)'))
                }
                student.passwordHash =  bcrypt.hashSync(password, SALT_ROUNDS)
            }
            const result = await User.update(
                {
                    "firstName" : student.firstName,
                    "lastName" : student.lastName,
                    "middleName" : student.middleName,
                    "passwordHash" : student.passwordHash,
                    "login" : student.login
                },
                {
                    where : {
                        "id" : req.params.id
                    }
                }
            )
            console.log(result)
            const message = `Student with id: ${req.params.id} updated successfully`
            return res.json({message})
        } catch (e) {
            console.log(`Error in the UserService findById method ${e}`)
            next(apiError.badRequest(e.message))
        }
    }
}

module.exports = new UserService()