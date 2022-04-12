const Router = require('express')
const router = new Router()
const subjectController = require('../controller/SubjectController')
const validator = require('../validator/EntityValidator')

router.get('/', subjectController.findAll)
router.get('/:id', subjectController.findById)
router.post('/', validator.getSubjectValidator(), subjectController.create)
router.put('/:id', validator.getSubjectValidator(), subjectController.update)
router.delete('/:id', subjectController.delete)

module.exports = router