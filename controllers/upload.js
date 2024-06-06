const upload = require('../models/upload');
const { StatusCodes } = require('http-status-codes');
const imgUtil = require('../utility/medImagePath');
const sendEmail = require('../utility/email_service'); // Import the email service

const fileUpload = async (req, res) => {
    try {
        const imageLink = imgUtil.generateImagePath(req, 'image_uploads');

        await upload.create({ ...req.body, imageLink });

        // Send an email notification
        sendEmail(
            process.env.RECIPIENT_EMAIL, // Replace with the admin email
            'New Prescription Uploaded',
            `A new prescription has been uploaded
            تم ارسال روشتة جديدة. 
            Image link: ${imageLink}`
        );

        res.status(StatusCodes.CREATED).json({
            success: true,
            message: 'File uploaded successfully and put into the database.',
            imageLink: imageLink // Send the image link back to the frontend
        });
    } catch (error) {
        console.error('Error during file upload:', error);

        if (error.name === 'ValidationError') {
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                message: 'Invalid input. Please check your data.',
            });
        }

        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('An error occurred while uploading the file.');
    }
};

module.exports = fileUpload;
