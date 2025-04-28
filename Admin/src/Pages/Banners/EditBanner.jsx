import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditBanner = () => {
    const { id } = useParams(); // Get banner ID from the URL params
    const navigate = useNavigate();
    const [btnLoading, setBtnLoading] = useState(false);
    const [bannerData, setBannerData] = useState({
        bannerImage: '',
        bannerStatus: false,
    });
    const [imagePreview, setImagePreview] = useState('');

    // Fetch the banner data on component mount
    useEffect(() => {
        const fetchBannerData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/single-banner/${id}`);
                setBannerData({
                    bannerImage: response.data.banner.bannerImage,
                    bannerStatus: response.data.banner.bannerStatus,
                });
                setImagePreview(response.data.banner.bannerImage); // Show the existing image in the preview
            } catch (error) {
                console.error('Error fetching banner data:', error);
                toast.error('Failed to fetch banner details.');
            }
        };

        fetchBannerData();
    }, [id]);

    // Handle file input change
    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (files && files[0]) {
            const file = files[0];
            setBannerData((prevData) => ({
                ...prevData,
                [name]: file,
            }));
            setImagePreview(URL.createObjectURL(file)); // Preview selected image
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setBtnLoading(true);

        const formData = new FormData();
        formData.append('title', bannerData.title);
        formData.append('bannerStatus', bannerData.bannerStatus);
        if (bannerData.bannerImage) {
            formData.append('bannerImage', bannerData.bannerImage);
        }

        try {
            const response = await axios.put(`http://localhost:8000/api/update-banner/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            toast.success('Banner updated successfully!');
            navigate('/all-banners'); // Redirect to the all banners page
        } catch (error) {
            console.error('Error updating banner:', error);
            toast.error(error.response?.data?.message || 'Failed to update banner. Please try again.');
        } finally {
            setBtnLoading(false);
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>Edit Banner</h4>
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
                            Banner Image
                        </label>
                        <input
                            type="file"
                            name="bannerImage"
                            className="form-control"
                            id="bannerImage"
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

                    <div className="col-md-12">
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                name="bannerStatus"
                                id="bannerStatus"
                                checked={bannerData.bannerStatus}
                                onChange={(e) =>
                                    setBannerData({
                                        ...bannerData,
                                        bannerStatus: e.target.checked,
                                    })
                                }
                            />
                            <label className="form-check-label" htmlFor="bannerStatus">
                                Active
                            </label>
                        </div>
                    </div>

                    <div className="col-12 text-center">
                        <button
                            type="submit"
                            className={`${btnLoading ? 'not-allowed' : 'allowed'
                                }`}
                            disabled={btnLoading}
                        >
                            {btnLoading ? 'Please Wait...' : 'Update Banner'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default EditBanner;
