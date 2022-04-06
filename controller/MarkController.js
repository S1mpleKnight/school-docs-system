const {Mark, Subject, User} = require('../models/models')
const apiError = require('../error/ApiError')
const {validationResult} = require('express-validator')

class MarkController {
    async findAll(req, res, next) {
        try {
            const marks = await Mark.findAll()
            return res.json(marks)
        } catch (e) {
            console.log(`Error in the MarkController findAll method ${e}`)
            next(apiError.badRequest(e.message))
        }
    }

    async create(req, res, next) {

    }

    async findStudentTermMarks(req, res, next) {
        try {
            const markList = await Mark.findAll({
                where : {
                    termId: req.params.term,
                    student: req.params.id
                }
            })
            let fullInfo = []
            let markInfo;
            for (markInfo of markList) {
                let fullMark = {}
                const subject = await Subject.findOne({
                    where : {
                        id: markInfo.subject
                    }
                })
                fullMark.subject = subject.name
                const teacher = await User.findOne({
                    where : {
                        id: markInfo.teacher
                    }
                })
                fullMark.teacher = teacher.firstName + " " + teacher.middleName + " " + teacher.lastName
                fullMark.value = markInfo.value
                fullMark.date = markInfo.date
                fullInfo.push(fullMark)
            }
            return res.json(fullInfo)
        } catch (e) {
            console.log(`Error in the MarkController findStudentTermMarks method ${e}`)
            next(apiError.badRequest(e.message))
        }
    }
}

module.exports = new MarkController()