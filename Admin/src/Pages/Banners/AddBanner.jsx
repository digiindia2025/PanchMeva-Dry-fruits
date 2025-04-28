import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddBanner = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState({
        bannerImage: "",
        bannerStatus: false,
    });

    const navigate = useNavigate();
    // Handle file input change
    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (files && files[0]) {
            const file = files[0];
            setData((prevData) => ({
                ...prevData,
                [name]: file,
            }));
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData();
        formData.append('bannerImage', data.bannerImage);
        formData.append('bannerStatus', data.bannerStatus);

        try {
            const response = await axios.post('http://localhost:8000/api/create-banner', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            toast.success('Banner added successfully!');
            navigate('/all-banners');
        } catch (error) {
            console.error('Error submitting form:', error);
            toast.error(error.response?.data?.message || 'Failed to add banner. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>Add Banner</h4>
                </div>
                <div className="links">
                    <Link to="/all-banners" className="add-new">
                        Back <i className="fa-regular fa-circle-left"></i>
                    </Link>
                </div>
            </div>

            <div className="d-form">
                <form className="row g-3" onSubmit={handleSubmit}>
                    <div className="col-md-6">
                        <label htmlFor="bannerImage" className="form-label">
                            Banner Image<sup className='text-danger'>*</sup>
                        </label>
                        <input
                            type="file"
                            className="form-control"
                            id="bannerImage"
                            name="bannerImage"
                            onChange={handleFileChange}
                            required
                        />
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="bannerStatus" className="form-label">
                            Banner Status
                        </label>
                        <div className="form-check">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="bannerStatus"
                                name="bannerStatus"
                                checked={data.bannerStatus}
                                onChange={(e) => setData((prevData) => ({
                                    ...prevData,
                                    bannerStatus: e.target.checked
                                }))}
                            />
                            <label className="form-check-label" htmlFor="bannerStatus">
                                {data.bannerStatus ? 'Active' : 'Inactive'}
                            </label>
                        </div>
                    </div>

                    <div className="col-12 text-center">
                        <button type="submit" disabled={isLoading} className={`${isLoading ? 'not-allowed' : 'allowed'}`}>
                            {isLoading ? 'Please Wait...' : 'Add Banner'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default AddBanner;
