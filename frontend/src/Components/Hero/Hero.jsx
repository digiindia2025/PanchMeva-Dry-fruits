import React, { useEffect, useState } from "react";
// import bannerImage1 from "../../images/banner1.jpg";
import "./hero.css";
import Slider from "react-slick";
import grocery from "../../images/grocery.png";
import CountUp from "react-countup";
// import article1 from "../../images/articleimg1.jpg";
// import article2 from "../../images/articleimg2.jpg";
// import article3 from "../../images/articleimg3.jpg";
// import article4 from "../../images/articleimg4.jpg";
import ProductsTabs from "../ProductsTabs/ProductsTabs";
import SubscribeForm from "../SubscribeForm/SubscribeForm";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import offer from "../../images/offers (2).jpeg";

const Hero = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [inView, setInView] = useState(false);
  const [selectedWeights, setSelectedWeights] = useState({});
  const [products, setProducts] = useState([]);
  const [banner, setBanner] = useState([]);

  useEffect(() => {
    const fetchBanners = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:8000/api/all-banner"
        );
        const newData = response.data.banners;
        const filterData = newData.filter((x) => x.bannerStatus === true);
        setBanner(filterData); // Assuming the API returns an array of banners
        console.log(banner);
      } catch (error) {
        // toast.error("Failed to load banners!");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBanners();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/get-product"
      );
      const productRecord = response.data.products;
      const filterbestseller = productRecord.filter(
        (x) => x.bestseller === true
      );
    
      setProducts(filterbestseller.filter((product) => product.productStatus === true));
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    // Set default selected weights for products
    if (products.length > 0) {
      const defaultWeights = {};
      products.forEach((product) => {
        const firstProductInfo = product.productInfo[0];
        if (firstProductInfo) {
          defaultWeights[product._id] = {
            weight: firstProductInfo.productweight,
            price: firstProductInfo.productFinalPrice,
            originalPrice: firstProductInfo.productPrice,
            discountPercentage: firstProductInfo.productDiscountPercentage,
            stock: firstProductInfo.stock,
          };
        }
      });
      setSelectedWeights(defaultWeights);
    }
  }, [products]);


  const handleWeightChange = (productId, productWeight) => {
    const selectedProduct = products.find(
      (product) => product._id === productId
    );
    const productInfo = selectedProduct?.productInfo.find(
      (info) => info.productweight === productWeight
    );

    if (productInfo) {
      setSelectedWeights((prev) => ({
        ...prev,
        [productId]: {
          weight: productWeight,
          price: productInfo.productFinalPrice,
          originalPrice: productInfo.productPrice,
          discountPercentage: productInfo.productDiscountPercentage,
          stock: productInfo.stock,
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
    const { weight, price, stock } = selectedWeights[productId];
    // Navigate to product details page with the selected weight and price
    navigate(
      `/product/product-details/${productId}?weight=${weight}&price=${price}&stock=${stock}`
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
    speed: 400,
    autoplay: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 4, slidesToScroll: 1, infinite: true, dots: true, }, },
      { breakpoint: 600, settings: { slidesToShow: 2, slidesToScroll: 2, infinite: true, dots: false, }, },
      { breakpoint: 360, settings: { dots: false, infinite: true, slidesToShow: 2, slidesToScroll: 1, }, },
    ],
  };

  const settings2 = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 3, infinite: true, dots: true, }, },
      { breakpoint: 600, settings: { slidesToShow: 3, infinite: true, dots: false, slidesToScroll: 1, }, },
      { breakpoint: 480, settings: { slidesToShow: 2, dots: false, slidesToScroll: 1, }, },
    ],
  };

  function truncateText(text, wordLimit) {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  }

  const [articleArr, setArticleArr] = useState([]);

  const getArticalsData = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/all-articals")
      setArticleArr(res.data); // Assuming the API returns an array of articles
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getArticalsData()
  }, [])


  // add by aman tiwari

  const addToCart = (product) => {
    if (!product) return;

    const quantity = 1; // or get from state/input
    const selectedWeight = product.productInfo[0].productweight; // or get from state/input
    const price = product.productInfo[0].productFinalPrice; // or calculate based on selectedWeight

    if (quantity < 1) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please select at least one item.',
      });
      return;
    }

    const existingCart = JSON.parse(sessionStorage.getItem("VesLakshna")) || [];
    const isProductInCart = existingCart.some((item) => item.productId === product._id);

    if (isProductInCart) {
      Swal.fire({
        icon: 'warning',
        title: 'Product Already in Cart',
        text: 'This product is already in your cart.',
      });
    } else {
      const cartProduct = {
        productId: product._id,
        productName: product.productName,
        productImage: product.productImage[0],
        price: price,
        weight: selectedWeight,
        quantity: quantity,
      };
      existingCart.push(cartProduct);
      sessionStorage.setItem("VesLakshna", JSON.stringify(existingCart));
      Swal.fire({
        icon: 'success',
        title: 'Added to Cart',
        text: `${product.productName} has been added to your cart.`,
      });
      navigate("/cart");
    }
  };


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
            <div className="carousel-inner">
              {banner.length > 0 ? (
                banner.map((bannerItem, index) => (
                  <div
                    className={`carousel-item ${index === 0 ? "active" : ""}`}
                    key={bannerItem.id || index} // Assuming each banner has a unique `id`
                  >
                    <img
                      src={bannerItem?.bannerImage} // Assuming the banner has an 'image' property
                      className="d-block w-100"
                      alt={`Banner ${index + 1}`}
                    />
                  </div>
                ))
              ) : (
                <div className="carousel-item active">
                  <img
                    src={banner[0]?.bannerImage} // Fallback to a default image
                    className="d-block w-100"
                    alt="Default Banner"
                  />
                </div>
              )}
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
              {products?.map((product, index) => (
                <div key={index}>
                  <div className="product-card">
                    {/* <Link to={"/product/product-details"}> */}
                    <div className="product-image">
                      <img
                        src={product.productImage[0]}
                        alt={product.productName}
                      />
                    </div>
                    <div className="productName">
                      <h3 className="product-title">
                        {truncateText(product.productName, 3)}
                        {/* {product.productName} */}
                      </h3>
                      <div className="price text-end">
                        {selectedWeights[product._id] ? (
                          <>
                            {selectedWeights[product._id]?.discountPercentage >
                              0 ? (
                              <>
                                <span className="current-price">
                                  <del>
                                    &#8377;{" "}
                                    {
                                      selectedWeights[product._id]
                                        ?.originalPrice
                                    }
                                  </del>
                                </span>{" "}
                                <br />
                                <span className="original-price">
                                  Off{" "}
                                  {
                                    selectedWeights[product._id]
                                      ?.discountPercentage
                                  }
                                  %
                                </span>{" "}
                                <br />
                                <span className="current-price">
                                  &#8377; {selectedWeights[product._id]?.price}
                                </span>
                              </>
                            ) : (
                              <span className="current-price">
                                &#8377; {selectedWeights[product._id]?.price}
                              </span>
                            )}
                          </>
                        ) : (
                          <>
                            {product.productInfo[0].productDiscountPercentage >
                              0 ? (
                              <>
                                <span className="current-price">
                                  <del>
                                    &#8377;{" "}
                                    {product.productInfo[0].productPrice}
                                  </del>
                                </span>{" "}
                                <br />
                                <span className="original-price">
                                  Off{" "}
                                  {
                                    product.productInfo[0]
                                      .productDiscountPercentage
                                  }
                                  %
                                </span>{" "}
                                <br />
                                <span className="current-price">
                                  &#8377;{" "}
                                  {product.productInfo[0].productFinalPrice}
                                </span>
                              </>
                            ) : (
                              <span className="current-price">
                                &#8377;{" "}
                                {product.productInfo[0].productFinalPrice}
                              </span>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                    {/* </Link> */}

                    <label htmlFor={`pot-${product._id}`} className="pot-label">
                      *Weight:
                    </label>
                    <select
                      id={`pot-${product._id}`}
                      className="pot-select"
                      onChange={(e) =>
                        handleWeightChange(product._id, e.target.value)
                      }
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
                        onClick={() => addToCart(product)}
                        className="add-to-cart"
                      >
                        ADD TO CART
                      </button>
                      
                      {/* remove conflict  */}
                    <button
                 onClick={() => handleViewDetails(product._id)}
                       className="add-to-cart" >
                      View Details <i class="bi bi-chevron-double-right"></i>
                    </button>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="row mt-3">
            <div className="col-md-12 mt-2">
              <div className="cartimagediv" style={{}}>
                <img src={offer} alt="" className="cartImage" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grocery">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-7">
              <h4>Pure Ghee, Pure Health</h4>
              <h2>
                <b>Nature’s Treasure</b> Premium Dry Fruits and Wholesome Goodness for You.
              </h2>
              <p>
              Power up with the pure energy of nature’s finest dry fruits — handpicked for taste, packed for wellness. Your health journey just got delicious!
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
            <h1>{inView && <CountUp start={0} end={100} duration={2} />}+</h1>
            <p>Product</p>
          </div>
          <div className="stat-item">
            <h1>{inView && <CountUp start={0} end={8} duration={2} />}+</h1>
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
                    <h6>Frozen Fruits</h6>
                    <h4>Best Quality Frozen Fruits</h4>
                    <p>
                    In the Frozen Fruits category, customers can enjoy 
                    a vibrant selection of fruits, harvested at peak ripeness 
                    and flash-frozen to lock in their natural flavor and nutrition. 
                    From everyday favorites to exotic varieties, this section offers 
                    the perfect
                    ingredients for smoothies, desserts, and healthy snacking.
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
                  <h6>Dry Fruits</h6>
                  <h4>Best Quality Dry Fruits
                  </h4>
                  <p>
                    In the Dry Fruits category, customers can 
                    discover a premium selection of nutrient-packed
                     dried fruits, carefully sourced and dried to 
                     perfection. Whether you’re looking for a quick 
                     snack, a boost of energy, or a natural ingredient 
                     for your recipes, this section offers the finest dried 
                     fruits, rich in flavor and health benefits.
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
                  <h6>Shilajit
                  </h6>
                  <h4>Pure and Authentic Shilajit
                  </h4>
                  <p>
                  In the Shilajit category, customers can 
                  discover the power of nature’s most potent
                   mineral supplement. Sourced from the pristine 
                   heights of the Himalayas, our Shilajit is pure, 
                   unrefined, and packed with essential minerals and 
                   nutrients. Perfect for boosting energy, enhancing
                    vitality, and promoting overall wellness, this natural supplement is a must-have for a balanced and healthy lifestyle.
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
                <Slider {...settings2}>
                  {articleArr.map((item, index) => (
                    <div>
                      <div className="article_card">
                        <img src={item.image} alt="" />
                        <h5>
                          {item.name.length > 40 ? `${item.name.slice(0, 40)}...` : item.name}
                        </h5>

                        <p>
                          {item.descrition.length > 200
                            ? `${item.descrition.slice(0, 200)}...`
                            : item.descrition}
                        </p>
                        {/* <p className="date">{item.date}</p> */}
                        {/* <div className="d-flex justify-start">
                          <Link className="button_" to="">
                            Read More
                          </Link>
                        </div> */}
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
