const mongoose = require("mongoose");

const electronicSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, `${this} is required`],
    minlength: [10, "The name should be at least 10 characters"],
  },
  type: {
    type: String,
    required: [true, "Type is required"],

    minlength: [2, "The type should be at least 2 characters"],
  },
  damages: {
    type: String,
    required: [true, "Damages is required"],
    minlength: [10, "The damages should be at least 10 characters"],
  },
  image: {
    type: String,
    required: [true, "Image is required"],
    validate: {
      validator: function (value) {
        return /^https?:\/\//.test(value);
      },
      message: "URL must be valid",
    },
  },
  description: {
    type: String,
    required: [true, "Description is required"],

    minlength: [10, "The description should be at least 10 characters long"],
    maxlength: [
      200,
      "The description should be lower than 200 characters long",
    ],
  },
  production: {
    type: Number,
    required: [true, "Production is required"],
    minlength: [1900, "The production should be at above 1900"],
    maxlength: [
      2023,
      "The production should be lower than 2023 characters long",
    ],
  },
  exploitation: {
    type: Number,
    required: [true, "Exploitation is required"],
    minlength: [0, "The exploitation should be positive"],
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
    minlength: [0, "The price should be positive"],
  },
  buyingList: [
    {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  ],
  owner: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

const Electronic = mongoose.model('Electronic', electronicSchema)

module.exports = Electronic