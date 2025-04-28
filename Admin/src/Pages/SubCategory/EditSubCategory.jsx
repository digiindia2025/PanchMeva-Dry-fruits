import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CustomLoader from '../../Components/CustomLoader/CustomLoader';

const EditSubCategory = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [btnLoading, setBtnLoading] = useState(false);
    const [formData, setFormData] = useState({
        categoryName: '',
        subcategoryName: '',
        subcategoryImage: null,
        subcategoryStatus: false,
    });
    const [categories, setCategories] = useState([]);
    const { id } = useParams(); // Get the subcategory ID from URL params
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('https://api.panchgavyamrit.com/api/all-category');
                setCategories(response.data); // Assuming response.data is an array of categories
            } catch (error) {
                console.error('Error fetching categories:', error);
                toast.error('Failed to fetch categories');
            }
        };

        const fetchSubCategory = async () => {
            try {
                const response = await axios.get(`https://api.panchgavyamrit.com/api/single-subcategory/${id}`);
                const { categoryName, subcategoryName, subcategoryImage, subcategoryStatus } = response.data.subcategory;
                setFormData({
                    categoryName: categoryName._id,  // Set category ID
                    subcategoryName,
                    subcategoryImage, // Preload existing image
                    subcategoryStatus,
                });
                setIsLoading(false);
            } catch (error) {
                toast.error('Failed to fetch subcategory details');
                setIsLoading(false);
            }
        };

        fetchCategories();
        fetchSubCategory();
    }, [id]);

    // Handle input change
    const handleInputChange = (e) => {
        const { name, value, type, checked, files } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value,
        }));
    };

    // Handle form submit
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setBtnLoading(true);
        const apiFormData = new FormData();
        apiFormData.append('categoryName', formData.categoryName); // Make sure you're passing the category ID
        Object.keys(formData).forEach((key) => {
            if (key !== 'categoryName') {
                apiFormData.append(key, formData[key]);
            }
        });
        try {
            const response = await axios.put(
                `https://api.panchgavyamrit.com/api/update-subcategory/${id}`,
                apiFormData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            setBtnLoading(false);
            toast.success('Subcategory updated successfully!');
            navigate('/all-subcategory');
        } catch (error) {
            setBtnLoading(false);
            toast.error(error?.response?.data?.message || 'Failed to update subcategory');
            console.error('Error updating subcategory:', error);
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
                    <h4>Edit Subcategory</h4>
                </div>
                <div className="links">
                    <Link to="/all-subcategory" className="add-new">
                        Back <i className="fa-regular fa-circle-left"></i>
                    </Link>
                </div>
            </div>

            <div className="d-form">
                <form className="row g-3" onSubmit={handleFormSubmit}>
                    <div className="col-md-6">
                        <label htmlFor="categoryName" className="form-label">
                            Category Name<sup className="text-danger">*</sup>
                        </label>
                        <select
                            name="categoryName"
                            className="form-control"
                            id="categoryName"
                            value={formData.categoryName}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">Select Category</option>
                            {categories.map((category) => (
                                <option key={category._id} value={category._id}>
                                    {category.categoryName}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="subcategoryName" className="form-label">
                            Subcategory Name<sup className="text-danger">*</sup>
                        </label>
                        <input
                            type="text"
                            name="subcategoryName"
                            className="form-control"
                            id="subcategoryName"
                            value={formData.subcategoryName}
                            onChange={handleInputChange}
                            required
                            placeholder="Subcategory Name"
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="subcategoryImage" className="form-label">
                            Subcategory Image<sup className="text-danger">*</sup>
                        </label>
                        <input
                            type="file"
                            name="subcategoryImage"
                            className="form-control"
                            id="subcategoryImage"
                            onChange={handleInputChange}
                        />
                        {formData.subcategoryImage && (
                            <div className="mt-2">
                                {formData.subcategoryImage instanceof File ? (
                                    <img
                                        src={URL.createObjectURL(formData.subcategoryImage)}
                                        alt="Subcategory"
                                        width="100"
                                    />
                                ) : (
                                    <img
                                        src={formData.subcategoryImage}
                                        alt="Subcategory"
                                        width="100"
                                    />
                                )}
                                <p className="small text-muted">Selected Image</p>
                            </div>
                        )}
                    </div>
                    <div className="col-12">
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                name="subcategoryStatus"
                                id="subcategoryStatus"
                                checked={formData.subcategoryStatus}
                                onChange={handleInputChange}
                            />
                            <label className="form-check-label" htmlFor="subcategoryStatus">
                                Active
                            </label>
                        </div>
                    </div>
                    <div className="col-12 text-center">
                        <button
                            type="submit"
                            disabled={btnLoading}
                            className={`btn btn-primary ${btnLoading ? 'disabled' : ''}`}
                        >
                            {btnLoading ? 'Please Wait...' : 'Update Subcategory'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default EditSubCategory;
