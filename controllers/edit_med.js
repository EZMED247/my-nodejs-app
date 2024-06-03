const medInfo = require('../models/Med')
const { StatusCodes } = require('http-status-codes')
const BadRequestError = require('../errors')

const editMed = async (req, res) => {
    const {
        _id,
        medName,
        medNameArabic,
        activeIngredients,
        activeIngredientsArabic,
        indications,
        indicationsArabic,
        sideEffects,
        sideEffectsArabic,
        price
    } = req.body
    const med = await medInfo.findOne({ _id })

    if (!med) {
        throw new BadRequestError('User not found')
    }

    med.medName = medName
    med.medNameArabic = medNameArabic
    med.activeIngredients = activeIngredients
    med.activeIngredientsArabic = activeIngredientsArabic
    med.indications = indications
    med.indicationsArabic = indicationsArabic
    med.sideEffects = sideEffects
    med.sideEffectsArabic = sideEffectsArabic
    med.price = price
    await med.save()
    res.status(StatusCodes.OK).json({
        success: true,
        message: 'Medicine Updated Successfully.'
    })
}

const createMed = async (req, res) => {
    const med = await medInfo.create({ ...req.body })
    await med.save()
    res.status(StatusCodes.CREATED).json({
        success: true,
        message: 'Medicine Created Successfully.'
    })
}

const deleteMed = async (req, res) => {
    const { _id } = req.body;
    const med = await medInfo.findOneAndDelete({ _id });
    if (!med) {
        throw new BadRequestError('Medicine not found')
    }
    res.status(StatusCodes.OK).json({
        success: true,
        message: 'Medicine Deleted Successfully.'
    })
}

module.exports = {
    editMed,
    createMed,
    deleteMed
}