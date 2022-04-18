const apiError = require("../error/ApiError");
const jwt = require("jsonwebtoken");
const {Role} = require("../models/models");
const SECRET = process.env.SECRET

module.exports = function (role) {
    return async function (req, res, next) {
        if (req.method === "OPTIONS") {
            next()
        }
        try {
            const token = req.header('Authorization').split(' ')[1]
            if (!token) {
                return next(apiError.badRequest('You are not authorized: jwt token was not found'))
            }
            const calculatedRole = jwt.verify(token, SECRET)
            const roleName = await Role.findOne({where: {"id": calculatedRole.id}})
            if (role !== roleName.dataValues.name) {
                return next(apiError.forbidden('You are have not access to this source'))
            }
            next()
        } catch (e) {
            console.log('\x1b[31m%s\x1b[0m', `RoleMiddleware error: ${e}`)
            return next(apiError.badRequest("You are not authorized"))
        }
    }
}