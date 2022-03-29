const Router = require('express')
const router = new Router()
const voucherController = require('../controller/VoucherController')
const multer = require("multer");
const {v4} = require("uuid");
const config = require("config");
const UPLOAD_PATH = config.get("upload_path")
const FILE_FIELD = config.get("upload_file")

const storageConfig = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, UPLOAD_PATH)
    },
    filename: function (req, file, cb) {
        const uniqueFilename = v4().toString() + "_" + file.originalname
        cb(null, uniqueFilename)
    }
})

const upload = multer({storage: storageConfig})

router.post('/', upload.single(FILE_FIELD), voucherController.uploadVoucher)
router.get('/', voucherController.findAll)
router.get('/:id', voucherController.findById)

module.exports = router