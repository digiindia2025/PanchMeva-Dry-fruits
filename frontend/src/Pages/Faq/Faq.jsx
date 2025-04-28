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
                    1. How did Shri Godham Mahatirth Pathmeda begin?
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
                      The initiative started on September 17, 1993, from
                      Anandavan Pathmeda, Dwarka, India. It was inspired by
                      revered saints and marked by the rescue of 22 Vedalakshana
                      Gomata and 8 Savatsa Gomata from slaughterhouses. The
                      project was inaugurated with the blessings of saints such
                      as Brahmarshi Shri Magaramji Rajguru and Shri Gotrashiji.
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
                    2. What is the significance of Vedalakshana Gomata?
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
                      Vedalakshana Gomata is revered for its medicinal and
                      nourishing properties. They provide nutrition, cure
                      various diseases, and have been worshipped in Indian
                      culture for centuries. Their milk, urine, and products are
                      widely used in Ayurveda and for preparing pure foods.
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
                    3. Why is Gomata protection crucial?
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
                      Gomata protection is vital for preserving their medicinal
                      and environmental benefits. Despite the existence of
                      Goseva ashrams, only 5% of Gomata are saved from neglect
                      and slaughter. Protecting the remaining 95% is essential
                      to prevent ecological and cultural damage caused by their
                      loss.
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
                    4. What role does Anandavan Pathmeda play in this movement?
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
                      Anandavan Pathmeda is the birthplace of the nationwide
                      Goseva Mahabhiyan. It is a sacred land where Lord Krishna
                      once grazed Vedalakshana Gomata. Today, it stands as the
                      center of the revolutionary Gomata protection movement.
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
                    5. What are the core values of Shri Godham Mahatirth
                    Pathmeda?
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
                      The institution focuses on kindness, co-existence, and
                      non-discrimination. It rejects cheap politics,
                      selfishness, and groupism. It aims to connect individuals,
                      society, and the nation while promoting environmental
                      refinement, nature conservation, and Sanatan culture.
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
                    6. How does the organization support Gomata?
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
                      The organization provides protection, shelter, food, and
                      medical care to struggling Gomata through Goseva ashrams
                      and other projects. Shri Godham Mahatirth Pathmeda
                      Lokpunayartha Nyas was established in 2017 to further
                      these efforts.
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
                    7. Where are the Goseva projects located?
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
                      The Goseva projects operate across India, including
                      Rajasthan and Gujarat. They include Goseva ashrams and
                      charitable initiatives to aid Gomata.
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
                    8. What can individuals do to support this initiative?
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
                      Individuals can join the Goseva Mahabhiyan by
                      volunteering, spreading awareness, or contributing
                      resources to the movement. Collective efforts are vital
                      for the success of this campaign.
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
