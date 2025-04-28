import React, { useEffect } from "react";
import "./PrivacyPolicy.css";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <>
      <Helmet>
        <title>Privacy & Policy - Goel Mewe Wala</title>
        <meta
          name="description"
          content="Learn how Goel Mewe Wala collects, uses, and protects your personal information. Your privacy and trust are important to us."
        />
      </Helmet>

      <section className="breadcrumb">
        <div className="breadcrumb-overlay">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-6 col-6">
                <Link to="/" className="back-icon text-decoration-none text-white d-flex align-items-center gap-2">
                  <i className="bi bi-arrow-left"></i> Back to category
                </Link>
              </div>
              <div className="col-md-6 col-6 text-end">
                <div className="breadcrumb-nav text-white d-flex justify-content-end gap-2">
                  <Link className="text-white" to="/">
                    <i className="bi bi-house"></i>
                  </Link>{" "}
                  /
                  <Link className="text-white terms-link" to="/privacy-policy">
                    Privacy & Policy
                  </Link>
                </div>
              </div>
            </div>
            <h1 className="text-white mt-3">Privacy & Policy</h1>
          </div>
        </div>
      </section>

      <section className="privacy-policy-section">
        <div className="container">
          <h1>Privacy & Policy</h1>
          <p>Goel Mewe Wala is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and protect your personal information when you use our website, place an order, or engage with our services.</p>

          <h2>1. Information We Collect</h2>
          <p>We collect the following types of information to enhance your shopping experience:</p>
          <ul>
            <li><strong>Personal Information:</strong> Name, email address, phone number, shipping address, and payment information (credit/debit card details, UPI details, etc.).</li>
            <li><strong>Non-Personal Information:</strong> IP address, browser type, operating system, and browsing activity (pages you visit, products you view, etc.).</li>
            <li><strong>Cookies:</strong> We may use cookies to personalize your experience on our site.</li>
          </ul>

          <h2>2. How We Use Your Information</h2>
          <ul>
            <li>To process your orders and deliver the products you purchase.</li>
            <li>To send you order confirmations, updates, and other transactional information.</li>
            <li>To send promotional emails, special offers, and newsletters (opt-out available).</li>
            <li>To improve our website functionality and ensure a better user experience.</li>
            <li>To protect your personal information and prevent fraud.</li>
          </ul>

          <h2>3. How We Protect Your Information</h2>
          <p>We use industry-standard encryption protocols (SSL) to secure your data. We do not store sensitive payment details after transactions are completed.</p>

          <h2>4. Sharing Your Information</h2>
          <ul>
            <li>We do not sell or rent your personal information to third parties.</li>
            <li>We may share your data with trusted third parties (e.g., shipping companies) to fulfill your order.</li>
            <li>We may share information if required by law or to protect our rights and safety.</li>
          </ul>

          <h2>5. Your Rights</h2>
          <ul>
            <li>You can access, update, or delete your personal data.</li>
            <li>You can opt-out of marketing communications at any time.</li>
            <li>To exercise your rights, contact us:</li>
          </ul>
          <p>
            <strong>Email:</strong> <a href="mailto:info@goelmewewala.com" className="highlight">info@goelmewewala.com</a><br />
            <strong>Phone:</strong> +91-9876543210
          </p>

          <h2>6. Changes to Privacy Policy</h2>
          <p>We may update our Privacy Policy occasionally. Changes will be posted here with a revised date. Please check regularly.</p>

          <h2>7. Contact Us</h2>
          <p>
            <strong>Email:</strong> <a href="goelmewewale@gmail.com" className="highlight">info@goelmewewala.com</a><br />
            <strong>Phone:</strong> +91-9953843002<br />
            <strong>Address:</strong> Shop.141 Sec 24, Pocket 11  Rohini  Delhi.
          </p>

          <hr className="my-5" />

          
        </div>
      </section>

      
    </>
  );
};

export default PrivacyPolicy;
