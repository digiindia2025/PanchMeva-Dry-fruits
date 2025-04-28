const mongoose = require("mongoose")

const SubcribeSchema = new mongoose.Schema({
    subscribeEmail: {
        type: String,
        required: true
    }
})

const Subcribe = mongoose.model("Subcribe", SubcribeSchema)

module.exports = Subcribe