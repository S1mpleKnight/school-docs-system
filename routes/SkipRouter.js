const Router = require('express')
const router = new Router()
const skipController = require('../controller/SkipController')

router.post('/', skipController.create)
router.get('/', skipController.findAll)

module.exports = router