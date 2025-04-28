const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'Panchgavya.amrit@gmail.com', // Replace with your email
        pass: 'crpd cpzb zgui jsxe',    // Replace with App Password
    }, // Output detailed logs
});

module.exports = { transporter };
