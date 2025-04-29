import React, { useEffect, useState } from "react";
import "./header.css";
import logo from "../../images/Logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


const Header = ({refs, setRef}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [search, setSearch] = useState(false);
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const [cartLength, setCartLength] = useState(0);
  var cart = useSelector(state => state.mycart)

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchQuery = params.get("search") || "";
    setSearchTerm(searchQuery);
  }, [location.search]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const searchbarToggle = () => {
    setSearch(!search);
  };
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.trim()) {
      navigate(`/all-products?search=${encodeURIComponent(value)}`);
    } else {
      navigate(`/all-products`);
    }
  };

  useEffect(() => {
    const cartLength = sessionStorage.getItem("VesLakshna");
    console.log("cartLength:= ", JSON.parse(cartLength)?.length)
    setCartLength(JSON.parse(cartLength)?.length)
  }, [sessionStorage.getItem("VesLakshna"), refs]);

  const loginValue = sessionStorage.getItem("Login");

  const logOut = () => {
    sessionStorage.clear();
    window.location.href = "/login";
  };
  return (
    <>
      {/* Top Header Section */}
      <section className="headerTop">
        <div className="container">
          <div className="row desktopHeaderTop align-items-center">
            <div className="col-md-3">
              <div className="top-header-main">
                <ul className="list-unstyled d-flex gap-3">
                  <li>
                    <Link to="/about-us" aria-label="About">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact-us" aria-label="Contact">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-6 text-center">
              <marquee
                behavior="smooth"
                style={{ color: "var(--themeColor)" }}
                direction=""
              >
                श्री गोधाम महातीर्थ पथमेड़ा गोशाला का अधिकृत ऑनलाइन स्टोर
                (पथमेड़ा गोशाला के गौ उत्पाद केवल वेदलक्षणा ब्रांड नाम से ही
                उपलब्ध हैं। अन्य किसी नाम से गोशाला का संबंध नहीं है।)
              </marquee>
            </div>
            <div className="col-md-3 text-end">
              <div className="top-header-search">
                <p onClick={searchbarToggle} style={{ cursor: "pointer" }}>
                  <i className="bi bi-search" aria-hidden="true"></i> Search
                </p>
                {loginValue ? (
                  <button
                    onClick={() => navigate("/profile")}
                    className="btn btn-primary"
                  >
                    <i className="bi bi-person" aria-hidden="true"></i> Profile
                  </button>
                ) : (
                  <button
                    onClick={() => navigate("/register")}
                    className="btn btn-primary"
                  >
                    <i className="bi bi-person" aria-hidden="true"></i> Register
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Responsive Top Header */}
          <div className="row responsiveHeaderTop">
            <div className="col-8 p-0">
              <input
                type="text"
                placeholder="Search Products..."
                value={searchTerm}
                onChange={handleSearchChange}
                aria-label="Search"
              />
            </div>
            <div className="col-4 p-0 text-end">
              <div className="top-header-search">
                {loginValue ? (<button className="btn btn-primary" onClick={() => navigate("/profile")}>
                  <i className="bi bi-person" aria-hidden="true"></i> Profile
                </button>) : <button className="btn btn-primary" onClick={() => navigate("/register")}>
                  <i className="bi bi-person" aria-hidden="true"></i> Register
                </button>}
              </div>
            </div>
          </div>

          {search ? (
            <div className="global-search">
              <input
                type="search"
                placeholder="Search Products..."
                name="search-global"
                id=""
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
          ) : null}
        </div>
      </section>

      {/* Main Header */}
      <header className="main-header">
        <div className="container">
          <div className="row align-items-center header-row">
            <div className="col-md-2 col-6">
              <Link to={"/"}>
                <img
                  style={{ objectFit: "cover" }}
                  src={logo}
                  className="logo"
                  alt=""
                />
              </Link>
            </div>
            <div className="col-md-6 d-none d-md-block">
              <nav className="header-main">
                <ul className="d-flex list-unstyled gap-3">
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/all-categories">Our Categories</Link>
                  </li>
                  <li>
                    <Link to="/all-products">All Product</Link>
                  </li>
                  <li>
                    <Link to="/contact-us">Contact Us</Link>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="col-md-4 col-6 text-end">
              {/* Toggle Sidebar Button */}
              <div>

                <Link className="d-md-none toggleButton position-relative" to={"/cart"}>
                  <i className="bi bi-cart"></i>
                  {cartLength > 0 && (
                    <span className="absolute top-0 start-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-teal-300 to-indigo-400 text-black text-xs px-2 py-1 shadow-md" style={{
                      background: 'linear-gradient(to bottom right,#f58634,rgb(235, 107, 15))', // Gradient from teal to indigo
                      color: 'white',
                      borderRadius:"33px",
                      fontSize:"12px"
                    }}>
                      {cartLength}
                    </span>
                  )}
                </Link>

                <button
                  className="d-md-none toggleButton"
                  onClick={toggleSidebar}
                  aria-label="Toggle Navigation"
                >
                  <i className="bi bi-list"></i>
                </button>

              </div>
              <div className="header-card-option d-none d-md-flex">
                <div>
                  <p className="mb-0">Call and make an appointment</p>
                  <h3>
                    <Link
                      style={{
                        color: "var(--themeColor)",
                        textDecoration: "none",
                      }}
                      to="tel:+91 9953843002"
                      aria-label="Call us"
                    >
                      +91 9953843002
                    </Link>
                  </h3>
                </div>
                <button
                  onClick={() => navigate("/cart")}
                  className="btn btn-success position-relative"
                >
                  <i className="bi bi-cart"></i>
                  {cartLength > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill text-white font-bold text-2xl px-9 py-6" style={{backgroundColor:"#f58634", fontSize:"14px"}}>
                      {cartLength}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar Navigation */}
      <aside
        className={`sidebar ${sidebarOpen ? "open" : ""}`}
        aria-hidden={!sidebarOpen}
      >
        <div className="sidebarCloseBtn">
          <button
            className="close-btn"
            onClick={toggleSidebar}
            aria-label="Close Sidebar"
          >
            &times;
          </button>
        </div>
        <ul className="list-unstyled">
          <li onClick={toggleSidebar}>
            <Link to="/"><i class="bi bi-house-door-fill"></i> Home</Link>
          </li>
          <li onClick={toggleSidebar}>
            <Link to="/about-us"><i class="bi bi-people-fill"></i> About Us</Link>
          </li>
          <li onClick={toggleSidebar}>
            <Link to="/contact-us"><i class="bi bi-telephone-fill"></i> Contact Us</Link>
          </li>
          <li onClick={toggleSidebar}>
            <Link to="/all-categories"><i class="bi bi-columns-gap"></i> Categories</Link>
          </li>
          <li onClick={toggleSidebar}>
            <Link to="/all-products"><i class="bi bi-box-seam"></i> Products</Link>
          </li>
          <li onClick={toggleSidebar}>
            <Link to="/cart"><i class="bi bi-cart-fill"></i> Cart</Link>
          </li>
          {
            loginValue ? <>
              <li onClick={toggleSidebar}>
                <button onClick={logOut} className="btn btn-primary"><i class="bi bi-person-plus-fill"></i> Log Out</button>
              </li>
            </> : <>
              <li onClick={toggleSidebar}>
                <Link to="/register"><i class="bi bi-person-plus-fill"></i> Register</Link>
              </li>
              <li onClick={toggleSidebar}>
                <Link to="/login"><i class="bi bi-box-arrow-in-right"></i> Login</Link>
              </li>
            </>
          }
        </ul>
      </aside>
    </>
  );
};

export default Header;
