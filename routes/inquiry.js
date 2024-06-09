const express = require('express')
const { sendInquiry } = require('../controllers/inquiry')

const router = express.Router()

router.post('/', sendInquiry)

module.exports = router
