const express = require('express')
const router = express.Router()
const { sendInquiry } = require('../controllers/inquiry')

router.post('/', sendInquiry)

module.exports = router
