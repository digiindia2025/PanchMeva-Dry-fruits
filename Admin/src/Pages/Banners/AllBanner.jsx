import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AllBanner = () => {
    const [banners, setBanners] = useState([]); // State to store the banner data
    const [isLoading, setIsLoading] = useState(false);

    // Fetch banners data from the backend when component mounts
    useEffect(() => {
        const fetchBanners = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get('https://api.panchgavyamrit.com/api/all-banner');
                setBanners(response.data.banners); // Assuming the API returns an array of banners
            } catch (error) {
                toast.error("Failed to load banners!");
            } finally {
                setIsLoading(false);
            }
        };

        fetchBanners();
    }, []);

    // Delete banner function
    const handleDelete = async (bannerId) => {
        try {
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: 'You won\'t be able to revert this!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No, cancel!',
            });

            if (result.isConfirmed) {
                await axios.delete(`https://api.panchgavyamrit.com/api/banner/${bannerId}`);
                setBanners(banners.filter((banner) => banner._id !== bannerId)); // Remove the deleted banner from the state
                Swal.fire('Deleted!', 'Your banner has been deleted.', 'success');
            }
        } catch (error) {
            toast.error("Failed to delete banner!");
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>All Banners</h4>
                </div>
                <div className="links">
                    <Link to="/add-banner" className="add-new">Add New <i className="fa-solid fa-plus"></i></Link>
                </div>
            </div>

            {/* <div className="filteration">
                <div className="selects">
                    <select>
            <option>Ascending Order </option>
            <option>Descending Order </option>
          </select>
                </div>
                <div className="search">
                    <label htmlFor="search">Search </label> &nbsp;
                    <input type="text" name="search" id="search" />
                </div>
            </div> */}

            <section className="d-table">
                <table className="table table-bordered table-striped table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Sr.No.</th>
                            <th scope="col">Image</th>
                            <th scope="col">Show on Home Page</th>
                            <th scope="col">Edit</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr>
                                <td colSpan="6" className="text-center">Loading...</td>
                            </tr>
                        ) : (
                            banners.map((banner, index) => (
                                <tr key={banner._id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>
                                        <img src={banner.bannerImage} alt="Banner" width="100" height="50" />
                                    </td>
                                    <td>{banner.bannerStatus ? 'Active' : 'Inactive'}</td>
                                    <td>
                                        <Link to={`/edit-banner/${banner._id}`} className="bt edit">
                                            Edit <i className="fa-solid fa-pen-to-square"></i>
                                        </Link>
                                    </td>
                                    <td>
                                        <button
                                            className="bt delete"
                                            onClick={() => handleDelete(banner._id)}
                                        >
                                            Delete <i className="fa-solid fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </section>
        </>
    );
};

export default AllBanner;
