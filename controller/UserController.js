const service = require('../service/UserService')

class UserController {
    async create(req, res, next) {
        await service.create(req, res, next)
    }

    async findAllStudents(req, res, next) {
        await service.findAllStudents(req, res, next)
    }

    async findAllTeachers(req, res, next) {
        await service.findAllTeachers(req, res, next)
    }

    async findStudentById(req, res, next) {
        await service.findStudentById(req, res, next)
    }

    async findTeacherById(req, res, next){
        await service.findTeacherById(req, res, next)
    }

    async deleteTeacher(req, res, next) {
        await service.deleteTeacher(req, res, next)
    }

    async deleteStudent(req, res, next) {
        await service.deleteStudent(req, res, next)
    }

    async updateTeacher(req, res, next) {
        await service.updateTeacher(req, res, next)
    }

    async updateStudent(req, res, next) {
        await service.updateStudent(req, res, next)
    }
}

module.exports = new UserController()