const Category = require("../Models/CategoryModel");
const Subcategory = require("../Models/subcategoryModel");
const { uploadImage, deleteImage } = require("../utils/Cloudnary");
const { deleteLocalFile } = require("../utils/DeleteImageFromLoaclFolder");

// Create a new subcategory
const createSubcategory = async (req, res) => {
    try {
        const { categoryName, subcategoryName, subcategoryStatus } = req.body;
        if (!req.file) {
            return res.status(400).json({ message: "Subcategory image is required" });
        }
        const imageUrl = await uploadImage(req.file.path);
        deleteLocalFile(req.file.path);
        const newSubcategory = new Subcategory({
            categoryName,
            subcategoryName,
            subcategoryImage: imageUrl,
            subcategoryStatus: subcategoryStatus || false,
        });
        const savedSubcategory = await newSubcategory.save();
        await Category.findByIdAndUpdate(categoryName, { subcategoryExit: true });
        res.status(201).json({
            message: "Subcategory created successfully",
            subcategory: savedSubcategory,
        });
    } catch (error) {
        if (req.file) {
            await deleteImage(req.file.path);
        }
        res.status(500).json({ message: "Failed to create subcategory", error: error.message });
    }
};

// Get all subcategories
const getAllSubcategories = async (req, res) => {
    try {
        const subcategories = await Subcategory.find().populate("categoryName", "categoryName");
        res.status(200).json({ subcategories });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch subcategories", error: error.message });
    }
};

// Get a single subcategory by ID
const getSubcategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const subcategory = await Subcategory.findById(id).populate("categoryName", "categoryName");
        if (!subcategory) {
            return res.status(404).json({ message: "Subcategory not found" });
        }
        res.status(200).json({ subcategory });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch subcategory", error: error.message });
    }
};

const updateSubcategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { categoryName, subcategoryName, subcategoryStatus } = req.body;
        const subcategory = await Subcategory.findById(id);
        if (!subcategory) {
            return res.status(404).json({ message: "Subcategory not found" });
        }

        const status = subcategoryStatus === 'true' ? true : subcategoryStatus === 'false' ? false : undefined;
        if (subcategoryName) subcategory.subcategoryName = subcategoryName;
        if (categoryName) subcategory.categoryName = categoryName;
        if (status !== undefined) subcategory.subcategoryStatus = status;

        if (req.file) {
            await deleteImage(subcategory.subcategoryImage);
            subcategory.subcategoryImage = await uploadImage(req.file.path);
            deleteLocalFile(req.file.path);
        }

        // If subcategoryStatus is false, update subcategoryExit to false in the Category
        if (status === false) {
            // Check if there are any active subcategories left in the category
            const activeSubcategories = await Subcategory.find({
                categoryName: subcategory.categoryName,
                subcategoryStatus: true,
            });

            // If no active subcategories are left, update subcategoryExit to false
            if (activeSubcategories.length === 0) {
                await Category.findByIdAndUpdate(subcategory.categoryName, { subcategoryExit: false });
            }
        }

        const updatedSubcategory = await subcategory.save();
        res.status(200).json({
            message: "Subcategory updated successfully",
            subcategory: updatedSubcategory,
        });
    } catch (error) {
        if (req.file) deleteImage(req.file.path);
        res.status(500).json({ message: "Failed to update subcategory", error: error.message });
    }
};



// Delete a subcategory
const deleteSubcategory = async (req, res) => {
    try {
        const { id } = req.params;
        const subcategory = await Subcategory.findById(id);
        if (!subcategory) {
            return res.status(404).json({ message: "Subcategory not found" });
        }

        // Delete the image from Cloudinary
        await deleteImage(subcategory.subcategoryImage);

        // Delete subcategory from the database
        await subcategory.deleteOne();

        // Check if there are any active subcategories left in the category
        const activeSubcategories = await Subcategory.find({
            categoryName: subcategory.categoryName,
            subcategoryStatus: true,
        });

        // If no active subcategories are left, update subcategoryExit to false
        if (activeSubcategories.length === 0) {
            await Category.findByIdAndUpdate(subcategory.categoryName, { subcategoryExit: false });
        }

        res.status(200).json({ message: "Subcategory deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete subcategory", error: error.message });
    }
};


module.exports = {
    createSubcategory,
    getAllSubcategories,
    getSubcategoryById,
    updateSubcategory,
    deleteSubcategory,
};
