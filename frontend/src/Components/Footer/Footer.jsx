import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import logo from "../../images/Logo.png";
const Footer = () => {
  const socialLinks = [
    { platform: "YouTube", icon: "bi-youtube", color: "#FF0000" },
    { platform: "WhatsApp", icon: "bi-whatsapp", color: "#25D366" },
    {
      platform: "Instagram",
      icon: "bi-instagram",
      color: "linear-gradient(to right, #833ab4, #fd1d1d, #fcb045)",
    },
    { platform: "Twitter", icon: "bi-twitter", color: "#1DA1F2" },
  ];

  return (
    <section className="footer-container">
      <footer className="container">
        {/* Footer Main Section */}
        <div className="footer-main">
          {/* Company Info */}
          <div className="footer-section">
            {/* <h4>About Us</h4> */}
            <div>
              <img className="w-50 mb-3" src={logo} alt="" />
            </div>
            <p>
              Discover the best deals and quality products at our store. We
              bring premium e-commerce services to your fingertips.
            </p>
            <p>We're open 7 days a week Enquiries Timing: 8 AM to 8 PM</p>
          </div>

          {/* Shop Links */}
          <div className="footer-section">
            <h4>Shop</h4>
            <ul>
              <li>
                <Link to="/about-us">About Us</Link>
              </li>
              <li>
                <Link to="/faq">FAQ</Link>
              </li>
              <li>
                <Link to="/term-&-conditions">Terms & Conditions</Link>
              </li>
              <li>
                <Link to="/delivery-information">Delivery Information</Link>
              </li>
              <li>
                <Link to="/privacy-policy">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/return-refund">Return & Refund Policy</Link>
              </li>
            </ul>
          </div>

          {/* Customer Links */}
          <div className="footer-section">
            <h4>Account</h4>
            <ul>
              <li>
                <Link to={"/register"}> Register </Link>
              </li>
              <li>
                <Link to={"/login"}> Login </Link>
              </li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div className="footer-section">
            <h4>Follow Us</h4>
            <div className="social-icons">
              {socialLinks.map(({ platform, icon, color }, index) => (
                <Link
                  key={index}
                  title={platform}
                  style={{ background: color }}
                >
                  <i className={`bi ${icon}`}></i>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="footer-bottom">
          <p>
            &copy; 2025 Shri Surabhi Vedlakshna Panchgavyamrit Kendra. All Rights Reserved. | Designed & Powered by{" "}
            <a
              href="https://digiindiasolutions.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#F58634", textDecoration: "none" }}
            >
              Digi India Solutions
            </a>
          </p>
        </div>
      </footer>
    </section>
  );
};

export default Footer;
