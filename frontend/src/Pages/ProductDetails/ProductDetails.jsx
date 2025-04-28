import React, { useEffect, useState } from "react";
import "./productdetails.css";
import ReactImageMagnify from "react-image-magnify";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import axios from "axios"; // Import axios
import Swal from "sweetalert2";

const ProductDetails = ({refs, setRef}) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  // Extract weight from the URL query params
  const queryParams = new URLSearchParams(location.search);
  const initialWeight = queryParams.get('weight') || ''; // default to empty if no weight in query
  const initialPrice = queryParams.get('price') || '';
  const stock = queryParams.get('stock');

  const [quantity, setQuantity] = useState(1);
  const [currentImage, setCurrentImage] = useState(""); // For tracking the selected image
  const [productDetails, setProductDetails] = useState(null);
  const [selectedWeight, setSelectedWeight] = useState(initialWeight);
  const [price, setPrice] = useState(initialPrice);
  const [availability, setAvailability] = useState(stock === "Available");
  const [weightData, setWeightData] = useState(null); // To store weight specific data



  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () =>
    setQuantity((prev) => (prev > 0 ? prev - 1 : 0));

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/single-product/${id}`);
        setProductDetails(response.data.product);
        setCurrentImage(response.data.product.productImage[0]);

        // Initialize weight data
        if (response.data.product.productInfo.length > 0) {
          const initialWeightData = response.data.product.productInfo.find(option => option.productweight === initialWeight);
          if (initialWeightData) {
            console.log("XXXXXXXX", initialWeightData)
            setWeightData(initialWeightData);
            setPrice(initialWeightData.productPrice);
            setAvailability(initialWeightData?.stock.trim().toLowerCase() === "available");
          }
        }
      } catch (error) {
        console.error("Error fetching product details", error);
      }
    };
    fetchProductDetails();
  }, [id, initialWeight]);

  const handleWeightChange = (event) => {
    const selectedWeight = event.target.value;
    setSelectedWeight(selectedWeight);

    // Find the selected weight data from the productInfo array
    const weightData = productDetails?.productInfo.find(option => option.productweight === selectedWeight);

    console.log(weightData)
    // If weight data is found, update price and stock availability
    if (weightData) {
      setPrice(weightData.productPrice);  // Update price with the selected weight's price
      setAvailability(weightData.stock === "Available");  // Set stock availability
      setWeightData(weightData);  // Store the weight data for later use
    }
  };


  const addToCart = () => {
    if (!productDetails) return;
    if (quantity < 1) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please select at least one item.',
      });
      return;
    }
    const existingCart = JSON.parse(sessionStorage.getItem("VesLakshna")) || [];
    const isProductInCart = existingCart.some((item) => item.productId === productDetails._id);

    if (isProductInCart) {
      Swal.fire({
        icon: 'warning',
        title: 'Product Already in Cart',
        text: 'This product is already in your cart.',
      });
    } else {
      const cartProduct = {
        productId: productDetails._id,
        productName: productDetails.productName,
        productImage: productDetails.productImage[0],
        price: price,  // Use updated price
        weight: selectedWeight,
        quantity,
      };
      existingCart.push(cartProduct);
      sessionStorage.setItem("VesLakshna", JSON.stringify(existingCart));
      setRef(!refs);
      Swal.fire({
        icon: 'success',
        title: 'Added to Cart',
        text: `${productDetails.productName} has been added to your cart.`,
      });
      navigate("/cart");
    }
  };


  if (!productDetails) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Helmet>
        <title>{productDetails.productName} - Buy {productDetails.productName} Online</title>
        <meta name="description" content={productDetails.productDescription} />
        <meta name="keywords" content={productDetails.productName} />
        <meta property="og:title" content={productDetails.productName} />
        <meta property="og:description" content={productDetails.productDescription} />
        <meta property="og:image" content={productDetails.productImage[0]} />
        <meta property="og:url" content={`https://example.com/products/${id}`} />
      </Helmet>

      <section className="minibreadCrumb">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 col-6">
              <Link
                to="/"
                className="back-icon text-decoration-none text-black d-flex align-items-center gap-2"
              >
                <i className="bi bi-arrow-left text-black"></i> Back to category
              </Link>
            </div>
            <div className="col-md-6 col-6">
              <div className="text-black d-flex justify-content-end gap-2">
                <Link className="text-black" to="/">
                  <i className="bi bi-house"></i>
                </Link>
                <Link className="text-black breadSpan" to="#">
                  {productDetails.productName}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="product-details">
        <div className="container">
          <div className="row">
            <div className="col-md-6 order-2 order-md-1">
              <div className="review">
                {/* Example review stars */}
                <i className="bi bi-star"></i>
                <i className="bi bi-star"></i>
                <i className="bi bi-star"></i>
                <i className="bi bi-star"></i>
                <i className="bi bi-star"></i>
              </div>
              <div className="product-details-content">
                {/* <h5>
                  <Link to="#">{productDetails.productName}</Link>
                </h5> */}
                <h1>{productDetails.productName}</h1>
                <p>
                  <b>Product Details:</b>
                </p>
                <div dangerouslySetInnerHTML={{ __html: productDetails.productDetails }} />
                <ul>
                  <li >
                    <b>Category:</b><span style={{ textTransform: "capitalize" }}> {productDetails.categoryName.categoryName}</span>
                  </li>
                  <li>
                    <b>Availability:</b> {weightData && weightData.stock === "Available" ? "In Stock" : "Out of Stock"}
                  </li>

                  <li>
                    <b>Weight:</b>
                    <select value={selectedWeight} onChange={handleWeightChange}>
                      {productDetails.productInfo.map((option, index) => (
                        <option key={index} value={option.productweight}>{option.productweight}</option>
                      ))}
                    </select>
                  </li>
                  <li>
                    <div>
                      <b>Quantity:</b>
                      <span className="quantity-buttons">
                        <button onClick={decreaseQuantity}>-</button>
                        <span style={{ margin: "0 10px" }}>{quantity}</span>
                        <button onClick={increaseQuantity}>+</button>
                      </span>
                    </div>
                  </li>
                  <li className="price">
                    <b>Price:</b>
                    <span className="fs-2">₹{price}</span>
                    &nbsp;
                  </li>
                  <li >
                    {availability ? (<div >
                      <button
                        onClick={addToCart}
                        className="btn text-white d-flex justify-content-center align-items-center"
                        style={{ width: '100%' }}
                      >
                        Add To Cart <i className="bi bi-cart ms-2"></i>
                      </button>
                    </div>) : (
                      <p className="out-of-stock-message">
                        This product is currently out of stock.
                      </p>
                    )}
                  </li>


                </ul>
              </div>
            </div>

            <div className="col-md-6 order-1 order-md-2">
              <div className="slider-container">
                <ReactImageMagnify
                  {...{
                    smallImage: {
                      alt: "Product Image",
                      isFluidWidth: true,
                      src: currentImage,
                    },
                    largeImage: {
                      src: currentImage,
                      width: 1200,
                      height: 1800,
                    },
                    enlargedImagePosition: "over", // Ensures zoom appears over the image
                  }}
                />
                <div className="thumbnail-container">
                  {productDetails.productImage.map((img, index) => (
                    <div
                      key={index}
                      className="thumbnail-wrapper"
                      onClick={() => setCurrentImage(img)}
                    >
                      <img src={img} alt={`Thumbnail ${index + 1}`} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="descriptionsTabs">
            <div className="container">
              <div id="exTab1" className="container">
                <ul className="nav nav-pills">
                  <li className="nav-item">
                    <Link
                      className="product-details-description-button active"
                      id="tab1"
                      data-bs-toggle="tab"
                      to="#1a"
                    >
                      Description
                    </Link>
                  </li>
                </ul>

                <div className="tab-content mt-3">
                  <div className="tab-pane active" id="1a">
                    <div dangerouslySetInnerHTML={{ __html: productDetails.productDescription }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial and other sections */}
    </>
  );
};

export default ProductDetails;
