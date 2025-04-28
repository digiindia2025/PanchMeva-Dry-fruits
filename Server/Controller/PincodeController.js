const Pincode = require("../Models/PincodeModel");


// Create a new pincode
const createPincode = async (req, res) => {
    try {
        const { pincode, shippingCharge } = req.body;
        const newPincode = new Pincode({ pincode, shippingCharge });

        await newPincode.save();
        res.status(201).json({
            message: "Pincode created successfully!",
            pincode: newPincode
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating pincode" });
    }
};

// Get all pin codes
const getAllPinCodes = async (req, res) => {
    try {
        const pinCodes = await Pincode.find();
        res.status(200).json(pinCodes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching pin codes" });
    }
};

// Get a single pincode by its ID
const getPincodeById = async (req, res) => {
    try {
        const pincode = await Pincode.findById(req.params.id);
        if (!pincode) {
            return res.status(404).json({ message: "Pincode not found" });
        }
        res.status(200).json(pincode);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching pincode" });
    }
};

// Update a pincode by its ID
const updatePincode = async (req, res) => {
    try {
        const { pincode, shippingCharge } = req.body;
        const updatedPincode = await Pincode.findByIdAndUpdate(
            req.params.id,
            { pincode, shippingCharge },
            { new: true }
        );
        if (!updatedPincode) {
            return res.status(404).json({ message: "Pincode not found" });
        }
        res.status(200).json({
            message: "Pincode updated successfully!",
            pincode: updatedPincode
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating pincode" });
    }
};

// Delete a pincode by its ID
const deletePincode = async (req, res) => {
    try {
        const deletedPincode = await Pincode.findByIdAndDelete(req.params.id);
        if (!deletedPincode) {
            return res.status(404).json({ message: "Pincode not found" });
        }
        res.status(200).json({ message: "Pincode deleted successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting pincode" });
    }
};

module.exports = {
    createPincode,
    getAllPinCodes,
    getPincodeById,
    updatePincode,
    deletePincode
};
