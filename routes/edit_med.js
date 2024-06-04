const express = require('express')
const router = express.Router()
const {
    editMed,
    createMed,
    deleteMed
} = require('../controllers/edit_med')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

router.put('/', upload.single('medImage'), editMed)
router.post('/', upload.single('medImage'), createMed)
router.delete('/', deleteMed)

module.exports = router