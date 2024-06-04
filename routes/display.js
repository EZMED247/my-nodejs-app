const express = require('express')
const router = express.Router()
const displayAll = require('../controllers/display')

router.get('/', displayAll)

module.exports = router