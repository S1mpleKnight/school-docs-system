const apiError = require('../error/ApiError')
const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET

module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") {
        next()
    }
    try {
        const token = req.header('Authorization').split(' ')[1]
        if (!token) {
            return next(apiError.badRequest('You are not authorized: jwt token was not found'))
        }
        req.user = jwt.verify(token, SECRET)
        next()
    } catch (e) {
        console.log(`AuthMiddleware error: ${e}`)
        return next(apiError.badRequest("You are not authorized"))
    }
}