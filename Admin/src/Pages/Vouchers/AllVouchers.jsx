import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AllVouchers = () => {
    const [vouchers, setVouchers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState('');

    // Fetch all pincodes
    useEffect(() => {
        const fetchVouchers = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/all-vouchers');
                setVouchers(response.data.data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching pincodes:', error);
                toast.error('Failed to load pincodes.');
            }
        };
        fetchVouchers();
    }, []);

    // Delete a pincode
    const handleDelete = async (id) => {
        try {
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No, cancel!',
            });

            if (result.isConfirmed) {
                await axios.delete(`http://localhost:8000/api/delete-vouchers/${id}`);
                setVouchers(vouchers.filter((vouchers) => vouchers._id !== id));
                toast.success('Vouchers deleted successfully!');
            }
        } catch (error) {
            console.error('Error deleting pincode:', error);
            toast.error('Failed to delete pincode.');
        }
    };
    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>All Vouchers</h4>
                </div>
                <div className="links">
                    <Link to="/add-vouchers" className="add-new">
                        Add New <i className="fa-solid fa-plus"></i>
                    </Link>
                </div>
            </div>

            <section className="d-table">
                <table className="table table-bordered table-striped table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Sr.No.</th>
                            <th scope="col">Code</th>
                            <th scope="col">Discount</th>
                            <th scope="col">Active Status</th>
                            <th scope="col">Edit</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr>
                                <td colSpan="5" className="text-center">
                                    Loading...
                                </td>
                            </tr>
                        ) : vouchers.length > 0 ? (
                            vouchers.map((vouchers, index) => (
                                <tr key={vouchers._id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{vouchers.code}</td>
                                    <td>OFF {vouchers.discount}%</td>
                                    <td>
                                        <input type="checkbox" checked={vouchers.vouchersStatus} readOnly />
                                    </td>
                                    <td>
                                        <Link to={`/edit-vouchers/${vouchers._id}`} className="bt edit">
                                            Edit <i className="fa-solid fa-pen-to-square"></i>
                                        </Link>
                                    </td>
                                    <td>
                                        <button
                                            className="bt delete"
                                            onClick={() => handleDelete(vouchers._id)}
                                        >
                                            Delete <i className="fa-solid fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center">
                                    No pincodes found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </section>
        </>
    );
};

export default AllVouchers;
