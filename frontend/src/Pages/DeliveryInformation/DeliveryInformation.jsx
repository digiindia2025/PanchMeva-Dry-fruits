import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./delivery.css";
import { Helmet } from "react-helmet";

const DeliveryInformation = () => {
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <>
      <Helmet>
        <title>Shipping Policy | Goel Mewe Wala</title>
        <meta
          name="description"
          content="Learn about Goel Mewe Wala's shipping process, delivery areas, estimated delivery times, and shipping charges. We ensure fast and secure delivery of your dry fruits, nuts, and spices."
        />
        <meta name="keywords" content="shipping policy, delivery information, Goel Mewe Wala, shipping charges, order delivery" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://yourwebsite.com/delivery-information" />
      </Helmet>

      <section className="breadcrumb">
        <div className="breadcrumb-overlay">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-6 col-6">
                <Link to="/" className="back-icon text-decoration-none text-white d-flex align-items-center gap-2">
                  <i className="bi bi-arrow-left"></i> Back to Home
                </Link>
              </div>
              <div className="col-md-6 col-6 text-end">
                <div className="breadcrumb-nav text-white align-items-center d-flex justify-content-end gap-2">
                  <Link className="text-white" to="/">
                    <i className="bi bi-house"></i>
                  </Link>
                  /
                  <Link className="text-white terms-link" to="/delivery-information">
                    Shipping Policy
                  </Link>
                </div>
              </div>
            </div>
            <h1 className="text-white mt-3">Shipping Policy</h1>
          </div>
        </div>
      </section>

      <section className="delivery-section">
        <div className="container">
          <h1>Shipping Policy</h1>
          <p>Thank you for shopping at Goel Mewe Wala! We are committed to providing you with the best shopping experience, including fast and reliable shipping of your orders.</p>

          <h2>1. Order Processing Time</h2>
          <ul>
            <li>Orders are processed within 1-2 business days.</li>
            <li>Orders placed on weekends or public holidays are processed on the next business day.</li>
          </ul>

          <h2>2. Shipping Areas and Delivery</h2>
          <ul>
            <li>We deliver across India, including major cities and rural areas.</li>
            <li>Currently, we do not offer international shipping, but it may be available in the future.</li>
            <li>Shipping is available to all regions across Delhi NCR and other states.</li>
          </ul>

          <h2>3. Delivery Time</h2>
          <ul>
            <li>Standard delivery time: 3 to 7 business days (location dependent).</li>
            <li>Delivery times may vary due to weather, location, or unforeseen circumstances. We will notify you of significant delays.</li>
          </ul>

          <h2>4. Shipping Charges</h2>
          <ul>
            <li>Shipping charges are calculated at checkout based on order weight and delivery location.</li>
            <li>Orders above ₹999 (for example) are eligible for free shipping. (You can adjust amount later.)</li>
          </ul>

          <h2>5. Courier Partners</h2>
          <p>We work with trusted courier services like DTDC, Blue Dart, Delhivery, and others for reliable delivery.</p>

          <h2>6. Order Tracking</h2>
          <p>Once your order is shipped, you will receive an email or SMS with a tracking number. You can track your order on the respective courier’s website.</p>

          <h2>7. Packaging</h2>
          <p>We use secure, eco-friendly packaging to ensure the quality and safety of our dry fruits, nuts, and spices during transit.</p>

          <h2>8. Missing or Lost Shipments</h2>
          <p>If your shipment is missing or lost, contact us within 7 days of the expected delivery date. We will coordinate with our courier partners to resolve the issue.</p>

          <h2>9. Address Accuracy</h2>
          <p>
            Please ensure the shipping address provided is correct and complete. Goel Mewe Wala is not responsible for delivery issues arising from incorrect addresses. 
            If the package is returned, additional shipping fees may apply for re-delivery.
          </p>

          <h2>10. Special Requests</h2>
          <p>If you have any special shipping requests or need assistance with bulk orders, please contact us. We’ll do our best to assist you.</p>

          <h2>11. Contact Us</h2>
          <p>
            📞 Phone: +91-9953843002 <br />
            📧 Email: goelmewewale@gmail.com <br />
            📍 Shop.141 Sec 24, Pocket 11  Rohini  Delhi.
          </p>

          <Link to="/contact-us" className="cta-btn">
            Contact Us for Assistance
          </Link>
        </div>
      </section>

      <section className="footer-text">
        <div className="container text-center">
          <p>
            For additional questions about shipping, check our &nbsp;
            <Link to="/faq" className="highlight">
              FAQ page
            </Link>
            &nbsp; or reach out to us.
          </p>
        </div>
      </section>
    </>
  );
};

export default DeliveryInformation;
