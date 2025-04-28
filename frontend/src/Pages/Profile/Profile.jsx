import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./profile.css";
// import image from "../../images/footer1.jpg";
import axios from "axios";
const Profile = () => {
  const [data, setData] = useState({});
  const [orders, setOrders] = useState([]);
  const userId = sessionStorage.getItem("userId");

  const getUserData = async () => {
    try {
      const res = await axios.get(
        "https://api.panchgavyamrit.com/api/get-user/" + userId
      );
      if (res.status === 200) {
        setData(res.data.data);
        // Assuming orders are fetched from a different API endpoint
        const ordersRes = await axios.get(
          `https://api.panchgavyamrit.com/api/all-order-by-userid/${userId}`
        );
        if (ordersRes.status === 200) {
          setOrders(ordersRes.data.data); // Set the orders from API response
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logOut = () => {
    sessionStorage.clear();
    window.location.href = "/login";
  };
  useEffect(() => {
    getUserData();
  }, [userId]);
  return (
    <>
      <section className="minibreadCrumb">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-6">
              <Link
                to="/"
                className="back-icon text-decoration-none text-black d-flex align-items-center gap-2"
              >
                <i className="bi bi-arrow-left text-black"></i> Back to Home
              </Link>
            </div>
            <div className="col-md-6 col-6">
              <div className="text-black d-flex justify-content-end gap-2">
                <button className="btn btn-primary" onClick={logOut}>
                  <i className="bi bi-box-arrow-right breadSpan"></i> Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="container profile">
        <h1>Our Profile</h1>
        <div className="d-flex justify-content-center">
          <div className="prifileContent">
            <p>
              <b style={{ color: "var(--themeColor)" }}>Name</b> : {data.name}
            </p>
            <p>
              <b style={{ color: "var(--themeColor)" }}>Email</b> : {data.email}
            </p>
          </div>
        </div>

        <div className="oderHistory">
          {orders.length > 0 ? (
            orders.map((order) => (
              <div className="row" key={order._id}>
                <div className="col-md-4">
                  <h4>Order Details</h4>
                  <div className="table-responsive">
                    <table className="table table-bordered">
                      <tbody>
                        <tr>
                          <td>
                            <strong>Order ID</strong>
                          </td>
                          <td>{order._id}</td>
                        </tr>
                        <tr>
                          <td>
                            <strong>Order Status</strong>
                          </td>
                          <td>{order.orderStatus}</td>
                        </tr>
                        <tr>
                          <td>
                            <strong>Payment Mode</strong>
                          </td>
                          <td>{order.paymentMethod}</td>
                        </tr>
                        <tr>
                          <td>
                            <strong>Payment Status</strong>
                          </td>
                          <td>{order.paymentStatus}</td>
                        </tr>
                        <tr>
                          <td>
                            <strong>Total</strong>
                          </td>
                          <td>₹{order.totalAmount}</td>
                        </tr>
                        <tr>
                          <td>
                            <strong>Date</strong>
                          </td>
                          <td>
                            {new Date(order.orderDate).toLocaleDateString()}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="col-md-8 mt-3 mb-3">
                  <h4>Product Details</h4>
                  <div className="table-responsive">
                    <table className="table table-bordered">
                      <thead className="table-dark">
                        <tr>
                          <th>Pic</th>
                          <th>Name</th>
                          <th>Weight</th>
                          <th>Price</th>
                          <th>Qty</th>
                          <th>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {order.products.map((product) => (
                          <tr key={product._id}>
                            <td>
                              <img
                                src={product.productImage}
                                alt={product.productName}
                                className="img-thumbnail"
                                width="100"
                              />
                            </td>
                            <td>{product.productName}</td>
                            <td>{product.weight}</td>
                            <td>₹{product.price}</td>
                            <td>{product.quantity}</td>
                            <td>₹{product.price * product.quantity}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No orders found.</p>
          )}
        </div>
        {/* ----Order History---- end */}
      </div>
    </>
  );
};

export default Profile;
