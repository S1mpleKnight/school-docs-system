const {Teacher} = require('../models/models')
const {Student} = require('../models/models')
const bcrypt = require('bcrypt')
const apiError = require('../error/ApiError')
const jwt = require('jsonwebtoken')
const config = require('config')
const SECRET = config.get("secret")

const generateAccessToken = (givenId, givenRole) => {
    return jwt.sign({id: givenId, role: givenRole}, SECRET, {expiresIn: '3h'})
}

class AuthController {
    async login(req, res, next) {
        try {
            const {login, password} = req.body
            const teacher = await Teacher.findOne({where: {login: login}})
            if (!teacher) {
                return next(apiError.notFound(`Student with username: ${login} was not found`))
            }
            const validPassword = bcrypt.compareSync(password, teacher.passwordHash)
            if (!validPassword) {
                return next(apiError.unauthorized(`Invalid password`))
            }
            const token = generateAccessToken(teacher.id, teacher.role)
            console.log(token)
            return res.json({token})
        } catch (e) {
            return next(apiError.badRequest(`Login was failed: ${e.message}`))
        }
    }
}

module.exports = new AuthController()