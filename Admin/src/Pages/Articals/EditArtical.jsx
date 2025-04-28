import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditArtical = () => {
    const { id } = useParams(); // Get artical ID from the URL params
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState({
        name: '',
        descrition: '',
        image: null,
    });
    const [imagePreview, setImagePreview] = useState('');

    // Fetch the artical data on component mount
    useEffect(() => {
        const fetchArticalData = async () => {
            try {
                const response = await axios.get(`https://api.panchgavyamrit.com/api/single-artical/${id}`);
                setData({
                    name: response.data.name,
                    descrition: response.data.descrition,
                    image: null, // Image will only be updated if a new one is selected
                });
                setImagePreview(response.data.image); // Show the existing image in the preview
            } catch (error) {
                console.error('Error fetching artical data:', error);
                toast.error('Failed to fetch artical details.');
            }
        };

        fetchArticalData();
    }, [id]);

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
            setImagePreview(URL.createObjectURL(files[0])); // Preview selected image
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('descrition', data.descrition);
        if (data.image) {
            formData.append('image', data.image);
        }

        try {
            await axios.put(`https://api.panchgavyamrit.com/api/update-artical/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            toast.success('Artical updated successfully!');
            navigate('/all-articals'); // Redirect to the all articals page
        } catch (error) {
            console.error('Error updating artical:', error);
            toast.error(error.response?.data?.message || 'Failed to update artical. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>Edit Artical</h4>
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
                            Image
                        </label>
                        <input
                            type="file"
                            className="form-control"
                            id="image"
                            name="image"
                            onChange={handleFileChange}
                        />
                        {imagePreview && (
                            <div className="mt-2">
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    style={{ width: '100%', height: 'auto' }}
                                />
                            </div>
                        )}
                    </div>

                    <div className="col-12 text-center">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`${isLoading ? 'not-allowed' : 'allowed'}`}
                        >
                            {isLoading ? 'Please Wait...' : 'Update Artical'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default EditArtical;
