import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CustomLoader from '../../Components/CustomLoader/CustomLoader';

const EditCategory = () => {
    const [btnLoading, setBtnLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // Loader for initial data fetch
    const [categoryName, setCategoryName] = useState('');
    const [categoryImage, setCategoryImage] = useState(null);
    const [existingImage, setExistingImage] = useState('');
    const [categoryStatus, setCategoryStatus] = useState(false);
    const { id } = useParams(); // Get the category ID from URL params
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch category details by ID
        const fetchCategory = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/signle-category/${id}`);
                const { categoryName, categoryImage, categoryStatus } = response.data;
                setCategoryName(categoryName);
                setExistingImage(categoryImage);
                setCategoryStatus(categoryStatus);
                setIsLoading(false);
            } catch (error) {
                toast.error('Failed to fetch category details');
                setIsLoading(false);
            }
        };
        fetchCategory();
    }, [id]);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setBtnLoading(true);

        const formData = new FormData();
        formData.append('categoryName', categoryName);
        if (categoryImage) formData.append('categoryImage', categoryImage); // Only append if a new image is selected
        formData.append('categoryStatus', categoryStatus); // Add categoryStatus

        try {
            await axios.put(`http://localhost:8000/api/update-category/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setBtnLoading(false);
            toast.success('Category updated successfully!');
            navigate('/all-category');
        } catch (error) {
            setBtnLoading(false);
            toast.error(error?.response?.data?.message || 'Failed to update category');
        }
    };

    if (isLoading) {
        return <CustomLoader />;
    }

    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>Edit Category</h4>
                </div>
                <div className="links">
                    <Link to="/all-category" className="add-new">Back <i className="fa-regular fa-circle-left"></i></Link>
                </div>
            </div>

            <div className="d-form">
                <form className="row g-3" onSubmit={handleFormSubmit}>
                    <div className="col-md-6">
                        <label htmlFor="categoryName" className="form-label">Category Name<sup className='text-danger'>*</sup></label>
                        <input
                            type="text"
                            name="categoryName"
                            className="form-control"
                            id="categoryName"
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                            required
                            placeholder="Category Name"
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="categoryImage" className="form-label">Category Image</label>
                        <input
                            type="file"
                            name="categoryImage"
                            className="form-control"
                            id="categoryImage"
                            onChange={(e) => setCategoryImage(e.target.files[0])}
                        />
                        {existingImage && (
                            <div className="mt-2">
                                <img src={existingImage} alt="Category" width="100" />
                                <p className="small text-muted">Current Image</p>
                            </div>
                        )}
                    </div>
                    <div className="col-12">
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                name="categoryActive"
                                id="categoryActive"
                                checked={categoryStatus}
                                onChange={() => setCategoryStatus(!categoryStatus)}
                            />
                            <label className="form-check-label" htmlFor="categoryActive">
                                Active
                            </label>
                        </div>
                    </div>

                    <div className="col-12 text-center">
                        <button
                            type="submit"
                            disabled={btnLoading}
                            className={`${btnLoading ? 'not-allowed' : 'allowed'}`}
                        >
                            {btnLoading ? 'Please Wait...' : 'Update Category'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default EditCategory;
