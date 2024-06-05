const express = require('express')
const router = express.Router()
const {
    displayAll,
    prescription_delete
} = require('../controllers/prescrip_ops')

router.get('/', displayAll)
router.delete('/', prescription_delete)

module.exports = router