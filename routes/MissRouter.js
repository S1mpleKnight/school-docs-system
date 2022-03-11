const {Router} = require('express')
const router = Router
const MissController = require('../controller/MissController')

router.post('/', MissController.create)
router.get('/', MissController.getAll)

module.exports = router