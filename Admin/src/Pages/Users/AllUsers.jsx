import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const AllUsers = () => {
    const [data, setData] = useState([]);

    // Fetch all users
    const getApiData = async () => {
        try {
            const res = await axios.get("http://localhost:8000/api/all-users", {
                withCredentials: true, // Axios will automatically send the cookie with the request
            });

            if (res.status === 200) {
                setData(res.data.data);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            if (error.response && error.response.status === 401) {
                Swal.fire('Unauthorized', 'Please login first', 'warning');
                window.location.href = "/log-in"
            } else {
                Swal.fire('Error', 'Something went wrong', 'error');
            }
        }
    };

    // Delete user
    const handleDelete = async (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axios.delete(`http://localhost:8000/api/delete-user/${id}`, {
                        withCredentials: true, // Include the cookie with the request
                    });

                    if (res.status === 200) {
                        Swal.fire(
                            'Deleted!',
                            'The user has been deleted.',
                            'success'
                        );
                        getApiData(); // Refresh data after deletion
                    }
                } catch (error) {
                    console.error(error);
                    Swal.fire(
                        'Error!',
                        'There was a problem deleting the user.',
                        'error'
                    );
                }
            }
        });
    };

    useEffect(() => {
        getApiData();
    }, []);

    // Function to format the date to a readable format (e.g., YYYY-MM-DD)
    const formatDate = (date) => {
        const d = new Date(date);
        return d.toLocaleDateString(); // Formats date as MM/DD/YYYY by default
    };

    return (
        <>
            <div className="bread">
                <div className="head">
                    <h4>All Users</h4>
                </div>
                <div className="links">
                    {/* Additional links or actions can be placed here */}
                </div>
            </div>

            <section className="d-table">
                <div className="table-responsive mt-4">
                    <table className="table table-bordered table-striped table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Sr.No.</th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Role</th>
                                <th scope="col">Created At</th>
                                <th scope="col">Delete</th>
                                {/* Add more columns as needed */}
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map((item, index) => (
                                    <tr key={item._id}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{item.name}</td>
                                        <td>{item.email}</td>
                                        <td>{item.role}</td>
                                        <td>{formatDate(item.createdAt)}</td>
                                        <td>
                                            <button
                                                className='bt delete'
                                                onClick={() => handleDelete(item._id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </section>
        </>
    );
};

export default AllUsers;
