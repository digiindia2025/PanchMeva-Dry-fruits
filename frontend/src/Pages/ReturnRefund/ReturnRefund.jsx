import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import "./ReturnRefund.css";

const ReturnRefund = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <>
      <Helmet>
        <title>Return & Refund Policy - panchgavya.amrit</title>
        <meta
          name="description"
          content="Learn about our return and refund policy, including eligibility criteria, timelines, and the process for returns and refunds. Customer satisfaction is our priority."
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
                <div className="breadcrumb-nav text-white d-flex justify-content-end gap-2">
                  <Link className="text-white" to="/">
                    <i className="bi bi-house"></i>
                  </Link>
                  /
                  <Link className="text-white terms-link" to="/return-refund">
                    Return & Refund Policy
                  </Link>
                </div>
              </div>
            </div>
            <h1 className="text-white mt-3">Return & Refund Policy</h1>
          </div>
        </div>
      </section>

      <section className="return-refund-section">
        <div className="container">
          <h1>Return & Refund Policy</h1>
          <div className="section-intro">
            <p>
              At <strong>panchgavya.amrit</strong>, we are committed to
              providing high-quality products and services. If you're not
              satisfied with your purchase, we're here to help. Here's our
              detailed Return & Refund Policy.
            </p>
          </div>

          <div className="policy-section">
            <h2>
              <i className="bi bi-check-circle-fill text-success"></i> Eligibility for Returns
            </h2>
            <ul>
              <li>The item must be unused and in the same condition you received it.</li>
              <li>The item must be in its original packaging.</li>
              <li>A receipt or proof of purchase is required.</li>
              <li>Returns must be initiated within 30 days of purchase.</li>
            </ul>
          </div>

          <div className="policy-section">
            <h2>
              <i className="bi bi-x-circle-fill text-danger"></i> Non-Returnable Items
            </h2>
            <ul>
              <li>Gift cards.</li>
              <li>Perishable goods (e.g., food, flowers).</li>
              <li>Personalized or custom-made items.</li>
              <li>Health and hygiene products (e.g., cosmetics, undergarments).</li>
            </ul>
          </div>

          <div className="policy-section">
            <h2>
              <i className="bi bi-credit-card-fill"></i> Refund Process
            </h2>
            <p>Refunds will:</p>
            <ul>
              <li>Be credited to your original payment method.</li>
              <li>Be processed within 7-10 business days.</li>
            </ul>
          </div>

          <div className="policy-section">
            <h2>
              <i className="bi bi-truck"></i> Return Shipping
            </h2>
            <p>Customers are responsible for return shipping costs. Shipping costs are non-refundable. Use a trackable shipping method to ensure safe return of your item.</p>
          </div>

          <div className="policy-section">
            <h2>
              <i className="bi bi-envelope-fill"></i> How to Initiate a Return
            </h2>
            <p>
              To start a return, contact us at:
              <a href="mailto:goelmewewale@gmail.com" className="highlight">
                {" "}
                goelmewewale@gmail.com
              </a>
              with:
            </p>
            <ul>
              <li>Your order number.</li>
              <li>Reason for the return.</li>
              <li>Pictures of the item (if applicable).</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="footer-text m-0">
        <div className="container text-center">
          <p>
            By making a purchase on our website, you agree to the terms of our
            Return & Refund Policy.
          </p>
        </div>
      </section>
    </>
  );
};

export default ReturnRefund;
