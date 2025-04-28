import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CustomLoader from '../../Components/CustomLoader/CustomLoader';

const AddCategory = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [categoryName, setCategoryName] = useState('');
    const [categoryImage, setCategoryImage] = useState(null);
    const [categoryStatus, setCategoryStatus] = useState(false);
    const navigate = useNavigate()

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData();
        formData.append('categoryName', categoryName);
        formData.append('categoryImage', categoryImage);
        formData.append('categoryStatus', categoryStatus); // `true` or `false`

        try {
            const response = await axios.post('https://api.panchgavyamrit.com/api/add-category', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setIsLoading(false);
            toast.success('Category added successfully!');
            navigate("/all-category");
        } catch (error) {
            setIsLoading(false);
            toast.error(error?.response?.data?.errors?.categoryName || error?.response?.data?.message);
            console.log(error);
        }
    };


    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>Add Category</h4>
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
                            placeholder='Category Name'
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="categoryImage" className="form-label">Category Image<sup className='text-danger'>*</sup></label>
                        <input
                            type="file"
                            name="categoryImage"
                            className="form-control"
                            id="categoryImage"
                            onChange={(e) => setCategoryImage(e.target.files[0])}
                            required
                        />
                    </div>
                    <div className="col-12">
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                name="categoryActive"
                                id="categoryActive"
                                checked={categoryStatus}
                                onChange={(e) => setCategoryStatus(e.target.checked)} // Update based on event
                            />

                            <label className="form-check-label" htmlFor="categoryActive">
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
                            {isLoading ? "Please Wait..." : "Add Category"}
                        </button>
                    </div>
                </form>
            </div>

            {/* Show loader when the form is submitting */}
            {isLoading && <CustomLoader />}
        </>
    );
}

export default AddCategory;
