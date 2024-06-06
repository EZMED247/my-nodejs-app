// emailService.js
const nodemailer = require('nodemailer');

// Configure the transporter
const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: '76288a002@smtp-brevo.com',
        pass: 'VWSOb4ZFITGKmyQd'
    }
});

const sendEmail = (to, subject, text) => {
    const mailOptions = {
        from: process.env.SENDER_EMAIL, // Sender address
        to: to, // List of recipients
        subject: subject, // Subject line
        text: text, // Plain text body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
    });
};

module.exports = sendEmail;
