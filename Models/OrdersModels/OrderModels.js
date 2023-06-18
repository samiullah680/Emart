const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema(
  {
    productDetails: {
      type: [],
    },
    shippingDetails: {
      address: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
      zipCode: {
        type: Number,
        required: true,
      },
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      number: {
        type: Number,
        required: true,
      },
    },
    customerDetails: {
      type: {},
    },
    orderStatus: {
      type: String,
      required: true,
    },
    paymentType: {
      type: String,
      required: true,
    },
    paymentStatus: {
      type: String,
      required: true,
    },
    discountPrice: {
      type: Number,
      required: true,
    },
    basePrice: {
      type: Number,
      required: true,
    },
    totlePrice: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("order", orderSchema);
