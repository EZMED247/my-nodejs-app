const express = require('express')
const router = express.Router()
const {
    medSearch,
    medHeadache
} = require('../controllers/search.js')

router.post('/', medSearch)
router.get('/headache', medHeadache)

module.exports = router
