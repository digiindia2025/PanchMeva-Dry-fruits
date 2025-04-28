import React, { useEffect } from "react";
import "./PrivacyPolicy.css";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
const PrivacyPolicy = () => {
  useEffect(()=>{
    window.scrollTo({
      top:0,
    })
  },[])
  return (
    <>
    <Helmet>
        <title>Privacy & Policy - Panchgavyamrit</title>
        <meta
          name="description"
          content="Learn about our privacy policy and how we collect, use, and protect your personal data. Your privacy is important to us."
        />
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
                <div class="breadcrumb-nav text-white d-flex justify-content-end gap-2">
                  <Link class="text-white" to="/">
                    <i class="bi bi-house"></i>
                  </Link>{" "}
                  /
                  <Link class="text-white terms-link" to="/privacy-policy">
                    Privacy & Policy
                  </Link>
                </div>
              </div>
            </div>
            <h1 class="text-white mt-3">Privacy & Policy</h1>
          </div>
        </div>
      </section>

      <section class="privacy-policy-section">
        <div class="container">
          <h1>Privacy & Policy</h1>
          <p>
            At [Your Company Name], we respect your privacy and are committed to
            protecting your personal information. This Privacy & Policy page
            outlines how we collect, use, and protect your data. By using our
            services, you agree to the terms outlined below.
          </p>

          <h2>1. Information We Collect</h2>
          <p>
            We collect the following types of information to provide and improve
            our services:
          </p>
          <ul>
            <li>
              <strong>Personal Identification Information:</strong> Name, email
              address, phone number, etc.
            </li>
            <li>
              <strong>Non-Personal Identification Information:</strong> Browser
              type, device type, IP address, etc.
            </li>
            <li>
              <strong>Payment Information:</strong> Billing address and payment
              details, when applicable.
            </li>
            <li>
              <strong>Cookies:</strong> We use cookies to enhance your user
              experience and analyze usage data.
            </li>
          </ul>

          <h2>2. How We Use Your Information</h2>
          <p>We use the information we collect for the following purposes:</p>
          <ul>
            <li>To provide, maintain, and improve our services.</li>
            <li>To process transactions and manage your orders.</li>
            <li>
              To communicate with you regarding updates, promotions, and
              customer service inquiries.
            </li>
            <li>To comply with legal requirements and resolve disputes.</li>
          </ul>

          <h2>3. Data Sharing and Disclosure</h2>
          <p>
            We will not sell, rent, or trade your personal information to third
            parties. However, we may share your information with trusted
            partners and service providers for the following reasons:
          </p>
          <ul>
            <li>To process payments or provide services.</li>
            <li>For analytics, marketing, and promotional purposes.</li>
            <li>To comply with legal obligations or protect our rights.</li>
          </ul>

          <h2>4. Data Security</h2>
          <p>
            We take the security of your personal data seriously and implement a
            variety of security measures to protect your information from
            unauthorized access, alteration, or disclosure. However, please note
            that no method of data transmission over the internet is 100%
            secure.
          </p>

          <h2>5. Cookies</h2>
          <p>
            We use cookies to enhance your browsing experience, personalize
            content, and analyze website traffic. You can control the use of
            cookies through your browser settings. Please note that disabling
            cookies may affect some features of the website.
          </p>

          <h2>6. Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access, update, or delete your personal information.</li>
            <li>Object to or restrict certain uses of your data.</li>
            <li>Request the transfer of your data to another service.</li>
            <li>
              Withdraw your consent for the use of your data at any time (for
              certain data usage purposes).
            </li>
          </ul>
          <p>
            If you would like to exercise any of these rights, please contact us
            at{" "}
            <a href="mailto:support@example.com" class="highlight">
              support@example.com
            </a>
            .
          </p>

          <h2>7. Third-Party Links</h2>
          <p>
            Our website may contain links to third-party websites or services.
            These sites have their own privacy policies, which we encourage you
            to review. We are not responsible for the content or practices of
            any third-party websites.
          </p>

          <h2>8. Changes to This Policy</h2>
          <p>
            We may update this Privacy & Policy from time to time. Any changes
            will be posted on this page with an updated "last revised" date.
            Please review this page periodically to stay informed about how we
            protect your information.
          </p>

          <h2>9. Contact Us</h2>
          <p>
            If you have any questions or concerns about our privacy policy or
            data practices, please contact us at:
          </p>
          <p>
            <strong>Email:</strong>{" "}
            <a href="mailto:support@example.com" class="highlight">
              support@example.com
            </a>
          </p>
        </div>
      </section>

      <section class="footer-text">
        <div class="container text-center">
          <p>
            By using our services, you acknowledge that you have read and
            understood our Privacy & Policy.
          </p>
        </div>
      </section>
    </>
  );
};

export default PrivacyPolicy;
