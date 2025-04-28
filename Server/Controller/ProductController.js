const Product = require("../Models/ProductModel");
const { uploadImage, deleteImage } = require("../utils/Cloudnary");
const { deleteLocalFile } = require("../utils/DeleteImageFromLoaclFolder");

// Create a new product
const createProduct = async (req, res) => {
    try {
        const { categoryName, productName, productDetails, productDescription, productInfo, productStatus, bestseller } = req.body;

        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: "At least one product image is required" });
        }

        // Upload images and get the URLs
        const imageUrls = [];
        for (let file of req.files) {
            const imageUrl = await uploadImage(file.path);
            imageUrls.push(imageUrl);
            deleteLocalFile(file.path); // Clean up local file
        }

        const newProduct = new Product({
            categoryName,
            productName,
            productDetails,
            productDescription,
            productInfo,
            productImage: imageUrls,// Store all image URLs in an array
            productStatus: productStatus || false,
            bestseller: bestseller || false
        });

        const savedProduct = await newProduct.save();
        res.status(201).json({
            message: "Product created successfully",
            product: savedProduct
        });
    } catch (error) {
        console.log(error)
        if (req.files) {
            // Ensure image deletion on failure for all uploaded images
            req.files.forEach(file => deleteImage(file.path));
        }
        res.status(500).json({ message: "Failed to create product", error: error.message });
    }
};

// Get all products
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().populate("categoryName", "categoryName categoryStatus");
        res.status(200).json({ products });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch products", error: error.message });
    }
};

// Get a single product by ID
const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id)
        const product = await Product.findById(id).populate("categoryName", "categoryName categoryStatus");

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ product });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Failed to fetch product", error: error.message });
    }
};

// Update a product
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { categoryName, productName, productDetails, productDescription, productInfo, productStatus ,bestseller} = req.body;

        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        if (categoryName) product.categoryName = categoryName;
        if (productName) product.productName = productName;
        if (productDetails) product.productDetails = productDetails;
        if (productDescription) product.productDescription = productDescription;
        if (productInfo) product.productInfo = productInfo;
        if (productStatus !== undefined) product.productStatus = productStatus;
        if (bestseller !== undefined) product.bestseller = bestseller;

        if (req.files && req.files.length > 0) {
            // Delete old images from Cloudinary before updating
            for (let oldImage of product.productImage) {
                await deleteImage(oldImage);
            }

            const imageUrls = [];
            for (let file of req.files) {
                const imageUrl = await uploadImage(file.path);
                imageUrls.push(imageUrl);
                deleteLocalFile(file.path); // Clean up local file
            }

            product.productImage = imageUrls; // Update product images
        }

        const updatedProduct = await product.save();
        res.status(200).json({
            message: "Product updated successfully",
            product: updatedProduct
        });
    } catch (error) {
        if (req.files) {
            // Ensure image deletion on failure for all uploaded images
            req.files.forEach(file => deleteImage(file.path));
        }
        res.status(500).json({ message: "Failed to update product", error: error.message });
    }
};

// Delete a product
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Delete images from Cloudinary before deleting the product
        for (let oldImage of product.productImage) {
            await deleteImage(oldImage);
        }

        await product.deleteOne();
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete product", error: error.message });
    }
};

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
};
