import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const ShipRocketLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        const payload = {
            email: email,
            password: password
        };

        try {
            const response = await axios.post('https://api.gespunah.com/api/login-via-shiprocket', payload, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 200) {
                const token = response.data.token;

                // Save the token (localStorage or sessionStorage)
                localStorage.setItem('shiprocketToken', token);
                toast.success('Login successful!');
                navigate("/order-ship-rocket")
                // Redirect or perform additional actions here
                // Example: navigate to the dashboard
            }
        } catch (error) {
            toast.error('Login failed! Check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5">
            <ToastContainer />
            <h2>ShipRocket Login</h2>
            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group mt-3">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary mt-4" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </div>
    );
};

export default ShipRocketLogin;
