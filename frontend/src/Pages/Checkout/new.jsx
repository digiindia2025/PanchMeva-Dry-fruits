import React, { useEffect, useState } from "react";
import "./checkout.css";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import axios from "axios";

const Checkout = () => {
  const userId = sessionStorage.getItem("userId");
  const [userData, setUserData] = useState({});
  const [applycupanValue, setApplycupanValue] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [total, setTotal] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("Online");
  const [cupanCode, setCupanCode] = useState([]);
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    // Fetch all vouchers
    const getCupancode = async () => {
      try {
        const res = await axios.get("https://api.panchgavyamrit.com/api/all-vouchers");
        if (res.status === 200) {
          setCupanCode(res.data.data);
        }
      } catch (error) {
        console.error("Error fetching coupons:", error);
      }
    };
    getCupancode();

    // Fetch user data
    const getApiData = async () => {
      try {
        const res = await axios.get(`https://api.panchgavyamrit.com/api/get-user/${userId}`);
        if (res.status === 200) {
          setUserData(res.data.data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    getApiData();

    // Load cart data from sessionStorage
    const savedCartItems = JSON.parse(sessionStorage.getItem("VesLakshna")) || [];
    setCartItems(savedCartItems);
    calculateCartSummary(savedCartItems);
  }, []);

  useEffect(() => {
    if (subtotal && shipping !== null) {
      setTotal(subtotal + shipping - discount);
    }
  }, [subtotal, shipping, discount]);

  const calculateCartSummary = (cartItems) => {
    let tempSubtotal = 0;
    cartItems.forEach(item => {
      tempSubtotal += item.price * item.quantity;
    });
    setSubtotal(tempSubtotal);

    if (tempSubtotal >= 6000) {
      setShipping(0);
    } else {
      setShipping(200); // Default shipping
    }
  };

  const validateCouponCode = () => {
    const validCoupon = cupanCode.find(coupon => coupon.code === applycupanValue && coupon.vouchersStatus);
    if (validCoupon) {
      const discountAmount = (subtotal * validCoupon.discount) / 100;
      setDiscount(discountAmount);
      Swal.fire("Success", `Coupon applied! You saved ₹${discountAmount.toFixed(2)}.`, "success");
    } else {
      Swal.fire("Error", "Invalid or expired coupon code.", "error");
    }
  };

  const handleConfirmOrder = async (event) => {
    event.preventDefault();
    Swal.fire({
      title: 'Confirm Your Order',
      text: `For your pincode, the shipping charge is ₹${shipping}. Do you want to proceed with the order?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, Place Order',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#F37254',
      cancelButtonColor: '#d33',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const checkoutData = {
          userId: userId,
          products: cartItems,
          shippingAddress: {
            name: userData.name,
            email: userData.email,
          },
          paymentMethod,
          discount,
        };

        try {
          const res = await axios.post("https://api.panchgavyamrit.com/api/checkout", checkoutData);
          if (res.status === 201) {
            Swal.fire("Order Placed", "Your order has been placed successfully!", "success");
          }
        } catch (error) {
          Swal.fire("Error", "Error placing order. Please try again.", "error");
        }
      }
    });
  };

  return (
    <div>
      <h2>Checkout</h2>
      <div>
        <h4>Subtotal: ₹{subtotal.toFixed(2)}</h4>
        <h4>Shipping: ₹{shipping.toFixed(2)}</h4>
        <h4>Discount: ₹{discount.toFixed(2)}</h4>
        <h4>Total: ₹{total.toFixed(2)}</h4>
      </div>
      <div style={{ display: "flex" }}>
        <input
          type="text"
          name="applycupanValue"
          onChange={(e) => setApplycupanValue(e.target.value)}
          placeholder="Coupon Code"
        />{" "}
        &nbsp;
        <button className="add-to-cart" onClick={validateCouponCode}>Apply</button>
      </div>
      <button onClick={handleConfirmOrder}>Confirm Order</button>
    </div>
  );
};

export default Checkout;
