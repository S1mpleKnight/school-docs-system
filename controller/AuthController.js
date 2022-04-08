const service = require('../service/AuthService')

class AuthController {
    async login(req, res, next) {
        await service.login(req, res, next)
    }
}

module.exports = new AuthController()