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
          content="Read the Terms and Conditions of using Shri Godham Mahatirtha Anandavan Pathmeda's platform, including policies on donations, content ownership, and user conduct."
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
              Welcome to Shri Godham Mahatirtha Anandavan Pathmeda. These Terms
              and Conditions outline the rules and regulations for using our
              platform and services, including Goseva-related activities and
              projects. By accessing our website and using our services, you
              agree to abide by these terms. Please read them carefully.
            </p>

            <div>
              <h4>Acceptance of Terms</h4>
            </div>
            <p>
              By visiting, registering, or using our platform in any way, you
              agree to be bound by these Terms and Conditions, as well as any
              additional terms that may be applicable to specific services or
              features we provide.
            </p>

            <div>
              <h4>Purpose of the Platform</h4>
            </div>
            <p>
              Our platform is dedicated to the protection, preservation, and
              service of Gomata (sacred cows), as well as promoting awareness of
              the Goseva movement. We offer various charitable and social
              services through our organization and ask for your support in this
              noble cause.
            </p>

            <div>
              <h4>Use of Our Services</h4>
            </div>
            <p>
              You may use our services for lawful purposes only and in
              accordance with the mission of our organization. Any use of the
              platform that contradicts our principles, including harming
              animals or promoting harmful practices, is strictly prohibited.
              This includes using our platform for illegal or unethical
              activities.
            </p>

            <div>
              <h4>Donations and Contributions</h4>
            </div>
            <p>
              Donations and contributions made to our platform are voluntary and
              will be used solely for the purpose of supporting the welfare of
              Gomata and continuing the Goseva projects. You acknowledge that
              all donations are non-refundable and are made with the
              understanding of the project’s goals and intended use.
            </p>

            <div>
              <h4>Content Ownership</h4>
            </div>
            <p>
              The content on this website, including text, images, and media, is
              the property of Shri Godham Mahatirtha Anandavan Pathmeda. You are
              granted a limited, non-exclusive license to access and use the
              site for personal or charitable purposes, but you may not
              reproduce, distribute, or display any part of the content without
              prior written permission.
            </p>

            <div>
              <h4>User Conduct</h4>
            </div>
            <p>
              Users must not engage in conduct that:
              <ul>
                <li>Violates any local, national, or international laws.</li>
                <li>Damages, disables, or overburdens our platform.</li>
                <li>
                  Interferes with or disrupts the functionality of the website
                  or services.
                </li>
                <li>
                  Promotes violence, hatred, or discrimination against any group
                  or individual.
                </li>
                <li>
                  Uses the platform for commercial purposes without
                  authorization.
                </li>
              </ul>
            </p>

            <div>
              <h4>Liability and Indemnification</h4>
            </div>
            <p>
              Shri Godham Mahatirtha Anandavan Pathmeda is not liable for any
              damages arising from the use of the platform, including but not
              limited to indirect, incidental, or consequential damages. By
              using our platform, you agree to indemnify and hold harmless the
              organization and its affiliates from any claims or damages arising
              from your actions.
            </p>

            <div>
              <h4>Privacy and Data Protection</h4>
            </div>
            <p>
              We respect your privacy and are committed to protecting your
              personal information. Please review our Privacy Policy for details
              on how we collect, use, and protect your data while using our
              platform.
            </p>

            <div>
              <h4>Modifications to Terms</h4>
            </div>
            <p>
              We reserve the right to modify or update these Terms and
              Conditions at any time. Any changes will be communicated through
              the platform, and your continued use of the services signifies
              your acceptance of those changes.
            </p>

            <div>
              <h4>Governing Law</h4>
            </div>
            <p>
              These Terms and Conditions shall be governed by and construed in
              accordance with the laws of India. Any disputes arising from the
              use of this platform will be subject to the jurisdiction of the
              courts located in [Location].
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default TermsConditions;
