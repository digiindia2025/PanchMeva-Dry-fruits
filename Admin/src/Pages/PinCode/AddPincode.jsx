import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddPincode = () => {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false);
    const [pincodeData, setPincodeData] = useState({
        pincode: '',
        shippingCharge: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPincodeData({
            ...pincodeData,
            [name]: value
        });
    };

    // Form validation
    const validateForm = () => {
        if (pincodeData.pincode.length !== 6) {
            toast.error('Pincode must be 6 digits.');
            return false;
        }
        if (isNaN(pincodeData.pincode)) {
            toast.error('Pincode must be a number.');
            return false;
        }
        if (pincodeData.shippingCharge <= 0) {
            toast.error('Shipping charge must be a positive number.');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form data
        if (!validateForm()) {
            return;
        }

        setIsLoading(true);

        try {
            const response = await axios.post('https://api.panchgavyamrit.com/api/add-pincode', pincodeData);
            toast.success('Pincode added successfully!');
            // Clear the form after successful submission
            setPincodeData({ pincode: '', shippingCharge: '' });
            navigate("/all-pincodes")
        } catch (error) {
            console.error('Error adding pincode:', error);
            toast.error('Failed to add pincode. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>Add Pincode</h4>
                </div>
                <div className="links">
                    <Link to="/all-pincodes" className="add-new">Back <i className="fa-regular fa-circle-left"></i></Link>
                </div>
            </div>

            <div className="d-form">
                <form className="row g-3" onSubmit={handleSubmit}>
                    <div className="col-md-6">
                        <label htmlFor="pincode" className="form-label">Pincode<sup className='text-danger'>*</sup> </label>
                        <input
                            type="number"
                            name="pincode"
                            className="form-control"
                            id="pincode"
                            value={pincodeData.pincode}
                            onChange={handleChange}
                            maxLength="6" // Limit input to 6 digits
                            placeholder='Pincode'
                        />
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="shippingCharge" className="form-label">Shipping Charge<sup className='text-danger'>*</sup> </label>
                        <input
                            type="number"
                            name="shippingCharge"
                            className="form-control"
                            id="shippingCharge"
                            value={pincodeData.shippingCharge}
                            onChange={handleChange}
                            min="0"
                            placeholder='Shipping Charge'
                        />
                    </div>

                    <div className="col-12 text-center">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`${isLoading ? 'not-allowed' : 'allowed'}`}
                        >
                            {isLoading ? 'Please Wait...' : 'Add Pincode'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default AddPincode;
