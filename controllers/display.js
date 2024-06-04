const upload = require('../models/upload')
const { StatusCodes } = require('http-status-codes')

const uploadsSearch = async (req, res) => {
    try {
        const displays = await upload.find({})
        res.status(StatusCodes.OK).json(displays)
    } catch (error) {
        console.error('Error searching uploads:', error)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('An error occurred while searching uploads.')
    }
}

module.exports = uploadsSearch
