const Category = require("../Models/CategoryModel");
const { uploadImage, deleteImage } = require("../utils/Cloudnary");
const { deleteLocalFile } = require("../utils/DeleteImageFromLoaclFolder");
const { handleMongooseError } = require("../utils/ErrorHandel");

const createCategory = async (req, res) => {
    let localFilePath;
    let cloudinaryImageUrl;
    try {
        localFilePath = req.file?.path;
        const { categoryName, categoryStatus } = req.body;

        console.log(req.body);

        if (!req.file) {
            return res.status(400).json({ message: "Category image is required" });
        }

        const normalizedCategoryName = categoryName.trim().toLowerCase();
        const existingCategory = await Category.findOne({
            categoryName: { $regex: `^${normalizedCategoryName}$`, $options: "i" },
        });

        if (existingCategory) {
            return res.status(400).json({ message: "Category name already exists" });
        }

        cloudinaryImageUrl = await uploadImage(localFilePath);

        // Parse `categoryStatus` to boolean before saving
        const newCategory = new Category({
            categoryName: normalizedCategoryName,
            categoryImage: cloudinaryImageUrl,
            categoryStatus: categoryStatus === 'true' // Convert string to boolean
        });

        const savedCategory = await newCategory.save();
        deleteLocalFile(localFilePath);

        res.status(201).json({
            message: "Category created successfully",
            category: savedCategory,
        });
    } catch (error) {
        if (localFilePath) {
            deleteLocalFile(localFilePath);
        }
        if (cloudinaryImageUrl) {
            await deleteImage(cloudinaryImageUrl);
        }
        const errors = handleMongooseError(error);
        res.status(400).json({ message: "Failed to create category", errors });
    }
};




// Get all categories
const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch categories", error: error.message });
    }
};

// Get a single category by ID
const getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findById(id);

        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch category", error: error.message });
    }
};

// Update a category
const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        let { categoryName, categoryStatus } = req.body; // Include categoryStatus
        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }
        if (categoryName) {
            const normalizedCategoryName = categoryName.trim().toLowerCase();
            const existingCategory = await Category.findOne({
                _id: { $ne: id }, // Exclude the current category
                categoryName: { $regex: `^${normalizedCategoryName}$`, $options: "i" },
            });
            if (existingCategory) {
                return res.status(400).json({ message: "Category name already exists" });
            }
            category.categoryName = normalizedCategoryName;
        }
        if (req.file) {
            await deleteImage(category.categoryImage);
            const imageUrl = await uploadImage(req.file.path);
            category.categoryImage = imageUrl;
            deleteLocalFile(req.file.path);
        }
        if (categoryStatus !== undefined) {
            category.categoryStatus = categoryStatus === 'true'; // Convert string to boolean
        }
        const updatedCategory = await category.save();
        res.status(200).json({
            message: "Category updated successfully",
            category: updatedCategory,
        });
    } catch (error) {
        if (req.file) {
            deleteLocalFile(req.file.path);
        }
        const errors = handleMongooseError(error);
        res.status(400).json({ message: "Failed to update category", errors });
    }
};



// Delete a category
const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findById(id);

        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }
        await deleteImage(category.categoryImage);
        await category.deleteOne();
        res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete category", error: error.message });
    }
};

module.exports = {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory,
};
