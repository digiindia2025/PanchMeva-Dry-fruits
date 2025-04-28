import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddArtical = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState({
        name: '',
        descrition: '',
        image: null,
    });

    const navigate = useNavigate();

    // Handle input change for text fields
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle file input change
    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (files && files[0]) {
            setData((prevData) => ({
                ...prevData,
                [name]: files[0],
            }));
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('descrition', data.descrition);
        formData.append('image', data.image);

        try {
            const response = await axios.post('http://localhost:8000/api/create-artical', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            toast.success('Artical added successfully!');
            navigate('/all-articals');
        } catch (error) {
            console.error('Error submitting form:', error);
            toast.error(error.response?.data?.message || 'Failed to add Artical. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>Add Artical</h4>
                </div>
                <div className="links">
                    <Link to="/all-articals" className="add-new">
                        Back <i className="fa-regular fa-circle-left"></i>
                    </Link>
                </div>
            </div>

            <div className="d-form">
                <form className="row g-3" onSubmit={handleSubmit}>
                    <div className="col-md-6">
                        <label htmlFor="name" className="form-label">
                            Name<sup className="text-danger">*</sup>
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            value={data.name}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="descrition" className="form-label">
                            Description<sup className="text-danger">*</sup>
                        </label>
                        <textarea
                            className="form-control"
                            id="descrition"
                            name="descrition"
                            value={data.descrition}
                            onChange={handleInputChange}
                            rows="3"
                            required
                        ></textarea>
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="image" className="form-label">
                            Image<sup className="text-danger">*</sup>
                        </label>
                        <input
                            type="file"
                            className="form-control"
                            id="image"
                            name="image"
                            onChange={handleFileChange}
                            required
                        />
                    </div>

                    <div className="col-12 text-center">
                        <button type="submit" disabled={isLoading} className={`${isLoading ? 'not-allowed' : 'allowed'}`}>
                            {isLoading ? 'Please Wait...' : 'Add Artical'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default AddArtical;
