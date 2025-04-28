import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AllProduct = () => {
    const [data, setData] = useState([]);
    
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('https://api.panchgavyamrit.com/api/get-product');
                console.log(response)
                setData(response.data.products); // Assuming the response contains a 'products' array
            } catch (error) {
                console.error('Error fetching products', error);
                toast.error('Failed to load products');
            }
        };

        fetchProducts();
    }, []);

    const handleDelete = async (productId) => {
        try {
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: 'You won\'t be able to revert this!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No, keep it'
            });

            if (result.isConfirmed) {
                const response = await axios.delete(`https://api.panchgavyamrit.com/api/delete-product/${productId}`);
                toast.success('Product deleted successfully');
                setData(data.filter(item => item._id !== productId)); // Remove deleted product from state
            }
        } catch (error) {
            console.error('Error deleting product', error);
            toast.error('Failed to delete product');
        }
    };

    const handleStatusChange = async (productId, field, currentValue) => {
        try {
            const response = await axios.put(`https://api.panchgavyamrit.com/api/update-product/${productId}`, {
                [field]: !currentValue, // Dynamically set the field to update
            });
            toast.success(`${field === 'productStatus' ? 'Product status' : 'Bestseller status'} updated successfully`);
            // Update the specific field in the state
            setData(data.map(item =>
                item._id === productId ? { ...item, [field]: !currentValue } : item
            ));
        } catch (error) {
            console.error(`Error updating ${field}`, error);
            toast.error(`Failed to update ${field}`);
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>All Product List</h4>
                </div>
                <div className="links">
                    <Link to="/add-product" className="add-new">Add New <i className="fa-solid fa-plus"></i></Link>
                </div>
            </div>

            {/* <div className="filteration">
                <div className="selects">
                   
                </div>
                <div className="search">
                    <label htmlFor="search">Search</label> &nbsp;
                    <input type="text" name="search" id="search" />
                </div>
            </div> */}

            <section className="d-table">
                <table className="table table-bordered table-striped table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Sr.No.</th>
                            <th scope="col">Category Name</th>
                            <th scope="col">Product Name</th>
                            <th scope="col">Product Image</th>
                            <th scope="col">Product Status</th>
                            <th scope="col">Best Seller</th>
                            <th scope="col">Edit</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((item, index) =>
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{item?.categoryName?.categoryName || "NA"}</td>
                                    <td>{item.productName.length > 40 ? item.productName.slice(0, 40) + "..." : item.productName}</td>
                                    <td>
                                        <img src={item.productImage[0]} alt={item.productName} width="50" height="50" />
                                    </td>
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={item.productStatus}
                                            onChange={() => handleStatusChange(item._id, 'productStatus', item.productStatus)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={item.bestseller}
                                            onChange={() => handleStatusChange(item._id, 'bestseller', item.bestseller)}
                                        />
                                    </td>

                                    <td><Link to={`/edit-product/${item._id}`} className="bt edit">Edit <i className="fa-solid fa-pen-to-square"></i></Link></td>
                                    <td>
                                        <button onClick={() => handleDelete(item._id)} className="bt delete">
                                            Delete <i className="fa-solid fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </section>
        </>
    );
}

export default AllProduct;
