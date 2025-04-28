
const Subcribe = require("../Models/SubcribeModel");
const { transporter } = require("../utils/Nodemailer");

exports.createSubscription = async (req, res) => {
    console.log(req.body)
    const { subscribeEmail } = req.body;

    if (!subscribeEmail) {
        return res.status(400).json({ error: "Email is required." });
    }

    try {
        // Save subscription to the database
        const newSubscription = new Subcribe({ subscribeEmail });
        await newSubscription.save();

        // Email content for the admin
        const mailOptions = {
            from: "Panchgavya.amrit@gmail.com",
            to: "Panchgavya.amrit@gmail.com",
            subject: "New Subscription Notification",
            html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <img src="https://panchgavyamrit.com/static/media/Logo.e4770e51e9e2f1f1d58d.png" alt="VedLakshna Logo" style="width: 150px; margin-bottom: 20px;">
            <h2>New Subscription Received!</h2>
            <p>Dear Admin,</p>
            <p>A new user has subscribed to VedLakshna updates using the following email:</p>
            <p><strong>Email:</strong> ${subscribeEmail}</p>
            <p>Regards,</p>
            <p><strong>VedLakshna Team</strong></p>
          </div>
        `,
        };

        // Send email to admin
        await transporter.sendMail(mailOptions);

        // Respond to the user
        res.status(201).json({
            message: "Subscription created successfully. Admin has been notified.",
            data: newSubscription,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while creating the subscription." });
    }
};