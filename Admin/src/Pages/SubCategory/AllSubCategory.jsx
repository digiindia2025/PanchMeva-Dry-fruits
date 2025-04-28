import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AllSubCategory = () => {
    const [subcategories, setSubcategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    // Fetch subcategories from the backend
    useEffect(() => {
        const fetchSubcategories = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/get-subcategory'); // Adjust API endpoint
                setSubcategories(response.data.subcategories);
            } catch (error) {
                toast.error(error.response.data || 'Error fetching subcategories');
            }
        };
        fetchSubcategories();
    }, []);

    // Delete a subcategory
    const handleDelete = async (id) => {
        const confirmDelete = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        });

        if (confirmDelete.isConfirmed) {
            try {
                await axios.delete(`http://localhost:8000/api/delete-subcategory/${id}`); // Replace with your API endpoint
                setSubcategories(subcategories.filter(subcategory => subcategory._id !== id)); // Update state
                Swal.fire('Deleted!', 'The subcategory has been deleted.', 'success');
            } catch (error) {
                toast.error('Failed to delete subcategory.');
            }
        }
    };

    // Filter subcategories based on search input
    const filteredSubcategories = subcategories.filter(subcategory =>
        subcategory.subcategoryName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>All Subcategory List</h4>
                </div>
                <div className="links">
                    <Link to="/add-subcategory" className="add-new">Add New <i className="fa-solid fa-plus"></i></Link>
                </div>
            </div>

            <div className="filteration">
                <div className="selects">
                    {/* Optional select dropdown for future functionality */}
                </div>
                <div className="search">
                    <label htmlFor="search">Search </label> &nbsp;
                    <input
                        type="text"
                        name="search"
                        id="search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)} // Update search term
                    />
                </div>
            </div>

            <section className="d-table">
                <table className="table table-bordered table-striped table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Sr.No.</th>
                            <th scope="col">Subcategory Name</th>
                            <th scope="col">Category Name</th>
                            <th scope="col">Image</th>
                            <th scope="col">Active Status</th>
                            <th scope="col">Exit Product</th>
                            <th scope="col">Edit</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredSubcategories.map((subcategory, index) => (
                            <tr key={subcategory._id}>
                                <th scope="row">{index + 1}</th>
                                <td>{subcategory.subcategoryName}</td>
                                <td>{subcategory.categoryName ? subcategory.categoryName.categoryName : 'N/A'}</td> {/* Display category name */}
                                <td><img src={subcategory.subcategoryImage} alt="Subcategory" style={{ width: '50px', height: '50px' }} /></td>
                                <td>{subcategory.subcategoryStatus ? 'Yes' : 'No'}</td>
                                <td>{subcategory.exitProduct ? 'Yes' : 'No'}</td>
                                <td>
                                    <Link to={`/edit-subcategory/${subcategory._id}`} className="bt edit">
                                        Edit <i className="fa-solid fa-pen-to-square"></i>
                                    </Link>
                                </td>
                                <td>
                                    <button
                                        className="bt delete"
                                        onClick={() => handleDelete(subcategory._id)}
                                    >
                                        Delete <i className="fa-solid fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {filteredSubcategories.length === 0 && (
                            <tr>
                                <td colSpan="8" className="text-center">No subcategories found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </section>
        </>
    );
};

export default AllSubCategory;
