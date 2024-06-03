const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors')

const checkPassword = async (req, res) => {
    const { _id, password } = req.body
    if (!password) {
        throw new BadRequestError('Please type password')
    }
    const user = await User.findOne({ _id })
    if (!user) {
        throw new UnauthenticatedError('Invalid Credentials')
    }
    const isPasswordCorrect = await user.comparePassword(password)
    if (!isPasswordCorrect) {
        throw new UnauthenticatedError('Invalid Credentials')
    }

    res.status(StatusCodes.OK).json({ success: true, message: 'Password is correct. You can proceed to edit the profile.' })
}

module.exports = checkPassword