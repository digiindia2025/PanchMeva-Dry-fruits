import React from "react";
import Slider from "react-slick";
import "./testimonials.css";
import comaImage from "../../images/coma.png";

const testimonialsData = [
  {
    feedback:
      "I've been using Desi Cow Ghee for my cooking, and it's absolutely amazing! It adds a rich, authentic flavor to all my dishes. Highly recommend!",
    name: "Priya Sharma",
    location: "Mumbai, India",
    image: comaImage,
  },
  {
    feedback:
      "The Agar Batti I purchased from this site has the most calming fragrance. Perfect for my meditation sessions, it creates a peaceful atmosphere.",
    name: "Ramesh Kumar",
    location: "Delhi, India",
    image: comaImage,
  },
  {
    feedback:
      "The grocery products from this store are always fresh and of the highest quality. I love the convenience of ordering everything in one place!",
    name: "Neha Patel",
    location: "Ahmedabad, India",
    image: comaImage,
  },
  {
    feedback:
      "I’ve been buying Desi Cow Ghee for a while now, and I can honestly say it's the best I’ve ever tasted. Pure, nutritious, and perfect for my health!",
    name: "Anil Singh",
    location: "Lucknow, India",
    image: comaImage,
  },
];

const Testimonial = () => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section className="testimonial-section">
      <div className="container">
        <h2 className="section-title">What Our Customers Say</h2>
        <Slider {...sliderSettings}>
          {testimonialsData.map((testimonial, index) => (
            <div className="testimonial-card" key={index}>
              <div className="testimonial-content">
                <img src={testimonial.image} alt="Quote" className="quote-icon" />
                <p className="testimonial-feedback">{testimonial.feedback}</p>
                <h5 className="customer-name">{testimonial.name}</h5>
                <p className="customer-location">{testimonial.location}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Testimonial;
