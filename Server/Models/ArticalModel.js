const mongoose = require("mongoose")

const AcrticalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    descrition: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const Actical = mongoose.model("Actical", AcrticalSchema)

module.exports = Actical