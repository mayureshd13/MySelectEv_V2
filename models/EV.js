const mongoose = require("mongoose");

const evSchema = new mongoose.Schema({
    name: String,
    brand: String,
    category: String,
    price: Number,
    range: Number,
    chargingTime: Number,
    topSpeed: Number,
    warranty: Number,
    image: String,
    description: String,

    // New fields
    createdAt: {
        type: Date,
        default: Date.now
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // change 'User' to your user model name if different
        required: false
    }
});

module.exports = mongoose.model("EV", evSchema);
