import React, { useEffect, useState } from "react";
import bannerImage1 from "../../images/banner1.jpg";
import bannerImage2 from "../../images/banner2.jpg";
import bannerImage3 from "../../images/banner3.png";
import bannerImage4 from "../../images/banner4.png";
import "./hero.css";
import Slider from "react-slick";
import productImage from "../../images/productImage1.png";
import grocery from "../../images/grocery.png";
import CountUp from "react-countup";
import article1 from "../../images/articleimg1.jpg";
import article2 from "../../images/articleimg2.jpg";
import article3 from "../../images/articleimg3.jpg";
import article4 from "../../images/articleimg4.jpg";
import ProductsTabs from "../ProductsTabs/ProductsTabs";
import SubscribeForm from "../SubscribeForm/SubscribeForm";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const Hero = () => {
  const navigate = useNavigate();
  const [inView, setInView] = useState(false);
  const [selectedWeights, setSelectedWeights] = useState({});
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("https://api.panchgavyamrit.com/api/get-product");
      setProducts(response.data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts()
  }, [])

  const handleWeightChange = (productId, productWeight) => {
    const selectedProduct = products.find((product) => product._id === productId);
    const productInfo = selectedProduct?.productInfo.find(
      (info) => info.productweight === productWeight
    );

    if (productInfo) {
      setSelectedWeights((prev) => ({
        ...prev,
        [productId]: {
          weight: productWeight,
          price: productInfo.productFinalPrice,
        },
      }));
    }
  };

  const handleViewDetails = (productId) => {
    if (!selectedWeights[productId]) {
      Swal.fire({
        icon: "error",
        title: "Weight Not Selected",
        text: "Please select a weight before viewing details.",
      });
      return;
    }
    // Navigate to product details page with the selected weight and price
    navigate(
      `/product/product-details/${productId}?weight=${selectedWeights[productId].weight}&price=${selectedWeights[productId].price}`
    );
  };


  const handleScroll = () => {
    const section = document.getElementById("stats-section");
    if (section) {
      const rect = section.getBoundingClientRect();
      if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
        setInView(true);
      }
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          dots: false,
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const articles = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          dots: false,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          dots: false,
          slidesToScroll: 1,
        },
      },
    ],
  };

  function truncateText(text, wordLimit) {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  }

  const articleArr = [
    {
      image: article1,
      title: "Convenience at Your Doorstep",
      desc: "Convenience is the name of the game when it comes to minimarkets. Well discuss how these compact stores save you time and effort, providing a quick and hassle-free shopping experience, with extended hours and a curated selection of essential products...",
      date: "13 Dec, 2022",
    },
    {
      image: article2,
      title: "Beyond the Basics",
      desc: "While minimarkets excel at providing everyday essentials, they often surprise customers with additional services. Well explore offerings such as bill payment facilities, money transfer services, and even niche products like specialty coffees or fresh...",
      date: "13 Dec, 2022",
    },
    {
      image: article3,
      title: "Supporting Local Suppliers",
      desc: "Discover the role minimarkets play in supporting local farmers, growers, and suppliers. Well showcase how these small-scale businesses prioritize sourcing from nearby producers, contributing to the local economy and fostering sustainable practices...",
      date: "13 Dec, 2022",
    },
    {
      image: article4,
      title: "Fresh Fruits and Healthy Options",
      desc: "Well delve deeper into the fruit category, highlighting the variety of fresh fruits available at minimarkets. Learn about the benefits of shopping locally for seasonal produce, discover tips for selecting the ripest fruits ...",
      date: "13 Dec, 2022",
    },
    {
      image: article1,
      title: "Convenience at Your Doorstep",
      desc: "Convenience is the name of the game when it comes to minimarkets. Well discuss how these compact stores save you time and effort, providing a quick and hassle-free shopping experience, with extended hours and a curated selection of essential products...",
      date: "13 Dec, 2022",
    },
    {
      image: article2,
      title: "Beyond the Basics",
      desc: "While minimarkets excel at providing everyday essentials, they often surprise customers with additional services. Well explore offerings such as bill payment facilities, money transfer services, and even niche products like specialty coffees or fresh...",
      date: "13 Dec, 2022",
    },
    {
      image: article3,
      title: "Supporting Local Suppliers",
      desc: "Discover the role minimarkets play in supporting local farmers, growers, and suppliers. Well showcase how these small-scale businesses prioritize sourcing from nearby producers, contributing to the local economy and fostering sustainable or practices...",
      date: "13 Dec, 2022",
    },
    {
      image: article4,
      title: "Fresh Fruits and Healthy Options",
      desc: "Well delve deeper into the fruit category, highlighting the variety of fresh fruits available at minimarkets. Learn about the benefits of shopping locally for seasonal produce, discover tips for selecting the ripest fruits, and explore creative ways ...",
      date: "13 Dec, 2022",
    },
  ];

  return (
    <>
      <section className="sidebutton">
        <a href="#home">
          <i class="bi bi-arrow-up-circle"></i>
        </a>
      </section>
      <section className="sidewhatsapp">
        <a target="_blank" href="https://wa.me/9873745454">
          <i class="bi bi-whatsapp"></i>
        </a>
      </section>
      <section className="sidecall">
        <a href="tel:+919873745454">
          <i class="bi bi-telephone"></i>
        </a>
      </section>
      <section id="home" className="hero">
        <div className="heroCarousel">
          <div
            id="carouselExampleControls"
            className="carousel slide"
            data-bs-ride="carousel"
            data-bs-interval="2000"
          >
            {/* Overlay */}
            {/* <div className="overlay">
              <div className="overlayContent">
                <h5>Fruits & Vegetables</h5>
                <h1>Create a grocery interior in your home</h1>
                <p>
                  Minimarkets stock a variety of products, including basic
                  groceries, snacks, beverages, household supplies, personal
                  care items, and often tobacco products and newspapers.
                </p>
                <Link
                  className="button_"
                  to="#"
                  aria-label="Check More Products"
                >
                  Check More Products <i className="bi bi-bag"></i>
                </Link>
              </div>
            </div> */}
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img
                  src={bannerImage2}
                  className="d-block w-100"
                  alt="Grocery Banner 1"
                />
              </div>
              <div className="carousel-item">
                <img
                  src={bannerImage1}
                  className="d-block w-100"
                  alt="Grocery Banner 2"
                />
              </div>
              <div className="carousel-item">
                <img
                  src={bannerImage3}
                  className="d-block w-100"
                  alt="Grocery Banner 2"
                />
              </div>
              <div className="carousel-item">
                <img
                  src={bannerImage4}
                  className="d-block w-100"
                  alt="Grocery Banner 2"
                />
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleControls"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleControls"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </section>

      <section className="hero-product">
        <div className="container">
          <div className="headings">
            <h2>Bestsellers</h2>
          </div>
          <div className="slider-container">
            <Slider {...settings}>
              {products.map((product) => (
                <div key={product._id} className="col-md-4 col-6">
                  <div className="product-card-page">
                    <div className="product-image-product">
                      <img
                        src={product.productImage[0]}
                        alt={product.productName}
                        className="img-fluid"
                      />
                    </div>
                    <div className="productName">
                      <h3 className="product-title">{product.productName}</h3>
                      <div className="price">
                        <span className="current-price">
                          &#8377;
                          {selectedWeights[product._id]?.price ||
                            product.productInfo[0].productFinalPrice}
                        </span>
                      </div>
                    </div>
                    <label
                      htmlFor={`pot-${product._id}`}
                      className="pot-label"
                    >
                      *Weight:
                    </label>
                    <select
                      id={`pot-${product._id}`}
                      className="pot-select"
                      onChange={(e) =>
                        handleWeightChange(product._id, e.target.value)
                      }
                      defaultValue=""
                    >
                      {product.productInfo.map((info) => (
                        <option
                          key={info.productweight}
                          value={info.productweight}
                        >
                          {info.productweight}
                        </option>
                      ))}
                    </select>
                    <div className="" style={{ display: 'flex', justifyContent: 'space-between', gap: 5 }}>
                        <button
                          onClick={() => handleViewDetails(product._id)}
                          className="add-to-cart"
                        >
                          ADD TO CART
                        </button>
                    <button
                      onClick={() => handleViewDetails(product._id)}
                      className="add-to-cart"
                    >
                      View Details
                    </button>
                  </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </section>

      <section className="grocery">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-7">
              <h4>Pure Ghee, Pure Health</h4>
              <h2>
                <b>Golden Goodness</b> Authentic Ghee and Wellness Products for
                You.
              </h2>
              <p>
                Experience the pure richness of authentic ghee, crafted for
                unmatched taste and nutrition. Explore our range of premium ghee
                and wellness products designed to enhance your healthy
                lifestyle.
              </p>
              <Link className="button_" to="/all-products">
                Check More Products <i class="bi bi-bag"></i>
              </Link>
            </div>
            <div className="col-md-5">
              <img className="w-100" src={grocery} alt="" />
            </div>
          </div>
        </div>
      </section>

      <section className="countUp">
        <div id="stats-section" className="stats-container">
          <div className="stat-item">
            <h1>{inView && <CountUp start={0} end={3000} duration={2} />}+</h1>
            <p>Orders In Month</p>
          </div>
          <div className="stat-item">
            <h1>{inView && <CountUp start={0} end={17} duration={2} />}+</h1>
            <p>Plants And Flowers Categories</p>
          </div>
          <div className="stat-item">
            <h1>{inView && <CountUp start={0} end={10} duration={2} />}+</h1>
            <p>Years Of Experience</p>
          </div>
          <div className="stat-item">
            <h1>
              {inView && (
                <CountUp start={0} end={4.9} duration={2} decimals={1} />
              )}
              +
            </h1>
            <p>Happy Clients And Partners</p>
          </div>
        </div>
      </section>

      <section className="productDetailsCols">
        <div className="container">
          <div className="row">
            <div className="col-md-6 mb-2">
              <div className="fruitvegitabls1">
                <div className="overlay">
                  <div className="firstCol">
                    <h6>Sweets & Cookies</h6>
                    <h4></h4>
                    <p>
                      In the category of fruits, a minimarket typically offers a
                      selection of fresh fruits for customers to purchase. Here
                      are some key points regarding the fruit category in a
                      minimarket:
                    </p>
                    {/* <Link className="button_" to="">
                      Show More
                    </Link> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-2">
              <div className="fruitvegitabls2">
                <div className="overlay">
                  <h6>Pure Cow Ghee</h6>
                  <h4>100% Shudhta Ka Vada</h4>
                  <p>
                    Minimarkets stock a variety of products, including basic
                    groceries, snacks, beverages, household supplies, personal
                    care items, and often tobacco products and newspapers.
                  </p>
                  {/* <Link className="button_" to="">
                    Show More
                  </Link> */}
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-2">
              <div className="fruitvegitabls3">
                <div className="overlay">
                  <h6>Cooking Refined Oil</h6>
                  <h4>100% Pure Origional</h4>
                  <p>
                    The selection is typically smaller than that of a
                    supermarket or grocery store, focusing on essential items
                    that customers might need for immediate consumption or daily
                    use.
                  </p>
                  {/* <Link className="button_" to="">
                    Show More
                  </Link> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ProductsTabs />

      <section className="article">
        <div className="container">
          <div className="headings">
            <h2>Articles</h2>
            <div className="Article-carousel">
              <div className="slider-container">
                <Slider {...articles}>
                  {articleArr.map((item, index) => (
                    <div>
                      <div className="article_card">
                        <img src={item.image} alt="" />
                        <h5>{truncateText(item.title, 2)}</h5>
                        <p>{truncateText(item.desc, 15)}</p>
                        <p className="date">{item.date}</p>
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SubscribeForm />
    </>
  );
};

export default Hero;
