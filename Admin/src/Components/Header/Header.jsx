import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import './Header.css'
import axios from 'axios';
import { toast } from 'react-toastify';

const Header = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [sidetoggle, setSideToggle] = useState(false)

  const handletoggleBtn = () => {
    setSideToggle(!sidetoggle)
  }

  const logout = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/log-out', {}, { withCredentials: true });
      if (response.status === 200) {
        localStorage.clear(); // Clear all local storage data
        toast.success("Logout successful!"); // Added feedback for successful logout
        window.location.href = '/log-in' // Redirect to login page
      } else {
        toast.error(response.data.message || "Logout failed!");
      }
    } catch (error) {
      console.error("Error during logout:", error);
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };


  const isActive = (path) => location.pathname.startsWith(path);
  return (
    <>
      <header>
        <div className="top-head">
          <div className="right">
            <h2>Ved Lakshna Admin Panel</h2>
            <div className="bar" onClick={handletoggleBtn}>
              <i class="fa-solid fa-bars"></i>
            </div>
          </div>
          <div className="left">
            <a href="" target="_blank">
              <i class="fa-solid fa-globe"></i>
              Go To Website
            </a>

            <div className="logout" onClick={logout}>
              Log Out <i class="fa-solid fa-right-from-bracket"></i>
            </div>
          </div>

        </div>

        <div className={`rightNav ${sidetoggle ? "active" : ""} `}>
          <ul>
            <li className={isActive('/dashboard') ? 'active' : ''}><Link to="/dashboard" onClick={handletoggleBtn}> <i class="fa-solid fa-chart-line"></i> Dashboard</Link></li>
            <li className={isActive('/all-orders') || isActive("/edit-order") ? 'active' : ''} ><Link to="/all-orders" onClick={handletoggleBtn}> <i class="fa-solid fa-cart-shopping"></i> Manage Orders</Link></li>
            <li className={isActive('/all-contact-inquery') ? 'active' : ''} ><Link to="/all-contact-inquery" onClick={handletoggleBtn}> <i class="fa-solid fa-comment-dots"></i> Manage Inquery</Link></li>
            <li className={isActive('/all-banners') || isActive("/add-banner") || isActive("/edit-banner") ? 'active' : ''} ><Link to="/all-banners" onClick={handletoggleBtn}> <i class="fa-regular fa-images"></i> Manage Banners</Link></li>
            <li className={isActive('/all-category') || isActive("/add-category") || isActive("/edit-category") ? 'active' : ''} ><Link to="/all-category" onClick={handletoggleBtn}> <i class="fa-solid fa-list"></i> Manage Category</Link></li>
            {/* <li><Link to="/all-subcategory" onClick={handletoggleBtn}> <i class="fa-solid fa-tag"></i> Manage SubCategory</Link></li> */}
            <li className={isActive('/all-products') || isActive("/add-product") || isActive("/edit-produc") ? 'active' : ''} ><Link to="/all-products" onClick={handletoggleBtn}> <i class="fa-solid fa-box"></i> Manage Product</Link></li>
            <li className={isActive('/all-articals') || isActive("/add-artical") || isActive("/edit-artical") ? 'active' : ''} ><Link to="/all-articals" onClick={handletoggleBtn}> <i class="fa-solid fa-box"></i> Manage Articals</Link></li>
            <li className={isActive('/all-vouchers') || isActive("/add-vouchers") || isActive("/edit-vouchers") ? 'active' : ''} ><Link to="/all-vouchers" onClick={handletoggleBtn}> <i class="fa-solid fa-box"></i> Manage Vouchers</Link></li>
            <li className={isActive('/all-pincodes') || isActive("/add-pincode") || isActive("/edit-pincode") ? 'active' : ''}><Link to="/all-pincodes" onClick={handletoggleBtn}> <i class="fa-solid fa-location-dot"></i> Manage Pincode</Link></li>
            <li className={isActive('/all-users') ? 'active' : ''} ><Link to="/all-users" onClick={handletoggleBtn}> <i class="fa-solid fa-users"></i> All Users</Link></li>

            <button className='logout mb-5' onClick={logout}>Log Out <i class="fa-solid fa-right-from-bracket"></i></button>

          </ul>
        </div>

      </header>
    </>
  )
}

export default Header