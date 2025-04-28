const mongoose = require("mongoose")

const pincodeSchema = new mongoose.Schema({
    pincode: {
        type: Number,
        required: true
    },
    shippingCharge: {
        type: Number,
        required: true
    }
})

const Pincode = mongoose.model("Pincode", pincodeSchema)

module.exports = Pincode