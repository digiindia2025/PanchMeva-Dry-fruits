import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import JoditEditor from 'jodit-react';

const EditProduct = () => {
    const navigate = useNavigate()
    const { id } = useParams();  // Get the product ID from the URL
    const [isLoading, setIsLoading] = useState(false);
    const [categories, setCategories] = useState([]);  // State to store categories
    const [formData, setFormData] = useState({
        categoryName: '',
        productName: '',
        productDetails: '',
        productDescription: '',
        productInfo: [{ productweight: '', productPrice: '', tax: '', productDiscountPercentage: 0, productFinalPrice: 0, stock: 'Available' }],
        productImage: [],
        productStatus: false,
        bestseller: false
    });

    // Fetch categories from API when the component mounts
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/all-category');
                setCategories(response.data);  // Set categories to state
            } catch (error) {
                toast.error('Error fetching categories');
            }
        };

        fetchCategories();

        // Fetch the product details when the component mounts
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/single-product/${id}`);
                const product = response.data.product;

                setFormData({
                    categoryName: product.categoryName._id,
                    productName: product.productName,
                    productDetails: product.productDetails,
                    productDescription: product.productDescription,
                    productInfo: product.productInfo,
                    productImage: product.productImage,
                    productStatus: product.productStatus || false,
                    bestseller: product.bestseller || false
                });
            } catch (error) {
                toast.error('Error fetching product');
            }
        };

        fetchProduct();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        setFormData(prevState => ({
            ...prevState,
            productImage: Array.from(e.target.files)
        }));
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: checked// Toggle the product status
        }));
    };

    const handleAddPoint = () => {
        setFormData(prevState => ({
            ...prevState,
            productInfo: [...prevState.productInfo, { productweight: '', productPrice: '', tax: '', productDiscountPercentage: 0, productFinalPrice: 0, stock: 'Available' }]
        }));
    };

    const handlePointChange = (index, e) => {
        const { name, value } = e.target;
        const updatedProductInfo = [...formData.productInfo];
        updatedProductInfo[index][name] = value;

        // If the price or discount percentage changes, calculate the final price
        if (name === 'productPrice' || name === 'productDiscountPercentage') {
            const price = parseFloat(updatedProductInfo[index].productPrice) || 0;
            const discountPercentage = parseFloat(updatedProductInfo[index].productDiscountPercentage) || 0;
            const finalPrice = price - (price * discountPercentage / 100);

            // Update the final price in the form data
            updatedProductInfo[index].productFinalPrice = finalPrice.toFixed(2); // You can set the precision you prefer
        }

        setFormData({ ...formData, productInfo: updatedProductInfo });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Prepare FormData to submit
            const formDataToSubmit = new FormData();
            formDataToSubmit.append('categoryName', formData.categoryName);
            formDataToSubmit.append('productName', formData.productName);
            formDataToSubmit.append('productDetails', formData.productDetails);
            formDataToSubmit.append('productDescription', formData.productDescription);
            formDataToSubmit.append('productStatus', formData.productStatus);
            formDataToSubmit.append('bestseller', formData.bestseller);


            // Append productInfo
            formData.productInfo.forEach((point, index) => {
                formDataToSubmit.append(`productInfo[${index}][productweight]`, point.productweight);
                formDataToSubmit.append(`productInfo[${index}][productPrice]`, point.productPrice);
                formDataToSubmit.append(`productInfo[${index}][productDiscountPercentage]`, point.productDiscountPercentage);
                formDataToSubmit.append(`productInfo[${index}][productFinalPrice]`, point.productFinalPrice);
                formDataToSubmit.append(`productInfo[${index}][tax]`, parseInt(point.tax));
                formDataToSubmit.append(`productInfo[${index}][stock]`, point.stock);
            });

            // Append productImage
            formData.productImage.forEach(image => {
                formDataToSubmit.append('productImage', image);
            });

            // Send the data to backend API for updating the product
            const response = await axios.put(`http://localhost:8000/api/update-product/${id}`, formDataToSubmit, { headers: { 'Content-Type': 'multipart/form-data' } });
            toast.success(response.data.message);
            navigate("/all-products")
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            toast.error('Error updating product');
            setIsLoading(false);
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>Edit Product</h4>
                </div>
                <div className="links">
                    <Link to="/all-products" className="add-new">Back <i className="fa-regular fa-circle-left"></i></Link>
                </div>
            </div>

            <div className="d-form">
                <form className="row g-3" onSubmit={handleSubmit}>
                    <div className="col-md-4">
                        <label htmlFor="categoryName" className="form-label">Category</label>
                        <select
                            name="categoryName"
                            className="form-select"
                            id="categoryName"
                            value={formData.categoryName}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">Select Category</option>
                            {/* Map through categories and display them dynamically */}
                            {categories.map((category) => (
                                <option key={category._id} value={category._id}>
                                    {category.categoryName}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="productName" className="form-label">Product Name</label>
                        <input
                            type="text"
                            name="productName"
                            className="form-control"
                            id="productName"
                            value={formData.productName}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="col-12">
                        <label htmlFor="productDetails" className="form-label">Product Details</label>
                        <JoditEditor
                            value={formData.productDetails}
                            onChange={value => setFormData({ ...formData, productDetails: value })}
                        />
                    </div>
                    <div className="col-12">
                        <label htmlFor="productDescription" className="form-label">Product Description</label>
                        <JoditEditor
                            value={formData.productDescription}
                            onChange={value => setFormData({ ...formData, productDescription: value })}
                        />
                    </div>

                    {/* Product Points Section */}
                    <div className="col-12">
                        <label className="form-label">Product Points</label>
                        {formData.productInfo.map((point, index) => (
                            <div key={index} className="d-flex mb-2">
                                <div className="col-md-1 me-2">
                                    <label className="form-label">Weight</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="productweight"
                                        value={point.productweight}
                                        onChange={(e) => handlePointChange(index, e)}
                                        placeholder="Weight"
                                        required
                                    />
                                </div>
                                <div className="col-md-2 me-2">
                                    <label className="form-label">Price</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="productPrice"
                                        value={point.productPrice}
                                        onChange={(e) => handlePointChange(index, e)}
                                        placeholder="Price"
                                        required
                                    />
                                </div>
                                <div className="col-md-2 me-2">
                                    <label className="form-label">Discount %</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="productDiscountPercentage"
                                        value={point.productDiscountPercentage}
                                        onChange={(e) => handlePointChange(index, e)}
                                        placeholder="Discount Percentage"
                                        required
                                    />
                                </div>
                                <div className="col-md-2 me-2">
                                    <label className="form-label">Final Price</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="productFinalPrice"
                                        value={point.productFinalPrice}
                                        onChange={(e) => handlePointChange(index, e)}
                                        placeholder="Final Price"
                                        required
                                    />
                                </div>
                                <div className="col-md-1 me-2">
                                    <label className="form-label">Tax %</label>
                                    <select name="tax" id="" value={point.tax} onChange={(e) => handlePointChange(index, e)} className='form-select'>
                                        <option value="">Tax</option>
                                        <option value="3%">3%</option>
                                        <option value="5%">5%</option>
                                        <option value="12%">12%</option>
                                        <option value="18%">18%</option>
                                        <option value="28%">28%</option>
                                    </select>
                                </div>
                                <div className="col-md-2 me-2">
                                    <label className="form-label">Stock</label>
                                    <select
                                        className="form-select"
                                        name="stock"
                                        value={point.stock}
                                        onChange={(e) => handlePointChange(index, e)}
                                        required
                                    >
                                        <option value="Available">Available</option>
                                        <option value="UnAvailable">UnAvailable</option>
                                    </select>
                                </div>
                                <button
                                    type="button"
                                    className="btn btn-danger col-md-1" style={{ height: "40px", marginTop: "28px" }}
                                    onClick={() => {
                                        const updatedProductInfo = formData.productInfo.filter((_, i) => i !== index);
                                        setFormData({ ...formData, productInfo: updatedProductInfo });
                                    }}
                                >
                                    Delete
                                </button>
                            </div>
                        ))}
                        <button type="button" className="btn btn-primary" onClick={handleAddPoint}>Add Point</button>
                    </div>

                    {/* Image upload section */}
                    <div className="mb-4">
                        {formData.productImage.length > 0 &&
                            formData.productImage.map((image, index) => {
                                if (image instanceof Blob) {  // Ensure the image is a valid file object
                                    return (
                                        <img
                                            key={index}
                                            src={URL.createObjectURL(image)}
                                            className="img-thumbnail mb-2"
                                            style={{ width: '100px', height: '100px' }}
                                            alt="Product Preview"
                                        />
                                    );
                                }
                                return null;
                            })
                        }
                    </div>


                    <div className="mb-4">
                        <input
                            type="file"
                            name="productImage"
                            multiple
                            className="form-control-file border p-2 mt-1 rounded shadow-sm"
                            onChange={handleFileChange}
                        />
                    </div>
                    <div className="col-md-6">
                        <input
                            type="checkbox"
                            name="productStatus"
                            checked={formData.productStatus}
                            onChange={handleCheckboxChange}
                        />
                        &nbsp; <label className="form-label">Product Status (Available/Unavailable)</label>
                    </div>
                    <div className="col-md-6">
                        <input
                            type="checkbox"
                            name="bestseller"
                            checked={formData.bestseller}
                            onChange={handleCheckboxChange}
                        />
                        &nbsp; <label className="form-label">Product Best Seller (Available/Unavailable)</label>
                    </div>
                    <div className="col-12 text-center">
                        <button
                            type="submit"
                            className={`btn ${isLoading ? 'not-allowed' : 'allowed'}`}
                            disabled={isLoading}
                        >
                            {isLoading ? "Please Wait..." : "Update Product"}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default EditProduct;
