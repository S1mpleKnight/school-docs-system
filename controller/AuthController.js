const {User} = require('../models/models')
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
            const user = await User.findOne({where: {login: login}})
            if (!user) {
                return next(apiError.notFound(`User with username: ${login} was not found`))
            }
            const validPassword = bcrypt.compareSync(password, user.passwordHash)
            if (!validPassword) {
                return next(apiError.unauthorized(`Invalid password`))
            }
            const token = generateAccessToken(user.id, user.role)
            return res.json({token})
        } catch (e) {
            return next(apiError.badRequest(`Login was failed: ${e.message}`))
        }
    }
}

module.exports = new AuthController()