import React, { useState } from "react";
import newsImage from "../../images/news-bg.png";
import axios from "axios";
import Swal from "sweetalert2";

const SubscribeForm = () => {
  const [subscribeEmail, setSubscribeEmail] = useState("")

  const Subscribe = async () => {
    console.log(subscribeEmail)
    try {
      const res = await axios.post("https://api.panchgavyamrit.com/api/subscribe", { subscribeEmail: subscribeEmail })
      if (res.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Subscribed Successfully",
          text: "Thank you for subscribing to our newsletter!",
          confirmButtonText: "OK",
        });
        setSubscribeEmail(""); // Clear input field after success
      }
    } catch (error) {
      console.log(error)
      Swal.fire({
        icon: "error",
        title: "Subscription Failed",
        text: "Something went wrong. Please try again later.",
        confirmButtonText: "OK",
      });

    }
  }
  return (
    <>
      <section className="subscribes">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h2>Subscribe Us</h2>
              <p>
                To subscribe to our newsletter, simply visit our website or ask
                one of our friendly staff members during your next visit to our
                Our Store. Stay connected, stay informed, and enjoy all the
                benefits that come with being part of our Our Store community.
              </p>
              <input
                type="text"
                placeholder="type your address email..."
                className="subscribeInput"
                onChange={(e) => setSubscribeEmail(e.target.value)}
                value={subscribeEmail}
              />
              <button className="cupan-code-button" onClick={Subscribe}>Subscribe</button>
            </div>
            <div className="col-md-6">
              <img className="w-100" src={newsImage} alt="" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SubscribeForm;
