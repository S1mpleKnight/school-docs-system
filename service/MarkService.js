const {Mark, Subject, User, MarkRole, Term} = require('../models/models')
const apiError = require('../error/ApiError')
const {validationResult} = require("express-validator");
const parsingErrors = require("../error/ErrorParser");

class MarkService {
    async findAll(req, res, next) {
        try {
            const marks = await Mark.findAll()
            return res.json(marks)
        } catch (e) {
            console.log(`Error in the MarkService findAll method ${e}`)
            next(apiError.badRequest(e.message))
        }
    }

    async create(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                let errorMessages = parsingErrors(errors);
                return next(apiError.badRequest([...errorMessages]))
            }
            const {studentId, teacherId, value, markRoleId, subjectId, termId} = req.body
            let {date} = req.body
            if (!await User.findOne({where: {"id": studentId}})) {
                return next(apiError.notFound(`Student with id: ${studentId} does not exist`))
            }
            if (!await User.findOne({where: {"id": teacherId}})) {
                return next(apiError.notFound(`Teacher with id: ${teacherId} does not exist`))
            }
            if (!await MarkRole.findOne({where: {"id": markRoleId}})) {
                return next(apiError.notFound(`MarkRole with id: ${markRoleId} does not exist`))
            }
            if (!await Subject.findOne({where: {"id": subjectId}})) {
                return next(apiError.notFound(`Subject with id: ${subjectId} does not exist`))
            }
            if (!await Term.findOne({where: {"id": termId}})) {
                return next(apiError.notFound(`Term with id: ${termId} does not exist`))
            }
            const student = studentId
            const teacher = teacherId
            const subject = subjectId
            date = new Date(date)
            const mark = await Mark.create({student, teacher, subject, termId, value, markRoleId, date})
            return res.json(mark)
        } catch (e) {
            console.log(`Error in the MarkService creation method ${e}`)
            next(apiError.badRequest(e.message))
        }
    }

    async delete(req, res, next) {
        try {
            const {subjectId, studentId, date} = req.body
            if (!await Subject.findOne({where: {"id": subjectId}})) {
                return next(apiError.notFound(`Subject with id: ${id} does not exist`))
            }
            const student = await User.findOne({where: {"id": studentId}})
            if (!student || student.roleId !== 3) {
                return next(apiError.notFound(`Student with id: ${id} does not exist`))
            }
            const mark = await Mark.findOne(
                {
                    where: {
                        "subject": subjectId,
                        "student": studentId,
                        "date": date
                    }
                })
            if (!mark) {
                return next(apiError.notFound(`Mark does not exist`))
            }
            await Mark.destroy({
                where: {
                    "subject": subjectId,
                    "student": studentId,
                    "date": date
                }
            })
            const message = `Mark was deleted successfully`
            return res.json({message})
        } catch (e) {
            console.log(`Error in the MarkService delete method ${e}`)
            next(apiError.badRequest(e.message))
        }
    }

    async update(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                let errorMessages = parsingErrors(errors);
                return next(apiError.badRequest([...errorMessages]))
            }
            const {subjectId, studentId, date} = req.body
            const mark = await Mark.findOne(
                {
                    where: {
                        "subject": subjectId,
                        "student": studentId,
                        "date": date
                    }
                })
            if (!mark) {
                return next(apiError.notFound(`Mark do not exist`))
            }
            const {value} = req.body
            if (value) {
                mark.value = value
            }
            await Mark.update(
                {
                    "value": mark.value
                },
                {
                    where: {
                        "subject": subjectId,
                        "student": studentId,
                        "date": date
                    }
                }
            )
            const message = "Mark has been updated successfully"
            return res.json({message})
        } catch (e) {
            console.log(`Error in the MarkService update method ${e}`)
            next(apiError.badRequest(e.message))
        }
    }

    async findStudentTermMarks(req, res, next) {
        try {
            const markList = await Mark.findAll({
                where: {
                    termId: req.params.term,
                    student: req.params.id
                }
            })
            let fullInfo = []
            let markInfo;
            for (markInfo of markList) {
                let fullMark = {}
                const subject = await Subject.findOne({
                    where: {
                        id: markInfo.subject
                    }
                })
                fullMark.subject = subject.name
                const teacher = await User.findOne({
                    where: {
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

module.exports = new MarkService()