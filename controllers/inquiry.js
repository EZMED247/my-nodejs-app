const { StatusCodes } = require('http-status-codes');
const sendEmail = require('../utility/email_service');

const sendInquiry = async (req, res) => {
    try {
        // Extract the name, email, and inquiry from the request body
        const { name, email, inquiry } = req.body;

        // Validate the input data
        if (!name || !email || !inquiry) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Name, email, and inquiry are required.' });
        }

        // Format the email content
        const subject = `New Inquiry from ${name}`;
        const text = `Name: ${name}\nEmail: ${email}\n\nInquiry:\n${inquiry}`;

        // Send the email using the email service
        sendEmail(process.env.RECIPIENT_EMAIL, subject, text);

        // Send a success response
        res.status(StatusCodes.OK).json({ message: 'Inquiry sent successfully.' });
    } catch (error) {
        // Handle any errors
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Failed to send inquiry.' });
    }
};

module.exports = {
    sendInquiry
};
