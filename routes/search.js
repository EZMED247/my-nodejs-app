const express = require('express')
const router = express.Router()
const {
    medSearch,
    medHeadache,
    medVitamins,
    medHairloss,
    medBeauty,
    medDiet,
    medCold
} = require('../controllers/search.js')

router.post('/', medSearch)
router
    .get('/headache', medHeadache)
    .get('/vitamins', medVitamins)
    .get('/hairloss', medHairloss)
    .get('/beauty', medBeauty)
    .get('/diet', medDiet)
    .get('/cold', medCold)

module.exports = router
