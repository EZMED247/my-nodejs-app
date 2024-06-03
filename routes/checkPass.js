const express = require('express')
const router = express.Router()
const checkPassword = require('../controllers/checkPass')

router.post('/', checkPassword)

module.exports = router