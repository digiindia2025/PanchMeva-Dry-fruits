const mongoose = require("mongoose")

const SubcategorySchema = new mongoose.Schema({
    categoryName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    subcategoryName: {
        type: String,
        required: true
    },
    subcategoryImage: {
        type: String,
        required: true
    },
    subcategoryStatus: {
        type: Boolean,
        default: false
    },
    exitProduct: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

const Subcategory = mongoose.model("Subcategory", SubcategorySchema)

module.exports = Subcategory