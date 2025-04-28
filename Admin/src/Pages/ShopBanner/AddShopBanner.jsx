import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddShopBanner = () => {
    const [isLoading, setIsloding] = useState(false)
    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>Add Shop Banner</h4>
                </div>
                <div className="links">
                    <Link to="/all-shop-banners" className="add-new">Back <i className="fa-regular fa-circle-left"></i></Link>
                </div>
            </div>

            <div className="d-form">
                <form className="row g-3">
                    <div className="col-md-6">
                        <label htmlFor="saleBannerTitle" className="form-label">Shop Banner Name</label>
                        <input type="text"  name='saleBannerTitle'  className="form-control" id="saleBannerTitle" />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="saleBannerImage" className="form-label">Shop Banner Image</label>
                        <input type="file"  name='saleBannerImage' className="form-control" id="saleBannerImage" />
                    </div>
                    <div className="col-12">
                        <div className="form-check">
                            <input className="form-check-input"  type="checkbox" name="active" id="active"  />
                            <label className="form-check-label" htmlFor="active">
                                Active 
                            </label>
                        </div>
                    </div>
                    <div className="col-12 text-center">
                        <button type="submit" disabled={isLoading} className={`${isLoading ? 'not-allowed':'allowed'}`}>{isLoading ? "Please Wait..." : "Add Shop Banner"}</button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default AddShopBanner;
