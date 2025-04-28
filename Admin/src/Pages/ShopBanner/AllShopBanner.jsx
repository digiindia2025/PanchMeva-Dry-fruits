import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AllShopBanner = () => {
    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>All Shop Banners </h4>
                </div>
                <div className="links">
                    <Link to="/add-shop-banner" className="add-new">Add New <i class="fa-solid fa-plus"></i></Link>
                </div>
            </div>

            <div className="filteration">
                <div className="selects">
                    {/* <select>
                        <option>Ascending Order </option>
                        <option>Descending Order </option>
                    </select> */}
                </div>
                <div className="search">
                    <label htmlFor="search">Search </label> &nbsp;
                    <input type="text" name="search" id="search" />
                </div>
            </div>

            <section className="d-table ">
                <table class="table table-bordered table-striped table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Sr.No.</th>
                            <th scope="col">Name</th>
                            <th scope="col">Image</th>
                            <th scope="col">Show in home page</th>
                            <th scope="col">Edit</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                            <tr>
                                <th scope="row"></th>
                               <td></td>
                               <td></td>
                                <td><input type="checkbox" readOnly /></td>
                                <td><Link  className="bt edit">Edit <i class="fa-solid fa-pen-to-square"></i></Link></td>
                                <td><Link  className="bt delete">Delete <i class="fa-solid fa-trash"></i></Link></td>
                            </tr>
                    </tbody>
                </table>
            </section>
        </>
    )
}

export default AllShopBanner