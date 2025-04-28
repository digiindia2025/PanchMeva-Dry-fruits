import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css'; // Add CSS styling to make it visually appealing

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Admin Dashboard</h1>
      <div className="dashboard-grid">

        {/* Manage Orders Section */}
        <div className="dashboard-card">
          <i className="fa-solid fa-cart-shopping dashboard-icon"></i>
          <h4>Manage Orders</h4>
          <p>Track and update customer orders.</p>
          <Link to="/all-orders" className="dashboard-link">Manage Orders</Link>
        </div>

        <div className="dashboard-card">
          <i className="fa-solid fa-comment-dots dashboard-icon"></i>
          <h4>Manage Inquiries</h4>
          <p>View and respond to customer inquiries efficiently.</p>
          <Link to="/all-contact-inquery" className="dashboard-link">View Inquiries</Link>
        </div>


        {/* Manage Category Section */}
        <div className="dashboard-card">
          <i className="fa-solid fa-list dashboard-icon"></i>
          <h4>Manage Category</h4>
          <p>View, add, or edit product categories.</p>
          <Link to="/all-category" className="dashboard-link">Manage Categories</Link>
        </div>

        {/* Manage Product Section */}
        <div className="dashboard-card">
          <i className="fa-solid fa-box dashboard-icon"></i>
          <h4>Manage Product</h4>
          <p>Manage product inventory and details.</p>
          <Link to="/all-products" className="dashboard-link">Manage Products</Link>
        </div>

        {/* All Users Section */}
        <div className="dashboard-card">
          <i className="fa-solid fa-users dashboard-icon"></i>
          <h4>All Users</h4>
          <p>Manage user accounts and permissions.</p>
          <Link to="/all-users" className="dashboard-link">View Users</Link>
        </div>



        {/* Manage Pincode Section */}
        <div className="dashboard-card">
          <i className="fa-solid fa-location-dot dashboard-icon"></i>
          <h4>Manage Pincode</h4>
          <p>View, add, or edit delivery pincodes.</p>
          <Link to="/all-pincodes" className="dashboard-link">Manage Pincode</Link>
        </div>

        {/* Manage Banner Section */}
        <div className="dashboard-card">
          <i className="fa-regular fa-images dashboard-icon"></i>
          <h4>Manage Banners</h4>
          <p>Update banners displayed on the website.</p>
          <Link to="/all-banners" className="dashboard-link">Manage Banners</Link>
        </div>


      </div>
    </div>
  );
};

export default Dashboard;
