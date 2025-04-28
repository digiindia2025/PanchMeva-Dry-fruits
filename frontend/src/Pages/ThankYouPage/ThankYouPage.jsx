import React from "react";
import "./ThankYouPage.css";

const ThankYouPage = () => {
  return (
    <>
      <div className="thank-you-container d-flex flex-column justify-content-center align-items-center">
        <div className="icon-container">
          <div className="circle-icon">
            <i className="check-icon">✔</i>
          </div>
          <div className="particles-container">
            {[...Array(12)].map((_, index) => (
              <div
                key={index}
                className={`particle particle-${index + 1}`}
              ></div>
            ))}
          </div>
        </div>
        <h1 className="mt-4 text-center">Thank you for ordering!</h1>
        <p className="text-muted text-center">
          We appreciate your trust in us!
          <br />
          Your order is being processed and will reach you soon.
        </p>
        <div className="mt-4">
          <button className="btn btn-outline-primary me-3">View Order</button>
          <button className="btn btn-primary">Continue Shopping</button>
        </div>
      </div>
    </>
  );
};

export default ThankYouPage;
