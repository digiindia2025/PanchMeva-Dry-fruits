const Actical = require("../Models/ArticalModel");
const { uploadImage, deleteImage } = require("../utils/Cloudnary");
const { deleteLocalFile } = require("../utils/DeleteImageFromLoaclFolder");


// CREATE
const createActical = async (req, res) => {
    try {
        const { name, descrition } = req.body;
        let imageUrl = '';

        if (req.file) {
            imageUrl = await uploadImage(req.file.path); // Upload image to Cloudinary
        }

        const newActical = new Actical({
            name,
            descrition,
            image: imageUrl,
        });

        await newActical.save();

        if (req.file) {
            deleteLocalFile(req.file.path);
        }

        res.status(201).json(newActical);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to create Actical" });
    }
};

// READ (GET all Acticals)
const getAllActicals = async (req, res) => {
    try {
        const acticals = await Actical.find();
        res.status(200).json(acticals.reverse());
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch Acticals" });
    }
};

// READ (GET Actical by ID)
const getActicalById = async (req, res) => {
    try {
        const actical = await Actical.findById(req.params.id);
        if (!actical) {
            return res.status(404).json({ message: "Actical not found" });
        }
        res.status(200).json(actical);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch Actical" });
    }
};

// UPDATE
const updateActical = async (req, res) => {
    try {
        const { name, descrition } = req.body;
        const { id } = req.params;
        const updatedData = { name, descrition };

        // If an image is uploaded, handle the update
        if (req.file) {
            const actical = await Actical.findById(id);

            // If there's an existing image, delete it from Cloudinary and locally
            if (actical && actical.image) {
                await deleteImage(actical.image); // Delete image from Cloudinary
            }

            updatedData.image = await uploadImage(req.file.path); // Upload new image to Cloudinary
            deleteLocalFile(req.file.path); // Delete image from local storage
        }

        const updatedActical = await Actical.findByIdAndUpdate(id, updatedData, { new: true });
        if (!updatedActical) {
            return res.status(404).json({ message: "Actical not found" });
        }

        res.status(200).json(updatedActical);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to update Actical" });
    }
};

// DELETE
const deleteActical = async (req, res) => {
    try {
        const actical = await Actical.findById(req.params.id);
        if (!actical) {
            return res.status(404).json({ message: "Actical not found" });
        }

        // Delete the image from Cloudinary and locally
        if (actical.image) {
            await deleteImage(actical.image);
        }

        await Actical.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Actical deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to delete Actical" });
    }
};

module.exports = {
    createActical,
    getAllActicals,
    getActicalById,
    updateActical,
    deleteActical,
};
