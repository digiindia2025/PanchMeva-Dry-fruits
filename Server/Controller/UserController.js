const User = require("../Models/UserModel");
const { transporter } = require("../utils/Nodemailer");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")

// HTML email template
const getWelcomeEmailTemplate = (name) => `
    <div style="font-family: Arial, sans-serif; margin: 0; padding: 0; width: 100%; background-color: #F7F7F7;">
        <table style="max-width: 600px; margin: 50px auto; background: #FFFFFF; border: 1px solid #E8E8E8; border-radius: 10px;">
            <tr>
                <td style="background: #F58634; padding: 20px; text-align: center;">
                    <h1 style="color: #FFFFFF; font-size: 24px;">Welcome to Vedhlakshna</h1>
                </td>
            </tr>
            <tr>
                <td style="padding: 20px;">
                    <h2 style="color: #333333; font-size: 20px; margin-bottom: 10px;">Hello ${name},</h2>
                    <p style="color: #555555; font-size: 16px; line-height: 1.5; margin: 0;">
                        Thank you for signing up with <strong>Vedhlakshna</strong>. We are excited to have you on board!
                    </p>
                    <p style="color: #555555; font-size: 16px; line-height: 1.5; margin: 0; margin-top: 10px;">
                        Vedhlakshna specializes in selling high-quality products like Cow Ghee, Chawanprash, and more. We are committed to providing you with the best products and service.
                    </p>
                </td>
            </tr>
            <tr>
                <td style="padding: 20px;">
                    <p style="color: #555555; font-size: 14px; line-height: 1.5; margin: 0;">
                        If you have any questions, feel free to contact us at <strong>9873745454</strong>.
                    </p>
                    <p style="color: #555555; font-size: 14px; line-height: 1.5; margin: 0; margin-top: 10px;">
                        Best regards,<br>
                        <strong>The Vedhlakshna Team</strong>
                    </p>
                </td>
            </tr>
        </table>
    </div>
`;

const createRecord = async (req, res) => {
    const { name, email, password } = req.body;
    const exitEmail = await User.findOne({ email: email })
    if (exitEmail) {
        return res.status(400).json({ success: false, message: "This Email is already registered with us.", })
    }
    try {
        const hashPassword = await bcrypt.hash(password, 12)
        const newUser = new User({ name, email, password: hashPassword });
        await newUser.save();

        // Send welcome email
        await transporter.sendMail({
            from: "Panchgavya.amrit@gmail.com",
            to: email,
            subject: "Welcome to Vedhlakshna!",
            html: getWelcomeEmailTemplate(name)
        });

        res.status(201).json({ success: true, message: "User created and email sent successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error creating user or sending email." });
    }
}

const getRecords = async (req, res) => {
    try {
        const users = await User.find(); // Fetch all users
        const filterUser = users.filter((user) => user.role === "User")
        res.status(200).json({
            success: true,
            data: filterUser,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error fetching users.",
        });
    }
};


const getSingleRecords = async (req, res) => {
    try {
        const users = await User.findById(req.params.id); // Fetch all users
        if (!users) {
            return res.status(404).json({
                success: false,
                message: "REcord Not Found"
            })
        }
        res.status(200).json({
            success: true,
            data: users,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error fetching users.",
        });
    }
};

const deleteRecord = async (req, res) => {
    const { id } = req.params; // Extract user ID from route params
    try {
        const user = await User.findByIdAndDelete(id); // Delete user by ID
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }
        res.status(200).json({
            success: true,
            message: "User deleted successfully.",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error deleting user.",
        });
    }
};

const login = async (req, res) => {
    console.log(req.body)
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid Password" });
        }

        const token = jwt.sign({ id: user._id, role: user.role },
            user.role === 'Admin' ? process.env.JWT_KEY_ADMIN : process.env.JWT_KEY_USER,
            { expiresIn: '1d' });  // Token expires in 2 minutes

        // Set token in HTTP-only cookie
        res.cookie('token', token, {
            httpOnly: true,               // Prevent JavaScript access
            secure: true,                 // Ensure cookie is sent over HTTPS
            maxAge: 24 * 60 * 60 * 1000,  // 1-day expiry
            sameSite: 'None',             // Allow cross-site usage (if needed)
            domain: '.panchgavyamrit.com' // Allow across main domain and subdomains
        });

        res.status(200).json({
            success: true,
            message: "Login successful",
            data: user,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error logging in" });
    }
};

const logout = async (req, res) => {
    try {
        // Clear the 'token' cookie
        res.clearCookie('token', {
            httpOnly: true,               // Prevent JavaScript access
            secure: true,                 // Ensure cookie is sent over HTTPS
            sameSite: 'None',             // Allow cross-site usage (if needed)
            domain: '.panchgavyamrit.com' // Match your domain
        });

        res.status(200).json({
            success: true,
            message: "Logout successful",
        });
    } catch (error) {
        console.error("Error during logout:", error);
        res.status(500).json({
            success: false,
            message: "Error logging out",
        });
    }
};

// HTML email template for password reset
const getPasswordResetEmailTemplate = (name, resetLink) => `
    <div style="font-family: Arial, sans-serif; margin: 0; padding: 0; width: 100%; background-color: #F7F7F7;">
        <table style="max-width: 600px; margin: 50px auto; background: #FFFFFF; border: 1px solid #E8E8E8; border-radius: 10px;">
            <tr>
                <td style="background: #F58634; padding: 20px; text-align: center;">
                    <h1 style="color: #FFFFFF; font-size: 24px;">Password Reset Request</h1>
                </td>
            </tr>
            <tr>
                <td style="padding: 20px;">
                    <h2 style="color: #333333; font-size: 20px; margin-bottom: 10px;">Hello ${name},</h2>
                    <p style="color: #555555; font-size: 16px; line-height: 1.5; margin: 0;">
                        We received a request to reset your password. If you requested this change, click the link below to reset your password:
                    </p>
                    <p style="color: #555555; font-size: 16px; line-height: 1.5; margin: 20px 0;">
                        <a href="${resetLink}" style="color: #F58634; text-decoration: none; font-size: 16px;">Reset Password</a>
                    </p>
                    <p style="color: #555555; font-size: 14px; line-height: 1.5; margin: 0;">
                        If you did not request this, please ignore this email.
                    </p>
                </td>
            </tr>
            <tr>
                <td style="padding: 20px;">
                    <p style="color: #555555; font-size: 14px; line-height: 1.5; margin: 0;">
                        Best regards,<br>
                        <strong>The Vedhlakshna Team</strong>
                    </p>
                </td>
            </tr>
        </table>
    </div>
`;

const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "No user found with this email.",
            });
        }

        // Generate a password reset token
        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetTokenExpiration = Date.now() + 3600000; // Token valid for 1 hour

        // Update the user record with reset token and expiration
        user.resetToken = resetToken;
        user.resetTokenExpiration = resetTokenExpiration;
        await user.save();

        // Generate the reset link
        const resetLink = `https://panchgavyamrit.com/reset-password/${resetToken}`;

        // Send password reset email
        await transporter.sendMail({
            from: "Panchgavya.amrit@gmail.com",
            to: email,
            subject: "Password Reset Request",
            html: getPasswordResetEmailTemplate(user.name, resetLink),
        });

        res.status(200).json({
            success: true,
            message: "Password reset email sent successfully.",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error sending password reset email.",
        });
    }
};


const resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;

    try {
        const user = await User.findOne({
            resetToken: token,
            resetTokenExpiration: { $gt: Date.now() }, // Token must be valid
        });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid or expired reset token.",
            });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 12);

        // Update user's password and clear reset token
        user.password = hashedPassword;
        user.resetToken = undefined;
        user.resetTokenExpiration = undefined;
        await user.save();

        res.status(200).json({
            success: true,
            message: "Password has been successfully reset.",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error resetting password.",
        });
    }
};





module.exports = {
    createRecord, getRecords, deleteRecord, login, getSingleRecords, logout, resetPassword, forgotPassword
}