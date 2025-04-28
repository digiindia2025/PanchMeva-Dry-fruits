import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CustomLoader from '../../Components/CustomLoader/CustomLoader';

const AddSubCategory = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        categoryName: '',
        subcategoryName: '',
        subcategoryImage: null,
        subcategoryStatus: false,
    });
    const [categories, setCategories] = useState([]); // Store categories
    const navigate = useNavigate();

    // Fetch categories from API
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/all-category');
                setCategories(response.data); // Assuming response.data is an array of categories
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories();
    }, []);

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
        setIsLoading(true);

        const apiFormData = new FormData();
        Object.keys(formData).forEach((key) => {
            apiFormData.append(key, formData[key]);
        });

        try {
            const response = await axios.post('http://localhost:8000/api/add-subcategory', apiFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setIsLoading(false);
            toast.success('Subcategory added successfully!');
            navigate('/all-subcategory');
        } catch (error) {
            setIsLoading(false);
            toast.error(error?.response?.data?.message || 'Failed to add subcategory.');
            console.error('Error adding subcategory:', error);
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>Add Subcategory</h4>
                </div>
                <div className="links">
                    <Link to="/all-subcategories" className="add-new">
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
                            required
                        />
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
                            disabled={isLoading}
                            className={`${isLoading ? 'not-allowed' : 'allowed'}`}
                        >
                            {isLoading ? 'Please Wait...' : 'Add Subcategory'}
                        </button>
                    </div>
                </form>
            </div>

            {isLoading && <CustomLoader />}
        </>
    );
};

export default AddSubCategory;
