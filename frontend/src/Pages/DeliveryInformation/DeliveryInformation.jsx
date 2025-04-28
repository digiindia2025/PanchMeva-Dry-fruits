import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import './delivery.css'
import { Helmet } from "react-helmet";
const DeliveryInformation = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);
  return (
    <>
     <Helmet>
        <title>Delivery Information | वेद लक्षणा</title> {/* Page title */}
        <meta
          name="description"
          content="Find all the details about our delivery process, timelines, shipping charges, and delivery areas at वेद लक्षणा. Get timely and efficient delivery of your orders."
        />
        <meta name="keywords" content="delivery information, shipping charges, delivery process, shipping policy, वेद लक्षणा" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://panchgavyamrit.com/delivery-information" />
      </Helmet>
      <section class="breadcrumb">
        <div class="breadcrumb-overlay">
          <div class="container">
            <div class="row align-items-center">
              <div class="col-md-6 col-6">
                <Link
                  to="/"
                  class="back-icon text-decoration-none text-white d-flex align-items-center gap-2"
                >
                  <i class="bi bi-arrow-left"></i> Back to category
                </Link>
              </div>
              <div class="col-md-6 col-6 text-end">
                <div class="breadcrumb-nav text-white align-items-center d-flex justify-content-end gap-2">
                  <Link class="text-white" to="/">
                    <i class="bi bi-house"></i>
                  </Link>
                  /
                  <Link class="text-white terms-link" to="/delivery-information">
                    Delivery Information
                  </Link>
                </div>
              </div>
            </div>
            <h1 class="text-white mt-3">Delivery Information</h1>
          </div>
        </div>
      </section>

      <section class="delivery-section">
        <div class="container">
          <h1>Delivery Information</h1>
          <p>
            At वेदलक्षणा , we take pride in delivering your orders in a
            timely and efficient manner. Below you will find all the essential
            details about our delivery process and policies.
          </p>

          <h2>1. Delivery Timelines</h2>
          <p>
            We strive to deliver all orders as quickly as possible. Here is an
            estimate of our delivery timelines:
          </p>
          <ul>
            <li>
              <strong>Standard Shipping:</strong> 5-7 business days.
            </li>
            <li>
              <strong>Express Shipping:</strong> 2-3 business days.
            </li>
            <li>
              <strong>International Shipping:</strong> 7-14 business days,
              depending on location.
            </li>
          </ul>

          <h2>2. Shipping Charges</h2>
          <p>
            Shipping costs are calculated based on the destination and the
            weight of your order. You can view the total shipping cost during
            checkout. We offer:
          </p>
          <ul>
            <li>Free standard shipping on orders over [insert amount].</li>
            <li>Flat-rate express shipping fee of [insert amount].</li>
            <li>International shipping fees vary based on the destination.</li>
          </ul>

          <h2>3. Delivery Areas</h2>
          <p>
            We deliver to most areas within [Country]. However, there are some
            remote locations where we may not be able to deliver. Please refer
            to the delivery address input during checkout for availability. We
            deliver to the following regions:
          </p>
          <ul>
            <li>Urban Areas</li>
            <li>Suburban Areas</li>
            <li>Rural Areas</li>
            <li>International Locations (subject to availability)</li>
          </ul>

          <h2>4. Delivery Problems & Returns</h2>
          <p>
            If there are any issues with your delivery, such as delays or
            damaged goods, please contact our customer support team at &nbsp;
            <Link to="mailto:support@example.com" class="highlight">
              support@example.com
            </Link>
            &nbsp; We offer hassle-free returns and exchanges within [insert number]
            days of receiving your order.
          </p>

          <Link to="/contact-us" class="cta-btn">
            Contact Us for Assistance
          </Link>
        </div>
      </section>

      <section class="footer-text">
        <div class="container text-center">
          <p>
            If you have any other questions about delivery, feel free to check
            out our &nbsp;
            <Link to="/faq" class="highlight">
              FAQ page
            </Link>
            &nbsp;
            or reach out to us.
          </p>
        </div>
      </section>
    </>
  );
};

export default DeliveryInformation;
