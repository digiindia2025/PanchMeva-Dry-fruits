import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditPincode = () => {
    const { id } = useParams(); // Get the ID of the pincode to edit
    const navigate = useNavigate();
    const [btnLoading, setBtnLoading] = useState(false);
    const [pincodeData, setPincodeData] = useState({
        pincode: '',
        shippingCharge: ''
    });

    useEffect(() => {
        // Fetch the existing pincode details
        const fetchPincodeDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/single-pincode/${id}`);
                setPincodeData(response.data);
            } catch (error) {
                console.error('Error fetching pincode details:', error);
                toast.error('Failed to fetch pincode details.');
            }
        };

        fetchPincodeDetails();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPincodeData({
            ...pincodeData,
            [name]: value
        });
    };

    const validateForm = () => {
        // if (pincodeData.pincode.length !== 6) {
        //     toast.error('Pincode must be 6 digits.');
        //     return false;
        // }
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

        if (!validateForm()) {
            return;
        }

        setBtnLoading(true);

        try {
            await axios.put(`http://localhost:8000/api/update-pincode/${id}`, pincodeData);
            toast.success('Pincode updated successfully!');
            navigate('/all-pincodes');
        } catch (error) {
            console.error('Error updating pincode:', error);
            toast.error('Failed to update pincode. Please try again.');
        } finally {
            setBtnLoading(false);
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>Edit Pincode</h4>
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
                            maxLength="6"
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
                            disabled={btnLoading}
                            className={`${btnLoading ? 'not-allowed' : 'allowed'}`}
                        >
                            {btnLoading ? 'Please Wait...' : 'Update Pincode'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default EditPincode;
