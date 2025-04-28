const mongoose = require("mongoose")

const categorySchema = new mongoose.Schema({
    categoryName: {
        type: String,
        required: [true, "Category name is required"],
        unique: true,
        trim: true,
        minlength: [3, "Category name must be at least 3 characters long"],
    },
    categoryImage: {
        type: String,
        required: [true, "Category image is required"],
    },
    categoryStatus: {
        type: Boolean,
        default: false
    },
    subcategoryExit: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

const Category = mongoose.model("Category", categorySchema)

module.exports = Category