import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./PageNotFound.css";

const PageNotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(()=>{
    window.scrollTo({
      top:0,
    })
  },[])
  return (
    <div className="page-not-found">
      <div className="content">
        <h1>404 - Page Not Found</h1>
        <p>
          Oops! The page you're looking for 
          <span className="pathname"> "{location.pathname}"</span> 
          is under construction or doesn't exist.
        </p>
        <p>We are working on this page to make it awesome for you!</p>
        <button className="home-button" onClick={() => navigate("/")}>
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default PageNotFound;
