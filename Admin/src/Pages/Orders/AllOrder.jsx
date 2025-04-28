import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AllOrder = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterOption, setFilterOption] = useState('');

    const normalizeOrders = (data) => {
        return data.map((order) => ({
            ...order,
            _id: order._id?.$oid || order._id,
            userId: order.userId?.$oid || order.userId,
            orderDate: new Date(order.orderDate?.$date || order.orderDate || new Date()),
            products: order.products?.map((product) => ({
                ...product,
                _id: product._id?.$oid || product._id,
                productId: product.productId?.$oid || product.productId,
            })) || [],
        }));
    };

    const fetchOrders = async () => {
        try {
            const response = await axios.get('https://api.panchgavyamrit.com/api/order-data');
            if (response.status === 200) {
                const cleanedOrders = normalizeOrders(response.data.data);
                setOrders(cleanedOrders);
            } else {
                toast.error('Failed to fetch orders!');
            }
        } catch (error) {
            console.error(error);
            toast.error('Error fetching orders!');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleDelete = async (orderId) => {
        try {
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: 'This action cannot be undone!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'Cancel',
            });

            if (result.isConfirmed) {
                const response = await axios.delete(`https://api.panchgavyamrit.com/api/delete-order-data/${orderId}`);
                if (response.status === 200) {
                    toast.success('Order deleted successfully!');
                    fetchOrders();
                } else {
                    toast.error('Failed to delete the order. Please try again.');
                }
            }
        } catch (error) {
            console.error('Error deleting the order:', error);
            toast.error('An error occurred while deleting the order.');
        }
    };

    const getFilteredOrders = () => {
        if (!filterOption) return orders;

        return orders.filter((order) =>
            order.paymentStatus?.toLowerCase() === filterOption.toLowerCase()
        );
    };

    const filteredOrders = getFilteredOrders();

    if (loading) return <div className="p-4">Loading...</div>;

    return (
        <>
            <ToastContainer />
            <div className="bread mb-4 d-flex justify-content-between align-items-center">
                <h4>All Orders</h4>
            </div>

            <div className="filteration mb-3">
                <select
                    className="form-select w-auto"
                    value={filterOption}
                    onChange={(e) => setFilterOption(e.target.value)}
                >
                    <option value="">All Orders</option>
                    <option value="Successfull">Successfull</option>
                    <option value="Pending">Pending</option>
                </select>
            </div>

            <section className="d-table">
                <table className="table table-bordered table-striped table-hover">
                    <thead>
                        <tr>
                            <th>Sr.No.</th>
                            <th>Order ID</th>
                            <th>Final Price</th>
                            <th>Order Status</th>
                            <th>Payment Mode</th>
                            <th>Payment Status</th>
                            <th>Order Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredOrders.length > 0 ? (
                            filteredOrders.map((order, index) => (
                                <tr key={order._id}>
                                    <td>{index + 1}</td>
                                    <td style={{ cursor: 'pointer' ,width:'20vw'}}>
                                        <Link to={`/edit-order/${order._id}`}>{order.orderUniqueId}</Link>
                                    </td>
                                    <td>₹{order.totalAmount || 0}</td>
                                    <td>{order.orderStatus}</td>
                                    <td>{order.paymentMethod}</td>
                                    <td>{order.paymentStatus}</td>
                                    <td>{order.orderDate?.toLocaleString()}</td>
                                    <td>
                                        <button
                                            onClick={() => handleDelete(order._id)}
                                            className="btn btn-danger btn-sm"
                                        >
                                            <i className="fa-solid fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8" className="text-center">
                                    No orders found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </section>
        </>
    );
};

export default AllOrder;
