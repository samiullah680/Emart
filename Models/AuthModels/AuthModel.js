const mongoose = require("mongoose");

const authSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, "Must provide first name"],
    },
    lastname: {
      type: String,
      required: [true, "Must provide last name"],
    },
    userType: {
      type: String,
      required: [true, "Must provide userType admin/customers"],
    },
    username: {
      type: String,
      minLength: [1, "username must be not be empty"],
      maxLength: [50, "username must not be greater than 50 letters"],
      required: [true, "Must provide a username"],
      unique: true,
    },
    number: {
      type: Number,
      required: [true, "Must provide a username"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Must provide email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Auth", authSchema);
