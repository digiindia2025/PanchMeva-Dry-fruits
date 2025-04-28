import React, { useEffect, useState } from "react";
import "./register.css";
import men from "../../images/men.gif";
import mail from "../../images/email-register.gif";
import password from "../../images/password.gif";
import repeatPassword from "../../images/repeat-password.gif";
import signup from "../../images/signup.gif";
import login from "../../images/login.gif";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import axios from "axios";
import Swal from "sweetalert2";

const Register = () => {
  const navigate = useNavigate();
  const [cPass, setCpass] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const getinputData = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const postData = async (e) => {
    e.preventDefault();

    try {
      if (data.password === cPass) {
        const res = await axios.post(
          "http://localhost:8000/api/signup",
          data
        );
        if (res.status === 201) {
          Swal.fire({
            icon: "success",
            title: "Registration Successful!",
            text: "You have successfully registered.",
          });
          navigate("/login");
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Registration Failed!",
          text: "Passwords do not match. Please try again.",
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Registration Failed!",
        text:
          error.response?.data?.message ||
          "There was an issue with your registration. Please try again.",
      });
    }
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  return (
    <>
      <Helmet>
        <title>Register - Create an Account</title>
        <meta
          name="description"
          content="Sign up to create an account and access all the features. Enter your details and join our platform to start exploring."
        />
      </Helmet>
      <section className="register">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <div className="registerForm">
                <h2>
                  <b>Sign Up</b>
                </h2>
                <form onSubmit={postData}>
                  <div className="register-field">
                    <img src={men} alt="Name Icon" />
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      onChange={getinputData}
                    />
                  </div>
                  <div className="register-field">
                    <img src={mail} alt="Email Icon" />
                    <input
                      type="text"
                      name="email"
                      placeholder="Your Email"
                      onChange={getinputData}
                    />
                  </div>
                  <div className="register-field password-field">
                    <img src={password} alt="Password Icon" />
                    <input
                      type={showPassword ? "text" : "password"} // Toggle between text and password
                      name="password"
                      placeholder="Password"
                      onChange={getinputData}
                    />
                    <span
                      className="password-toggle-icon"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <i class="bi bi-eye"></i>
                      ) : (
                        <i class="bi bi-eye-slash-fill"></i>
                      )}{" "}
                      {/* Icons for hide/show */}
                    </span>
                  </div>
                  <div className="register-field">
                    <img src={repeatPassword} alt="Repeat Password Icon" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="repeat-password"
                      placeholder="Repeat Password"
                      onChange={(e) => setCpass(e.target.value)}
                    />
                    <span
                      className="password-toggle-icon"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <i class="bi bi-eye"></i>
                      ) : (
                        <i class="bi bi-eye-slash-fill"></i>
                      )}{" "}
                      {/* Icons for hide/show */}
                    </span>
                  </div>
                  {/* <div className="terms">
                    <input type="checkbox" name="terms" />
                    <label>I agree to all statements in Terms of service</label>
                  </div> */}
                  <div className="register-button">
                    <button type="submit">Register</button>
                  </div>
                </form>
                <div className="already-login">
                  <img src={login} alt="Login Icon" />
                  <p>
                    <Link to="/login">I am already a member</Link>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 register_responsive text-center">
              <div className="signup">
                <h3 className="new-customer">Login Account</h3>
                <hr />
                <p className="register-info">
                  If you already have an account with us, please login at the
                  login page.
                </p>
                <img src={signup} alt="signup Illustration" />
                <div className="register-button">
                  <Link to="/login">Continue To Login</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
