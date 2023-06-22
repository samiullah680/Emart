const mongoose = require('mongoose');
const productSchema = new mongoose.Schema(
    {
        user_id: {
            type: String,
            required: true,
            ref: "User",
        },
        title: {
            type: String,
            required: true,
        },
        Additional_Image: {
            type: String,
            required: true,
        },
        brand: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        rating: {
            type: Number,
            required: true,
            default: 0,
        },
        price: {
            type: Number,
            required: true,
        },
        discountPrice: {
            type: Number,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Product", productSchema);