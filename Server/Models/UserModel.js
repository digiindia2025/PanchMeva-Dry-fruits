const mongoose = require("mongoose")



const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        default: ""
    },
    address: {
        type: String,
        default: ""
    },
    city: {
        type: String,
        default: ""
    },
    state: {
        type: String,
        default: ""
    },
    postalCode: {
        type: String,
        default: ""
    },
    country: {
        type: String,
        default: ""
    },
    
    role: {
        type: String,
        default: "User"
    }, resetToken: {  // New field for storing the reset token
        type: String,
        default: null,
    },
    resetTokenExpiration: {  // New field for storing token expiration time
        type: Date,
        default: null,
    },
}, {
    timestamps: true
})


const User = mongoose.model("User", userSchema)

module.exports = User