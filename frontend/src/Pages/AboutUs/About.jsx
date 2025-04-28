import React, { useEffect } from "react";
import "./about.css";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const About = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
    })
  }, []);
  return (
    <>
      <Helmet>
        <title>About Us - Shri Godham Mahatirtha Pathmeda</title>
        <meta
          name="description"
          content="Learn about Shri Godham Mahatirtha Pathmeda, a revolutionary initiative for Gomata protection, Ayurveda medicine, and cultural preservation in India."
        />
        <meta
          name="keywords"
          content="Gomata, Gomata protection, Goseva Mahabhiyan, Ayurveda medicine, Vedalakshana Gomata, Shri Godham Mahatirtha Pathmeda, Gomata ashrams, environmental refinement, Indian culture, Goseva, Dhenu conservation, sustainable development"
        />
        <meta name="author" content="Shri Godham Mahatirtha" />
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
                  <Link className="text-white terms-link" to="/about-us">
                    About Us
                  </Link>
                </div>
              </div>
            </div>
            <h1 className="text-white mt-3">About Us</h1>
            <p className="text-white mt-3 mb-0">Support 24 × 7</p>
          </div>
        </div>
      </section>
      <section className="aboutUs">
        <div className="container">
          <div className="about_content">
            <div className="heading">
              <h2>How we Started?</h2>
            </div>
            <p>
              After the proclamation of the revered saints, the nationwide
              creative Goseva Mahaabhiyaan began on 17 September 1993 from
              Anandavan Pathmeda, the sacred land of Dwarka, India, and our
              journey was very challenging. On the same day, 22 Vedalakshana
              Gomata were being transported to a slaughterhouse in Gujarat on
              the National Highway 15 and 8 Savatsa Gomata being taken to the
              border of Pakistan were rescued from the Gomata smugglers and
              brought to this land by the guardians of Sanchore. At the request
              of the local Gomata devotees and with the blessings of revered
              Brahmarshi Shri Magaramji Rajguru, and revered Shri Gotrashiji,
              the inauguration of this concept with the arrival of the
              aforementioned Vedlakshana Gomata started. On the holy festival of
              Vedalakshana Gogeeta Jayanti Festival held in 1993, this Goseva
              project was named ‘Shri Godham Mahatirtha Anandavan Pathmera’ by
              the Goshti and revered Gosevapremi saints.
            </p>
            <p>
              PujyaGomata is a source of strength and has medicinal properties
              to quench the toxin in the entire universe. According to natural
              science, one Vedalakshana Gomata can give nutrition to a million
              animals because they give you nourishment and have abundant and
              vital elements to cure various diseases. Due to the nutritious and
              enriching nature of the Gomata, it has been given the place of
              worshipping mother in the Apaurusheya Vedas and Indian culture. In
              Vedalakshana, Gomata is not only cared for but Gomata urine is
              used in Ayurveda medicine and their milk and milk products are
              used to make pure breakfasts or sweets. We have medicines for many
              types of diseases which have been used successfully for a year.
            </p>
            <p>
              Even today in India, inspired by compassion, the work of
              protecting and serving the Gomata species is being done by the
              religious saints. There are thousands of Goseva ashrams in the
              country where the different types of Gomata get shelter. Goseva is
              performed with great reverence in the ashrams, but the work is
              going on with limited symbolism and righteousness, while the
              practice of neglecting and killing the Gomata cattle is
              widespread, subject to the excessive craving for industrial wealth
              and excessive selfishness on the basis of the economy. Our
              religious institutions save only 5 percent of the Gomata cattle,
              the remaining 95 percent of the bovine economically fall prey to
              the self-sufficiency of cruel human beings. If we want to avoid
              the terrible destruction and damage that occurs as a result of
              killing such a large number of Gomata, then the entire Gomata have
              to be protected. For this, the revolutionary Gosseva Mahabhayan is
              absolutely necessary.
            </p>
            <p>
              Anandavan Pathmeda is the holy and captivating land of the country
              where Lord Krishna stopped in the month of Shravan and Bhadrapada
              while going from Kurukshetra to Dwarka. He brought the most milch,
              combative, courageous, brave, gentle, Brahmwaroopa Vedalakshana
              Gomata from Vrindavan for grazing and wandering. Saint-heartedly,
              this nation-wide creative Goseva Mahabhiyan was expressed on the
              land of Anandavan of Shri Godham Mahatirtha Pathmeda due to the
              suffering of the Gomata cattle. We hope that you too will join our
              campaign and help us in running it successfully.
            </p>
          </div>
        </div>
      </section>
      <section className="about-core-values">
        <div className="container">
          <div className="about_content">
            <div className="heading">
              <h2>Core Value</h2>
            </div>
            <p>
              The purpose of forming this institution is to express feelings of
              kindness. This institution is against any kind of cheap politics,
              discrimination, and selfishness. Individualism, religiousism, and
              groupism also have no place in it. This institution believes in
              co-existence. It follows the fundamental principles that others’
              interests will be our own interest. Any of its tendencies only
              works to connect the individual, society, and country. In order to
              continue the nationwide Goseva Mahabhiyan of Shri Godham
              Mahathirth Pathmeda in a peaceful manner, such dedicated,
              disciplined, and hard-working Gomata devotees are being prepared
              through them Vedlakshana Gomata of Dhenu Conservation, Earth
              Sustenance, Nature Finishing, Environmental Refinement, and
              Sanatan Culture, all efforts will be made to create a happy future
              with the present sorrow of the entire living world including
              mankind.
            </p>
          </div>
        </div>
      </section>
      <section className="about-our-work">
        <div className="container">
          <div className="about_content">
            <div className="heading">
              <h2>Core Value</h2>
            </div>
            <p>
              Through Shri Godham Mahatirth Pathmeda, protection, shelter, food,
              and treatment to struggling and ill-treated Gomata are given at
              Goseva ashrams and other charitable projects established and
              operated in various parts of the country including Rajasthan and
              Gujarat. Also, to cooperate, Shri Godham Mahatirth Pathmeda
              Lokpunayartha Nyas has been duly constituted on 7th April 2017 by
              the revered Gotrishi Swami Shri Dattasharnanandji. We are working
              on many projects related to Gomata cattle.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
