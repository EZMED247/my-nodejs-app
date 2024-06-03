const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const BadRequestError = require('../errors')

const editProfile = async (req, res) => {
    const { _id, firstName, lastName, email, phoneNumber, password } = req.body
    const user = await User.findOne({ _id })

    if (!user) {
        throw new BadRequestError('User not found')
    }

    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.phoneNumber = phoneNumber;

    if (password) {
        user.password = password;
    }

    await user.save();

    const token = user.createJWT();

    res.status(StatusCodes.OK).json({
        success: true,
        message: 'Profile updated successfully.',
        user: {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phoneNumber: user.phoneNumber
        },
        token
    })
}

module.exports = editProfile