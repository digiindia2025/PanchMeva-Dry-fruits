const mongoose = require("mongoose")

const VourchersSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true
    },
    discount: {
        type: Number,
        required: true
    },
    vouchersStatus: {
        type: Boolean,
        default: false
    }
})

const CupanCode = mongoose.model("Cupan", VourchersSchema)

module.exports = CupanCode