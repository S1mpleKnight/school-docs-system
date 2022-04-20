const {User, Role, Group} = require('../models/models')
const apiError = require('../error/ApiError')
const {validationResult} = require('express-validator')
const bcrypt = require('bcrypt')
const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS, 10)
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
            const {firstName, lastName, middleName, login, password, groupId} = req.body
            const candidate = await User.findOne({where: {"login": login}})
            if (candidate) {
                return next(apiError.unprocessableEntity("User with this login already exists"))
            }
            if (groupId) {
                const group = await Group.findOne({where: {"id": groupId}})
                if (!group) {
                    return next(apiError.notFound(`Group with id: ${groupId} does not exist`))
                }
            }
            const roleId = req.roleId
            const passwordHash = bcrypt.hashSync(password, SALT_ROUNDS)
            const user = await User.create({
                firstName,
                lastName,
                middleName,
                login,
                passwordHash,
                roleId,
                groupId
            })
            return res.json(user)
        } catch (e) {
            console.log('\x1b[31m%s\x1b[0m', `Error in the UserService creation method ${e}`)
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
                const {id, login, firstName, lastName, middleName, roleId, groupId} = user
                const roleName = roles[roleId - 1].name
                responseBody.push({id, login, firstName, lastName, middleName, roleName, groupId})
            }
            const students = getFilteredUsers(responseBody, 'STUDENT')
            console.log('\x1b[32m%s\x1b[0m', `Users send: ${students.length} date: ${new Date(Date.now()).toUTCString()}}`)
            return res.json(students)
        } catch (e) {
            console.log('\x1b[31m%s\x1b[0m', `Error in the UserService findAllStudents method ${e}`)
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
                const {id, login, firstName, lastName, middleName, roleId, groupId} = user
                const roleName = roles[roleId - 1].name
                responseBody.push({id, login, firstName, lastName, middleName, roleName, groupId})
            }
            const teachers = getFilteredUsers(responseBody, 'TEACHER')
            console.log('\x1b[32m%s\x1b[0m', `Users send: ${teachers.length} date: ${new Date(Date.now()).toUTCString()}}`)
            return res.json(teachers)
        } catch (e) {
            console.log('\x1b[31m%s\x1b[0m', `Error in the UserService findAllTeachers method ${e}`)
            next(apiError.badRequest(e.message))
        }
    }

    async findStudentById(req, res, next) {
        try {
            const user = await User.findOne({where: {"id": req.params.id}})
            if (!user || user.roleId !== 3) {
                return next(apiError.notFound(`Student with id: ${req.params.id} does not exist`))
            }
            const {id, login, firstName, lastName, middleName} = user
            return res.json({id, login, firstName, lastName, middleName})
        } catch (e) {
            console.log('\x1b[31m%s\x1b[0m', `Error in the UserService findById method ${e}`)
            next(apiError.badRequest(e.message))
        }
    }

    async findStudentsByGroup(req, res, next) {
        try {
            const group = await Group.findByPk(req.params.id)
            if (!group) {
                return next(apiError.notFound(`Group with id: ${req.params.id} does not exist`))
            }
            const students = await User.findAll({where: {"groupId" : req.params.id}})
            let result = []
            for (let student of students) {
                if (student.roleId === 3) {
                    const {firstName, lastName, middleName} = student
                    result.push({firstName, lastName, middleName})
                }
            }
            console.log('\x1b[32m%s\x1b[0m', `Users send: ${result.length} date: ${new Date(Date.now()).toUTCString()}}`)
            return res.json(result)
        } catch (e) {
            console.log('\x1b[31m%s\x1b[0m', `Error in the UserService findStudentsByGroup method ${e}`)
            next(apiError.badRequest(e.message))
        }
    }

    async findTeacherById(req, res, next) {
        try {
            const user = await User.findOne({where: {"id": req.params.id}})
            if (!user || user.roleId !== 2) {
                return next(apiError.notFound(`Teacher with id: ${req.params.id} do not exist`))
            }
            const {id, login, firstName, lastName, middleName, groupId} = user
            return res.json({id, login, firstName, lastName, middleName, groupId})
        } catch (e) {
            console.log('\x1b[31m%s\x1b[0m', `Error in the UserService findById method ${e}`)
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
            console.log('\x1b[31m%s\x1b[0m', `Error in the UserService findById method ${e}`)
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
            console.log('\x1b[31m%s\x1b[0m', `Error in the UserService findById method ${e}`)
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
            let {firstName, lastName, middleName, login, password, groupId} = req.body
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
            if (await Group.findOne({where: {"id": groupId}})) {
                teacher.groupId = groupId
            } else {
                return next(apiError.notFound(`Group with id: ${groupId} does not exist`))
            }
            if (password) {
                if (password.length < 10 || password.length > 50) {
                    console.log('\x1b[31m%s\x1b[0m', 'Error in UserService updateTeacher method: Invalid password (from 10 to 50)')
                    return next(apiError.badRequest('Invalid password (from 10 to 50)'))
                }
                teacher.passwordHash = bcrypt.hashSync(password, SALT_ROUNDS)
            }
            const result = await User.update(
                {
                    "firstName": teacher.firstName,
                    "lastName": teacher.lastName,
                    "middleName": teacher.middleName,
                    "passwordHash": teacher.passwordHash,
                    "login": teacher.login,
                    "groupId": teacher.groupId
                },
                {
                    where: {
                        "id": req.params.id
                    }
                }
            )
            console.log('\x1b[31m%s\x1b[0m', result)
            const message = `Teacher with id: ${req.params.id} updated successfully`
            return res.json({message})
        } catch (e) {
            console.log('\x1b[31m%s\x1b[0m', `Error in the UserService findById method ${e}`)
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
            let {firstName, lastName, middleName, login, password, groupId} = req.body
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
            if (await Group.findOne({where: {"id": groupId}})) {
                student.groupId = groupId
            } else {
                return next(apiError.notFound(`Group with id: ${groupId} does not exist`))
            }
            if (password) {
                if (password.length < 10 || password.length > 50) {
                    console.log('\x1b[31m%s\x1b[0m', 'Error in UserService updateStudent method: Invalid password (from 10 to 50)')
                    return next(apiError.badRequest('Invalid password (from 10 to 50)'))
                }
                student.passwordHash = bcrypt.hashSync(password, SALT_ROUNDS)
            }
            await User.update(
                {
                    "firstName": student.firstName,
                    "lastName": student.lastName,
                    "middleName": student.middleName,
                    "passwordHash": student.passwordHash,
                    "login": student.login,
                    "groupId": student.groupId
                },
                {
                    where: {
                        "id": req.params.id
                    }
                }
            )
            const message = `Student with id: ${req.params.id} updated successfully`
            return res.json({message})
        } catch (e) {
            console.log('\x1b[31m%s\x1b[0m', `Error in the UserService findById method ${e}`)
            next(apiError.badRequest(e.message))
        }
    }

    async profile(req, res, next) {
        try {
            const user = await User.findByPk(req.userId)
            const {login, firstName, lastName, middleName} = user
            return res.json({login, firstName, lastName, middleName})
        } catch (e) {
            console.log('\x1b[31m%s\x1b[0m', `Error in the UserService profile method ${e}`)
            next(apiError.badRequest(e.message))
        }
    }
}

module.exports = new UserService()