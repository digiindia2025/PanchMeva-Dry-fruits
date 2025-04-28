const Contact = require("../Models/contactSchema");
const { transporter } = require("../utils/Nodemailer");

// Controller to handle creating a new contact form entry
const createContact = async (req, res) => {
    const { name, email, number, subject, message } = req.body;
    try {
        const newContact = new Contact({
            name,
            email,
            number,
            subject,
            message,
        });
        await newContact.save();

        // Prepare the email content to send to the admin
        const emailContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Contact Inquiry</title>
</head>
<body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f7fc;">

    <div style="max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); padding: 30px;">
        
        <!-- Header Section -->
        <div style="background-color: #F58634; color: #ffffff; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="font-size: 24px; margin: 0;">New Contact Inquiry</h1>
        </div>
        
        <!-- Main Content Section -->
        <div style="margin-top: 20px;">
            <p style="font-size: 16px; color: #333333; line-height: 1.5;">Hello,</p>
            <p style="font-size: 16px; color: #333333; line-height: 1.5;">You have received a new contact inquiry. Below are the details:</p>

            <div style="background-color: #f9f9f9; padding: 15px; margin-top: 20px; border-radius: 8px;">
                <p style="font-size: 16px; color: #333333; line-height: 1.5; margin: 10px 0;"><strong>Name:</strong> ${name}</p>
                <p style="font-size: 16px; color: #333333; line-height: 1.5; margin: 10px 0;"><strong>Email:</strong> ${email}</p>
                <p style="font-size: 16px; color: #333333; line-height: 1.5; margin: 10px 0;"><strong>Phone Number:</strong> ${number}</p>
                <p style="font-size: 16px; color: #333333; line-height: 1.5; margin: 10px 0;"><strong>Subject:</strong> ${subject}</p>
                <p style="font-size: 16px; color: #333333; line-height: 1.5; margin: 10px 0;"><strong>Message:</strong> ${message}</p>
            </div>
        </div>
        
        <!-- Footer Section -->
        <div style="background-color: #F58634; color: #ffffff; text-align: center; padding: 15px; border-radius: 0 0 8px 8px; margin-top: 20px;">
            <p style="font-size: 14px; margin: 0;">&copy; 2024 Your Company Name | <a href="mailto:info@yourcompany.com" style="color: #ffffff; text-decoration: none; font-weight: bold;">Contact Us</a></p>
        </div>

    </div>

</body>
</html>

        `;

        // Email options for sending the email to the admin
        const mailOptions = {
            from: "Panchgavya.amrit@gmail.com",  // Sender's email (configured in environment variables)
            to: "Panchgavya.amrit@gmail.com",  // Replace with the admin's email address
            subject: 'New Contact Inquiry Received',
            html: emailContent,  // HTML content for the email
        };

        // Send email to the admin
        await transporter.sendMail(mailOptions);

        res.status(200).json({
            success: true,
            message: 'Contact form submitted successfully and email sent to admin.',
        });
    } catch (error) {
        console.error('Error creating contact entry:', error);
        res.status(500).json({
            success: false,
            message: 'There was an error submitting your contact form.',
        });
    }
};

// GET controller to fetch all contact inquiries
const getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.status(200).json({
            success: true,
            contacts: contacts.reverse(),
        });
    } catch (error) {
        console.error('Error fetching contacts:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching contacts.',
        });
    }
};

// DELETE controller to remove a contact inquiry by ID
const deleteContact = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedContact = await Contact.findByIdAndDelete(id);
        if (!deletedContact) {
            return res.status(404).json({
                success: false,
                message: 'Contact not found.',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Contact deleted successfully.',
        });
    } catch (error) {
        console.error('Error deleting contact:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting contact.',
        });
    }
};

module.exports = {
    createContact,
    getAllContacts,
    deleteContact,
};
