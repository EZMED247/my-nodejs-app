const express = require('express')
const router = express.Router()
const fileUpload = require('../controllers/upload')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })


router.post('/', upload.single('image'), fileUpload)

module.exports = router