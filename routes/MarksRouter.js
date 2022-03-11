const {Router} = require('express')
const router = Router
const MarkController = require('../controller/MarkController')

router.post('/', MarkController.create)
router.get('/', MarkController.getAll)

module.exports = router