const Medicine = require('../models/Med')
const { StatusCodes } = require('http-status-codes')
const NotFoundError = require('../errors')


const medSearch = async (req, res) => {
    try {
        const { query } = req.body
        const medicines = await Medicine.find({
            $or: [
                { medName: new RegExp(query, 'i') },
                { activeIngredients: new RegExp(query, 'i') }
            ]
        })
        res.status(StatusCodes.OK).json(medicines)
    } catch (err) {
        throw new NotFoundError('Medicine not found')
    }
}

const medHeadache = async (req, res) => {
    try {
        const medicines = await Medicine.find({ "indications": "Headache" })
        res.status(StatusCodes.OK).json(medicines)
    } catch (err) {
        res.status(StatusCodes.NOT_FOUND).json({ message: 'Medicine not found' })
    }
}


module.exports = {
    medSearch,
    medHeadache
}