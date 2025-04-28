import React, { useEffect, useState } from "react";
import "./cart.css";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useDispatch } from "react-redux";

const Cart = ({ refs, setRef }) => {
  const [cartItems, setCartItems] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const loginValue = sessionStorage.getItem("Login")

  useEffect(() => {
    window.scrollTo({ top: 0, });

    // Retrieve the cart data from sessionStorage
    const storedCart = JSON.parse(sessionStorage.getItem("VesLakshna")) || [];
    setCartItems(storedCart); // Set the cart data to the state
  }, []);

  // Function to update the quantity
  const updateQuantity = (operation, index) => {
    const newCartItems = [...cartItems];
    if (operation === "increment") {
      newCartItems[index].quantity += 1;
    } else if (operation === "decrement" && newCartItems[index].quantity > 1) {
      newCartItems[index].quantity -= 1;
    }
    setCartItems(newCartItems);
    sessionStorage.setItem("VesLakshna", JSON.stringify(newCartItems)); // Update sessionStorage


  };

  // Function to delete an item from the cart
  const deleteItem = (productId) => {
    const newCartItems = cartItems.filter(item => item.productId !== productId);
    setCartItems(newCartItems);
    sessionStorage.setItem("VesLakshna", JSON.stringify(newCartItems)); // Update sessionStorage after deletion
    dispatch({ type: 'ADD_PRODUCT', payload: ['ADD_PRODUCT', newCartItems] })
    setRef(!refs);
  };

  // Calculate total price for each product
  const getTotalPrice = (price, quantity) => (price * quantity).toFixed(2);

  // Calculate grand total
  const getGrandTotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
  };

  // Function to handle checkout redirect
  const handleCheckout = () => {
    if (loginValue) {
      navigate("/product/product-details/cart/checkout");
    } else {
      navigate("/login", { state: { from: "/product/product-details/cart/checkout" } });
    }
  };
  return (
    <>
      <Helmet>
        <title>Shopping Cart - Your Items</title>
        <meta name="description" content="View and manage items in your shopping cart." />
        <meta name="keywords" content="shopping cart, e-commerce, checkout, products" />
      </Helmet>
      <section className="minibreadCrumb">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link to="/all-products" className="back-icon text-decoration-none text-black d-flex align-items-center gap-2">
                <i className="bi bi-arrow-left text-black"></i> Back to category
              </Link>
            </div>

            <div className="col-md-12">
              <div className="text-black d-flex justify-content-end gap-2">
                <Link className="text-black" to="/">
                  <i className="bi bi-house"></i>
                </Link>
                /
                <Link className="text-black breadSpan" to="#">
                  Shopping Cart
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="cart">
        <div className="container">
          <div className="col-md-12">
            <h3 className="text-center mb-5" style={{ color: "#F58634" }}>Buy items worth <strong>₹6000</strong> or more to get free delivery!</h3>
          </div>
          <h2>Shopping Cart</h2>
          <div className="table-responsive">
            <table className="table table-bordered" style={{ borderColor: "var(--themeColor)" }}>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Product Name</th>
                  <th>Weight</th>
                  <th scope="row">Quantity</th>
                  <th>Unit Price</th>
                  <th>Total</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.length > 0 ? (
                  cartItems.map((item, index) => (
                    <tr key={item.productId}>
                      <td className="text-center">
                        <img src={item.productImage} alt="Product" width="100" />
                      </td>
                      <td>{item.productName}</td>
                      <td>{item.weight}</td>
                      <td className="quantity-td">
                        <button
                          className="btn btn-outline-primary btn-sm mx-2"
                          onClick={() => updateQuantity("decrement", index)}
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          className="btn btn-outline-primary btn-sm mx-2"
                          onClick={() => updateQuantity("increment", index)}
                        >
                          +
                        </button>
                      </td>
                      <td>&#8377;{item.price}</td>
                      <td>&#8377;{getTotalPrice(item.price, item.quantity)}</td>
                      <td>
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => deleteItem(item.productId)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center">
                      Your cart is empty.
                    </td>
                  </tr>
                )}
                <tr>
                  <td colSpan="6" className="text-end">
                    <strong>Total</strong>
                  </td>
                  <td>
                    <strong>&#8377;{getGrandTotal()}</strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="d-flex justify-content-between mt-3 gap-2">
            <button onClick={() => navigate("/all-products")} className="btn text-white d-flex justify-content-center align-items-center" style={{ width: '100vw' }}>
              Continue Shopping
            </button> &nbsp;
            <button onClick={handleCheckout} className="btn text-white d-flex justify-content-center align-items-center width-100vw" style={{ width: '100vw' }}>
              Checkout
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
