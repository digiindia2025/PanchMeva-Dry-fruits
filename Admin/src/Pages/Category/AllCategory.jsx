import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AllCategory = () => {
    const [categories, setCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    // Fetch categories from the backend
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('https://api.panchgavyamrit.com/api/all-category'); // Replace with your API endpoint
                console.log(response)
                setCategories(response.data);
            } catch (error) {
                toast.error(error.response.data);
            }
        };
        fetchCategories();
    }, []);

    // Delete a category
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
                await axios.delete(`https://api.panchgavyamrit.com/api/delete-category/${id}`); // Replace with your API endpoint
                setCategories(categories.filter(category => category._id !== id)); // Update state
                Swal.fire('Deleted!', 'The category has been deleted.', 'success');
            } catch (error) {
                toast.error("Failed to delete category.");
            }
        }
    };

    // Filter categories based on search input
    const filteredCategories = categories?.filter(category =>
        category.categoryName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>All Category List</h4>
                </div>
                <div className="links">
                    <Link to="/add-category" className="add-new">Add New <i className="fa-solid fa-plus"></i></Link>
                </div>
            </div>

            {/* <div className="filteration">
                <div className="selects">
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
            </div> */}

            <section className="d-table">
                <table className="table table-bordered table-striped table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Sr.No.</th>
                            <th scope="col">Name</th>
                            <th scope="col">Image</th>
                            <th scope="col">Active Status</th>
                            <th scope="col">Edit</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCategories.map((category, index) => (
                            <tr key={category._id}>
                                <th scope="row">{index + 1}</th>
                                <td>{category.categoryName}</td>
                                <td><img src={category.categoryImage} alt="Category" style={{ width: '50px', height: '50px' }} /></td>
                                <td>{category.categoryStatus ? "Yes" : "No"}</td>
                                <td>
                                    <Link to={`/edit-category/${category._id}`} className="bt edit">
                                        Edit <i className="fa-solid fa-pen-to-square"></i>
                                    </Link>
                                </td>
                                <td>
                                    <button
                                        className="bt delete"
                                        onClick={() => handleDelete(category._id)}
                                    >
                                        Delete <i className="fa-solid fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {filteredCategories.length === 0 && (
                            <tr>
                                <td colSpan="6" className="text-center">No categories found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </section>
        </>
    );
};

export default AllCategory;
