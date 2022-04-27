const {Mark, Subject, User, MarkRole, Term} = require('../models/models')
const apiError = require('../error/ApiError')
const {validationResult} = require("express-validator")
const {Op} = require('sequelize');

const parsingErrors = require("../error/ErrorParser");

class MarkService {
    async findAll(req, res, next) {
        try {
            const marks = await Mark.findAll({
                where: {
                    "markRoleId": 1
                }
            })
            console.log('\x1b[32m%s\x1b[0m', `Marks send: ${marks.length} date: ${new Date(Date.now()).toUTCString()}}`)
            return res.json(marks)
        } catch (e) {
            console.log('\x1b[31m%s\x1b[0m', `Error in the MarkService findAll method ${e}`)
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
            const teacherId = req.userId
            let {student, subject, date, value, termId} = req.body
            student = parseInt(student.toString())
            subject = parseInt(subject.toString())
            value = parseInt(value.toString())
            if (!await User.findOne({where: {"id": student}})) {
                return next(apiError.notFound(`Student with id: ${student} does not exist`))
            }
            if (!await Subject.findOne({where: {"id": subject}})) {
                return next(apiError.notFound(`Subject with id: ${subject} does not exist`))
            }
            if (termId) {
                termId = parseInt(termId.toString())
                const term = await Term.findOne({where: {"id": termId}})
                if (!term) {
                    return next(apiError.notFound(`Term with id: ${termId} does not exist`))
                }
            }
            const markRole = await MarkRole.findOne({where: {
                "name": 'LESSON'
                }})
            const markRoleId = markRole.id
            const teacher = teacherId
            date = new Date(date)
            const mark = await Mark.create({date, subject, student, teacher,  value, markRoleId, termId})
            return res.json(mark)
        } catch (e) {
            console.log('\x1b[31m%s\x1b[0m', `Error in the MarkService creation method ${e}`)
            next(apiError.badRequest(e.message))
        }
    }

    async delete(req, res, next) {
        try {
            let {subjectId, studentId, date} = req.params
            subjectId = parseInt(subjectId.toString())
            studentId = parseInt(studentId.toString())
            if (!await Subject.findOne({where: {"id": subjectId}})) {
                return next(apiError.notFound(`Subject with id: ${id} does not exist`))
            }
            const studentInstance = await User.findOne({where: {"id": student}})
            if (!studentInstance || studentInstance.roleId !== 3) {
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
            console.log('\x1b[31m%s\x1b[0m', `Error in the MarkService delete method ${e}`)
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
            const {subject, student, date} = req.body
            const mark = await Mark.findOne(
                {
                    where: {
                        "subject": subject,
                        "student": student,
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
                        "subject": subject,
                        "student": student,
                        "date": date
                    }
                }
            )
            const message = "Mark has been updated successfully"
            return res.json({message})
        } catch (e) {
            console.log('\x1b[31m%s\x1b[0m', `Error in the MarkService update method ${e}`)
            next(apiError.badRequest(e.message))
        }
    }

    async findTeachersMarksCurrentTerm(req, res, next) {
        try {
            const teacherId = req.userId
            const date = new Date()
            const term = await Term.findOne({
                where: {
                    [Op.and]: [
                        {
                            startDate: {
                                [Op.lte]: date
                            }
                        },
                        {
                            endDate: {
                                [Op.gte]: date
                            }
                        }
                    ]
                }
            })
            const markList = await Mark.findAll({
                where: {
                    teacher: teacherId,
                    markRoleId: 1,
                    date: {
                        [Op.gte]: term.startDate
                    }
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
                fullMark.student = markInfo.student
                fullMark.subject = subject.name
                fullMark.value = markInfo.value
                fullMark.date = markInfo.date
                fullInfo.push(fullMark)
            }
            console.log('\x1b[32m%s\x1b[0m', `Marks sent: ${fullInfo.length} date: ${new Date(Date.now()).toUTCString()}}`)
            return res.json(fullInfo)
        } catch (e) {
            console.log('\x1b[31m%s\x1b[0m', `Error in the MarkController findStudentTermMarks method ${e}`)
            next(apiError.badRequest(e.message))
        }
    }

    async findStudentTermMarks(req, res, next) {
        try {
            const markList = await Mark.findAll({
                where: {
                    teacher: req.params.id
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
            console.log('\x1b[32m%s\x1b[0m', `Marks sent: ${fullInfo.length} date: ${new Date(Date.now()).toUTCString()}}`)
            return res.json(fullInfo)
        } catch (e) {
            console.log('\x1b[31m%s\x1b[0m', `Error in the MarkController findStudentTermMarks method ${e}`)
            next(apiError.badRequest(e.message))
        }
    }

    async findAllStudentMarks(req, res, next) {
        try {
            const markList = await Mark.findAll({
                where: {
                    student: req.userId
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
            console.log('\x1b[32m%s\x1b[0m', `Marks sent: ${fullInfo.length} date: ${new Date(Date.now()).toUTCString()}`)
            return res.json(fullInfo)
        } catch (e) {
            console.log('\x1b[31m%s\x1b[0m', `Error in the MarkController findStudentTermMarks method ${e}`)
            next(apiError.badRequest(e.message))
        }
    }
}

module.exports = new MarkService()