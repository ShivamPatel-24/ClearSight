const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
    images: {
        type: Array,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
});

module.exports = mongoose.model("Item", itemSchema);