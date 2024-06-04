const medInfo = require('../models/Med')
const { StatusCodes } = require('http-status-codes')
const BadRequestError = require('../errors')
const imgUtil = require('../utility/medImagePath')

const editMed = async (req, res) => {
    try {
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
        } = req.body;

        const medImage = imgUtil.generateImagePath(req, 'med_images')

        const med = await medInfo.findOne({ _id })

        if (!med) {
            return res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                message: 'Medicine not found',
            });
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
        med.medImage = medImage

        await med.save()

        return res.status(StatusCodes.OK).json({
            success: true,
            message: 'Medicine Updated Successfully.',
        });
    } catch (error) {
        console.error('Error updating medicine:', error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Error updating medicine. Please try again later.',
        });
    }
};

const createMed = async (req, res) => {
    try {
        const medImage = imgUtil.generateImagePath(req, 'med_images')

        const med = await medInfo.create({ ...req.body, medImage })

        await med.save()

        return res.status(StatusCodes.CREATED).json({
            success: true,
            message: 'Medicine Created Successfully.',
        });
    } catch (error) {
        console.error('Error creating medicine:', error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Error creating medicine. Please try again later.',
        });
    }
};

const deleteMed = async (req, res) => {
    const { _id } = req.body
    const med = await medInfo.findOneAndDelete({ _id })
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