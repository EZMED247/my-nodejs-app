const express = require('express')
const router = express.Router()
const {
    displayAll,
    prescibtion_delete
} = require('../controllers/prescrip_ops')

router.get('/', displayAll)
router.delete('/', prescibtion_delete)

module.exports = router