const Banner = require("../Models/BannerModel");
const { uploadImage, deleteImage } = require("../utils/Cloudnary");
const { deleteLocalFile } = require("../utils/DeleteImageFromLoaclFolder");


// Create Banner
const createBanner = async (req, res) => {
    try {
        const { bannerStatus } = req.body;

        if (!req.file) {
            return res.status(400).json({ message: "No image uploaded" });
        }

        const imageUrl = await uploadImage(req.file.path);

        const newBanner = new Banner({
            bannerImage: imageUrl,
            bannerStatus: bannerStatus || false
        });

        await newBanner.save();
        deleteLocalFile(req.file.path);  // Clean up the local file after uploading to Cloudinary

        res.status(201).json({ message: "Banner created successfully", banner: newBanner });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error while creating banner" });
    }
};

// Get All Banners
const getAllBanners = async (req, res) => {
    try {
        const banners = await Banner.find();
        res.status(200).json({ banners });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error while fetching banners" });
    }
};

// Get Banner by ID
const getBannerById = async (req, res) => {
    try {
        const banner = await Banner.findById(req.params.id);

        if (!banner) {
            return res.status(404).json({ message: "Banner not found" });
        }

        res.status(200).json({ banner });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error while fetching the banner" });
    }
};

// Update Banner
const updateBanner = async (req, res) => {
    try {
        const banner = await Banner.findById(req.params.id);

        if (!banner) {
            return res.status(404).json({ message: "Banner not found" });
        }

        // If a new image is uploaded, delete the old image from Cloudinary
        if (req.file) {
            await deleteImage(banner.bannerImage);
            const imageUrl = await uploadImage(req.file.path);
            banner.bannerImage = imageUrl;
            deleteLocalFile(req.file.path);  // Clean up local file
        }

        if (req.body.bannerStatus !== undefined) {
            banner.bannerStatus = req.body.bannerStatus;
        }

        await banner.save();
        res.status(200).json({ message: "Banner updated successfully", banner });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error while updating the banner" });
    }
};

// Delete Banner
const deleteBanner = async (req, res) => {
    try {
        const banner = await Banner.findById(req.params.id);

        if (!banner) {
            return res.status(404).json({ message: "Banner not found" });
        }

        await deleteImage(banner.bannerImage);  // Delete image from Cloudinary
        await banner.deleteOne();  // Remove banner from database

        res.status(200).json({ message: "Banner deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error while deleting the banner" });
    }
};

module.exports = {
    createBanner,
    getAllBanners,
    getBannerById,
    updateBanner,
    deleteBanner
};
