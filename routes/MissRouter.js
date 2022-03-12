const Router = require('express')
const router = new Router()
const MissController = require('../controller/MissController')

router.post('/', MissController.create)
router.get('/', MissController.findAll)

module.exports = router