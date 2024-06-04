const upload = require('../models/upload')
const { StatusCodes } = require('http-status-codes')
const imgUtil = require('../utility/medImagePath')
const postmark = require('postmark')

const client = new postmark.ServerClient('576ece91-edba-4123-bd20-5f2f40450f1f')


const sendEmailNotification = async (userInfo, imageLink) => {
    try {
        await client.sendEmail({
            From: 'ezmed247@gmail.com', // Use your authenticated sender address
            To: 'mariota8h7@gmail.com', // Change to the actual recipient
            Subject: 'New Prescription Notification!',
            TextBody: `User ${userInfo.name} has sent a Prescription.\nDetails:\nImage Link: ${imageLink}`,
        });
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

const fileUpload = async (req, res) => {
    try {
        const imageLink = imgUtil.generateImagePath(req, 'image_uploads')

        await upload.create({ ...req.body, imageLink })
        await sendEmailNotification(req.body, imageLink)

        res.status(StatusCodes.CREATED).json({
            success: true,
            message: 'File uploaded successfully and put into the database.',
        });
    } catch (error) {
        console.error('Error during file upload:', error)

        if (error.name === 'ValidationError') {
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                message: 'Invalid input. Please check your data.',
            });
        }

        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('An error occurred while uploading the file.')
    }
}

module.exports = fileUpload
