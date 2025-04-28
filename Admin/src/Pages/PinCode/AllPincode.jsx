import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AllPincode = () => {
    const [pincodes, setPincodes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState('');

    // Fetch all pincodes
    useEffect(() => {
        const fetchPincodes = async () => {
            try {
                const response = await axios.get('https://api.panchgavyamrit.com/api/all-pincode');
                console.log(response)
                setPincodes(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching pincodes:', error);
                toast.error('Failed to load pincodes.');
            }
        };
        fetchPincodes();
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
                await axios.delete(`https://api.panchgavyamrit.com/api/delete-pincode/${id}`);
                setPincodes(pincodes.filter((pincode) => pincode._id !== id));
                toast.success('Pincode deleted successfully!');
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
                    <h4>All Pincodes</h4>
                </div>
                <div className="links">
                    <Link to="/add-pincode" className="add-new">
                        Add New <i className="fa-solid fa-plus"></i>
                    </Link>
                </div>
            </div>

            <section className="d-table">
                <table className="table table-bordered table-striped table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Sr.No.</th>
                            <th scope="col">Pincode</th>
                            <th scope="col">Shipping Charge</th>
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
                        ) : pincodes.length > 0 ? (
                            pincodes.map((pincode, index) => (
                                <tr key={pincode._id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{pincode.pincode}</td>
                                    <td>&#8377;{pincode.shippingCharge}</td>
                                    <td>
                                        <Link to={`/edit-pincode/${pincode._id}`} className="bt edit">
                                            Edit <i className="fa-solid fa-pen-to-square"></i>
                                        </Link>
                                    </td>
                                    <td>
                                        <button
                                            className="bt delete"
                                            onClick={() => handleDelete(pincode._id)}
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

export default AllPincode;
