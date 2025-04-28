import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./faq.css";
import { Helmet } from "react-helmet";
const Faq = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);
  return (
    <>
      <Helmet>
        <title>FAQ - Panchgavyamrit</title>
        <meta
          name="description"
          content="Frequently Asked Questions about Panchgavyamrit and Shri Godham Mahatirth Pathmeda."
        />
        <meta
          name="keywords"
          content="FAQ, Panchgavyamrit, Gomata, Shri Godham Mahatirth Pathmeda, Goseva, Vedalakshana Gomata"
        />
      </Helmet>
      <section className="breadcrumb">
        <div className="breadcrumb-overlay">
          <div className="container">
            <div className="row align-items-center mb-4">
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
                  <Link className="text-white terms-link" to="/about-us">
                    FAQ
                  </Link>
                </div>
              </div>
            </div>
            <h1 className="text-white mt-3">Frequently Asked Questions</h1>
            <p className="text-white mt-3 mb-0">Support 24 × 7</p>
          </div>
        </div>
      </section>
      <section className="faq">
        <div className="container">
          <div className="faq-heading-content">
            <h1>
              <b>FAQ</b>
            </h1>
            <p>These are the most frequently asked questions.</p>
            <p>
              If you have any questions, please &nbsp;
              <Link href="/contact-us">Contact Us.</Link>
            </p>
          </div>
          <div className="faq-questions">
            <div class="accordion" id="accordionExample">
              <div class="accordion-item">
                <h2 class="accordion-header" id="headingOne">
                  <button
                    class="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                  >
                    1. What products do you offer at Goel Mewe Wala?

                  </button>
                </h2>
                <div
                  id="collapseOne"
                  class="accordion-collapse collapse show"
                  aria-labelledby="headingOne"
                  data-bs-parent="#accordionExample"
                >
                  <div class="accordion-body">
                    <p>
                    We specialize in premium-quality dry fruits,
                     nuts, and spices, carefully sourced and packed to 
                     deliver freshness, nutrition, and great taste.

                    </p>
                  </div>
                </div>
              </div>
              <div class="accordion-item">
                <h2 class="accordion-header" id="headingTwo">
                  <button
                    class="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseTwo"
                    aria-expanded="false"
                    aria-controls="collapseTwo"
                  >
                    2. Are your dry fruits and nuts 100% natural?

                  </button>
                </h2>
                <div
                  id="collapseTwo"
                  class="accordion-collapse collapse"
                  aria-labelledby="headingTwo"
                  data-bs-parent="#accordionExample"
                >
                  <div class="accordion-body">
                    <p>
                    Yes! All our products are 100% natural with no
                     artificial colors, flavors, or preservatives. 
                     We believe in delivering nature’s purest form to you.
                    </p>
                  </div>
                </div>
              </div>
              <div class="accordion-item">
                <h2 class="accordion-header" id="headingThree">
                  <button
                    class="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseThree"
                    aria-expanded="false"
                    aria-controls="collapseThree"
                  >
                    3. How do you ensure the quality of your products?

                  </button>
                </h2>
                <div
                  id="collapseThree"
                  class="accordion-collapse collapse"
                  aria-labelledby="headingThree"
                  data-bs-parent="#accordionExample"
                >
                  <div class="accordion-body">
                    <p>
                    We source directly from trusted farmers and vendors.
                     Every batch undergoes strict quality checks to ensure 
                     only the best reaches our customers.

                    </p>
                  </div>
                </div>
              </div>
              <div class="accordion-item">
                <h2 class="accordion-header" id="headingFour">
                  <button
                    class="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseFour"
                    aria-expanded="false"
                    aria-controls="collapseFour"
                  >
                    4. Do you offer packaging for gifting purposes?

                  </button>
                </h2>
                <div
                  id="collapseFour"
                  class="accordion-collapse collapse"
                  aria-labelledby="headingFour"
                  data-bs-parent="#accordionExample"
                >
                  <div class="accordion-body">
                    <p>
                    Yes, we offer customized gift packs and festive
                     hampers for weddings, corporate events, festivals, 
                     and special occasions. Contact us for bulk or personalized orders!

                    </p>
                  </div>
                </div>
              </div>
              <div class="accordion-item">
                <h2 class="accordion-header" id="headingFive">
                  <button
                    class="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseFive"
                    aria-expanded="false"
                    aria-controls="collapseFive"
                  >
                    5. Where are you located?

                  </button>
                </h2>
                <div
                  id="collapseFive"
                  class="accordion-collapse collapse"
                  aria-labelledby="headingFive"
                  data-bs-parent="#accordionExample"
                >
                  <div class="accordion-body">
                    <p>
                    We are based in Rohini, Delhi, and 
                    proudly serve customers across Delhi NCR 
                    and beyond through our physical and online presence.

                    </p>
                  </div>
                </div>
              </div>
              <div class="accordion-item">
                <h2 class="accordion-header" id="headingSix">
                  <button
                    class="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseSix"
                    aria-expanded="false"
                    aria-controls="collapseSix"
                  >
                    6.  Do you deliver products online?

                  </button>
                </h2>
                <div
                  id="collapseSix"
                  class="accordion-collapse collapse"
                  aria-labelledby="headingSix"
                  data-bs-parent="#accordionExample"
                >
                  <div class="accordion-body">
                    <p>
                    Yes! You can place your order through our 
                    website, WhatsApp, or phone. We offer safe and 
                    fast delivery to your doorstep.

                    </p>
                  </div>
                </div>
              </div>
              <div class="accordion-item">
                <h2 class="accordion-header" id="headingSeven">
                  <button
                    class="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseSeven"
                    aria-expanded="false"
                    aria-controls="collapseSeven"
                  >
                    7. What is the shelf life of dry fruits and nuts?

                  </button>
                </h2>
                <div
                  id="collapseSeven"
                  class="accordion-collapse collapse"
                  aria-labelledby="headingSeven"
                  data-bs-parent="#accordionExample"
                >
                  <div class="accordion-body">
                    <p>
                    Generally, dry fruits and nuts can last 6 to 12 
                    months if stored properly in a cool, dry place away 
                    from sunlight and moisture.

                    </p>
                  </div>
                </div>
              </div>
              <div class="accordion-item">
                <h2 class="accordion-header" id="headingEight">
                  <button
                    class="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseEight"
                    aria-expanded="false"
                    aria-controls="collapseEight"
                  >
                    8. How can I store dry fruits and nuts to keep them fresh?

                  </button>
                </h2>
                
                
                <div
                  id="collapseEight"
                  class="accordion-collapse collapse"
                  aria-labelledby="headingEight"
                  data-bs-parent="#accordionExample"
                >
                  <div class="accordion-body">
                    <p>
                    Store them in airtight containers in a cool, 
                    dry place. For longer freshness, especially 
                    during hot seasons, you can refrigerate them.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Faq;
