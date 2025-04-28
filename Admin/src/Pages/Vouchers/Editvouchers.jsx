import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditVouchers = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [voucherData, setVoucherData] = useState({
        code: '',
        discount: '',
        vouchersStatus: false,
    });

    // Fetch voucher data by ID
    useEffect(() => {
        const fetchVoucher = async () => {
            try {
                const response = await axios.get(`https://api.panchgavyamrit.com/api/single-vouchers/${id}`);
                setVoucherData(response.data.data);
            } catch (error) {
                console.error('Error fetching voucher:', error);
                toast.error('Failed to fetch voucher data.');
            }
        };

        fetchVoucher();
    }, [id]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setVoucherData({
            ...voucherData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    // Form validation
    const validateForm = () => {
        if (!voucherData.code) {
            toast.error('Voucher code is required.');
            return false;
        }
        if (voucherData.discount <= 0 || isNaN(voucherData.discount)) {
            toast.error('Discount must be a positive number.');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }
        setIsLoading(true);
        try {
            await axios.put(`https://api.panchgavyamrit.com/api/update-vouchers/${id}`, voucherData);
            toast.success('Voucher updated successfully!');
            navigate('/all-vouchers');
        } catch (error) {
            console.error('Error updating voucher:', error);
            toast.error('Failed to update voucher. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>Edit Voucher</h4>
                </div>
                <div className="links">
                    <Link to="/all-vouchers" className="add-new">
                        Back <i className="fa-regular fa-circle-left"></i>
                    </Link>
                </div>
            </div>

            <div className="d-form">
                <form className="row g-3" onSubmit={handleSubmit}>
                    <div className="col-md-6">
                        <label htmlFor="code" className="form-label">
                            Voucher Code<sup className="text-danger">*</sup>
                        </label>
                        <input
                            type="text"
                            name="code"
                            className="form-control"
                            id="code"
                            value={voucherData.code}
                            onChange={handleChange}
                            placeholder="Voucher Code"
                        />
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="discount" className="form-label">
                            Discount<sup className="text-danger">*</sup>
                        </label>
                        <input
                            type="number"
                            name="discount"
                            className="form-control"
                            id="discount"
                            value={voucherData.discount}
                            onChange={handleChange}
                            min="0"
                            placeholder="Discount"
                        />
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="vouchersStatus" className="form-label">
                            Voucher Status
                        </label>
                        <input
                            type="checkbox"
                            name="vouchersStatus"
                            id="vouchersStatus"
                            checked={voucherData.vouchersStatus}
                            onChange={handleChange}
                        />{' '}
                        Active
                    </div>

                    <div className="col-12 text-center">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`${isLoading ? 'not-allowed' : 'allowed'}`}
                        >
                            {isLoading ? 'Please Wait...' : 'Update Voucher'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default EditVouchers;
