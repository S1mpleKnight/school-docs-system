const apiError = require("../error/ApiError");
const jwt = require("jsonwebtoken");
const config = require('config')
const SECRET = config.get("secret")

module.exports = function (role) {
    return function (req, res, next) {
        if (req.method === "OPTIONS") {
            next()
        }
        try {
            const token = req.header('Authorization').split(' ')[1]
            if (!token) {
                return next(apiError.badRequest('You are not authorized: jwt token was not found'))
            }
            const role = jwt.verify(token, SECRET)
            if (role !== role) {
                return next(apiError.forbidden('You are have not access to this source'))
            }
            next()
        } catch (e) {
            console.log(e)
            return next(apiError.badRequest("You are not authorized"))
        }
    }
}