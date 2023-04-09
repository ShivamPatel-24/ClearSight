const mongoose = require("mongoose");
const paymentSchema = new mongoose.Schema({
    cardType: {
        type: String,
        required: true
    },
    creditCardNumber: {
        type: String,
        required: true,
        unique: true
    },
    securityCode: {
        type: String,
        required: true
    },
    expiryDate: {
        type: String,
        required: true
    },
    street: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Payment", paymentSchema);
