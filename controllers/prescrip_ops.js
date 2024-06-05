const upload = require('../models/upload')
const { StatusCodes } = require('http-status-codes')

const displayAll = async (req, res) => {
    try {
        const displays = await upload.find({})
        res.status(StatusCodes.OK).json(displays)
    } catch (error) {
        console.error('Error searching uploads:', error)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('An error occurred while searching uploads.')
    }
}

const prescription_delete = async (req, res) => {
    try {
        const { _id } = req.body
        const presc = await upload.findOneAndDelete({ _id })

        if (!presc) {
            return res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                message: 'Prescription not found',
            })
        }

        res.status(StatusCodes.OK).json({
            success: true,
            message: 'Prescription Deleted Successfully.',
        })
    } catch (error) {
        console.error('Error deleting prescription:', error)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('An error occurred while deleting the prescription.')
    }
}

module.exports = {
    displayAll,
    prescription_delete
}
