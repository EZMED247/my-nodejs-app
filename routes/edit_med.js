const express = require('express')
const router = express.Router()
const {
    editMed,
    createMed,
    deleteMed
} = require('../controllers/edit_med')

router.put('/', editMed)
router.post('/', createMed)
router.delete('/', deleteMed)

module.exports = router