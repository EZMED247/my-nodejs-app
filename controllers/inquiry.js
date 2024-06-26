const { StatusCodes } = require('http-status-codes');
const sendEmail = require('../utility/email_service');

const sendInquiry = async (req, res) => {
    try {
        // Extract the name, email, and inquiry from the request body
        const { name, email, phone, inquiry } = req.body;

        // Validate the input data
        if (!name || !email || !phone || !inquiry) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Name, Email, Phone, and Inquiry are required.' });
        }

        // Format the email content
        const subject = `New Inquiry from ${name}`;
        const text = `Name: ${name} \n\n Email: ${email} \n\n Phone: ${phone} \n\n Inquiry:\n${inquiry}`;

        // Send the email using the email service
        sendEmail(process.env.RECIPIENT_EMAIL, subject, text);

        // Send a success response
        res.status(StatusCodes.OK).json({ message: 'Inquiry Sent Successfully, Please wait for one of the Pharmacists to respond to your inquiry via SMS or E-mail' });
    } catch (error) {
        // Handle any errors
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Failed to Send Snquiry.' });
    }
};

module.exports = {
    sendInquiry
};
