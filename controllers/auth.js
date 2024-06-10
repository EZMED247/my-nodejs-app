const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors')

const register = async (req, res, next) => {
    try {
        const user = await User.create({ ...req.body })
        const token = user.createJWT()
        res.status(StatusCodes.CREATED).json({
            user: {
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phoneNumber: user.phoneNumber
            },
            token
        })
    } catch (error) {
        if (error.code && error.code === 11000) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Email already in use' })
        }
        next(error)
    }
}

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            throw new BadRequestError('Please Provide Email & Password')
        }
        const user = await User.findOne({ email })
        if (!user) {
            throw new UnauthenticatedError('Invalid Credentials')
        }
        const isPasswordCorrect = await user.comparePassword(password)
        if (!isPasswordCorrect) {
            throw new UnauthenticatedError('Invalid Credentials')
        }
        const token = user.createJWT()
        res.status(StatusCodes.OK).json({
            user: {
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phoneNumber: user.phoneNumber
            }, token
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    register,
    login
}
