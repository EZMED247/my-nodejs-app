const express = require('express')
const router = express.Router()
const editProfile = require('../controllers/profile')

router.put('/', editProfile)

module.exports = router