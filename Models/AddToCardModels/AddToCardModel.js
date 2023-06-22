const mongoose = require("mongoose");
const addToCard = new mongoose.Schema(
  {
    productDetails: {
      type: [],
      required: true,
    },
    customerDetails: {
      type: {},
      required: true,
    },
    basePrice: {
      type: Number,
    },
    discountPrice: {
      type: Number,
    },
    totlePrice: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("addToCard", addToCard);
