import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import './ResetPasswordPage.css'; // Import CSS for styling
import Swal from "sweetalert2";

const ResetPasswordPage = () => {
    const { token } = useParams(); // Get token from URL
    const [newPassword, setNewPassword] = useState("");
    const [isPasswordReset, setIsPasswordReset] = useState(false);
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

    const handlePasswordChange = (e) => {
        setNewPassword(e.target.value);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword); // Toggle visibility
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/reset-password', {
                token,
                newPassword,
            });
            if (response.data.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Password Reset Successful!',
                    text: 'Your password has been successfully reset.',
                    confirmButtonText: 'Go to Login',
                }).then(() => {
                    // Redirect to login page after success message
                    window.location.href = 'https://panchgavyamrit.com/login';
                });
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.error("Error resetting password", error);
        }
    };

    return (
        <div className="reset-password-container">
            <div className="reset-password-box">
                <h2>Reset Your Password</h2>
                {isPasswordReset ? (
                    <p className="success-message">Your password has been successfully reset!</p>
                ) : (
                    <form onSubmit={handleSubmit} className="reset-password-form">
                        <label htmlFor="newPassword">New Password:</label>
                        <div className="password-input-container">
                            <input
                                id="newPassword"
                                type={showPassword ? "text" : "password"}
                                value={newPassword}
                                onChange={handlePasswordChange}
                                required
                                placeholder="Enter new password"
                            />
                            <button
                                type="button"
                                className="show-password-btn"
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                        <button type="submit" className="submit-btn">Reset Password</button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ResetPasswordPage;
