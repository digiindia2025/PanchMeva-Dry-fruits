import React, { useEffect } from "react";
import "./TermsConditions.css";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const TermsConditions = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  return (
    <>
      <Helmet>
        <title>Terms and Conditions</title>
        <meta
          name="description"
          content="Read the Terms and Conditions of using Goel Mewe Wala's platform, including policies on products, shipping, returns, and user conduct."
        />
      </Helmet>
      <section className="breadcrumb">
        <div className="breadcrumb-overlay">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-6 col-6">
                <Link
                  to="/"
                  className="back-icon text-decoration-none text-white d-flex align-items-center gap-2"
                >
                  <i className="bi bi-arrow-left"></i> Back to category
                </Link>
              </div>
              <div className="col-md-6 col-6 text-end">
                <div className="breadcrumb-nav text-white align-items-center d-flex justify-content-end gap-2">
                  <Link className="text-white" to="/">
                    <i className="bi bi-house"></i>
                  </Link>
                  /
                  <Link  className="text-white terms-link" to="/terms-conditions">
                    Terms and Conditions
                  </Link>
                </div>
              </div>
            </div>
            <h1 className="text-white mt-3">Terms and Conditions</h1>
            <p className="text-white mt-3 mb-0">Effective from [Date]</p>
          </div>
        </div>
      </section>
      <section className="terms-section">
        <h1 className="text-center">Terms & Conditions</h1>
        <div className="container">
          <div className="terms-content">
            <div>
              <h4>Introduction</h4>
            </div>
            <p>
              Welcome to Goel Mewe Wala! By accessing and using our website (the "Site") or purchasing products from us, you agree to be bound by the following terms and conditions ("Terms"). Please read them carefully.
            </p>

            <div>
              <h4>1. General</h4>
            </div>
            <p>
              This Site is owned and operated by Goel Mewe Wala ("we", "us", "our"). These Terms apply to all users of the Site, including without limitation users who are browsers, customers, and merchants.
            </p>

            <div>
              <h4>2. Products and Services</h4>
            </div>
            <p>
              We offer premium-quality dry fruits, nuts, and spices. All descriptions, images, and prices of products are subject to change at any time without notice. We reserve the right to discontinue any product at any time.
            </p>

            <div>
              <h4>3. Orders and Payment</h4>
            </div>
            <p>
              Orders can be placed through our website or other official communication channels (e.g., WhatsApp, phone). We accept payments via secure payment gateways (Credit/Debit Cards, UPI, Net Banking, etc.). Prices are listed in Indian Rupees (INR) and include applicable taxes unless stated otherwise.
            </p>

            <div>
              <h4>4. Shipping and Delivery</h4>
            </div>
            <p>
              We deliver across India via trusted courier partners. Estimated delivery time is 3-7 business days, depending on location. Delivery charges (if any) will be mentioned at checkout. Goel Mewe Wala is not responsible for delays caused by courier companies or unforeseen circumstances.
            </p>

            <div>
              <h4>5. Return, Replacement, and Refund Policy</h4>
            </div>
            <p>
              Due to the perishable nature of dry fruits, nuts, and spices, we do not accept returns once the product is delivered. However, if you receive a wrong, damaged, or defective product, please inform us within 48 hours of delivery. Eligible cases will be replaced or refunded based on inspection. To raise an issue, please contact us at [Your Email/Phone Number] with supporting pictures and order details.
            </p>

            <div>
              <h4>6. Cancellations</h4>
            </div>
            <p>
              Orders can only be cancelled before dispatch. Once the order is shipped, cancellations will not be accepted. Cancellation refunds (if applicable) will be processed within 7-10 business days.
            </p>

            <div>
              <h4>7. Intellectual Property</h4>
            </div>
            <p>
              All content on this Site — including logos, text, images, graphics, and product descriptions — is the property of Goel Mewe Wala and protected under copyright laws. You may not use, reproduce, or distribute our content without written permission.
            </p>

            <div>
              <h4>8. Limitation of Liability</h4>
            </div>
            <p>
              We strive to provide accurate information and high-quality products; however, we do not guarantee that the Site will be error-free or uninterrupted. In no case shall Goel Mewe Wala be liable for any loss or damage arising from your use of our products or services.
            </p>

            <div>
              <h4>9. Privacy Policy</h4>
            </div>
            <p>
              Your personal information is handled according to our Privacy Policy. We respect your privacy and do not sell or share your data with third parties without consent.
            </p>

            <div>
              <h4>10. Changes to Terms</h4>
            </div>
            <p>
              We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting on the website. It is your responsibility to review these Terms periodically.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default TermsConditions;
