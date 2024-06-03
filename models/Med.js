const mongoose = require('mongoose')

const MedicineSchema = new mongoose.Schema({
    medName: {
        type: String,
        required: true,
        trim: true
    },
    medNameArabic: {
        type: String,
        required: false
    },
    medImage: {
        type: String,
        required: false
    },
    activeIngredients: {
        type: [String],
        required: true
    },
    activeIngredientsArabic: {
        type: [String],
        required: false
    },
    indications: {
        type: [String],
        required: true
    },
    indicationsArabic: {
        type: [String],
        required: false
    },
    sideEffects: {
        type: [String],
        required: true
    },
    sideEffectsArabic: {
        type: [String],
        required: false
    },
    price: {
        type: [String],
        required: false
    }
})


module.exports = mongoose.model('Medicine', MedicineSchema);