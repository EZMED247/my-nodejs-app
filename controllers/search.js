const Medicine = require('../models/Med')
const { StatusCodes } = require('http-status-codes')
const NotFoundError = require('../errors')

const searchMedicinesByIndication = async (indication, res) => {
    try {
        const medicines = await Medicine.find({
            indications: new RegExp(indication, 'i')
        });
        if (medicines.length === 0) {
            throw new NotFoundError('Medicine not found');
        }
        res.status(StatusCodes.OK).json(medicines);
    } catch (err) {
        res.status(StatusCodes.NOT_FOUND).json({ message: 'Medicine not found' });
    }
}

const medSearch = async (req, res) => {
    try {
        const { query } = req.body;
        const medicines = await Medicine.find({
            $or: [
                { medName: new RegExp(query, 'i') },
                { activeIngredients: new RegExp(query, 'i') },
                { medNameArabic: new RegExp(query, 'i') },
                { activeIngredientsArabic: new RegExp(query, 'i') }
            ]
        });
        res.status(StatusCodes.OK).json(medicines);
    } catch (err) {
        throw new NotFoundError('Medicine not found');
    }
}

const medHeadache = (req, res) => searchMedicinesByIndication('Headache', res);
const medVitamins = (req, res) => searchMedicinesByIndication('Vitamins', res);
const medHairloss = (req, res) => searchMedicinesByIndication('Hair Loss', res);
const medBeauty = (req, res) => searchMedicinesByIndication('Beauty', res);
const medDiet = (req, res) => searchMedicinesByIndication('Diet', res);
const medCold = (req, res) => searchMedicinesByIndication('Cold', res);

module.exports = {
    medSearch,
    medHeadache,
    medVitamins,
    medHairloss,
    medBeauty,
    medDiet,
    medCold
}
