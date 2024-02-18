const mongoose = require("mongoose");

const stoneSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, `{PATH} is required`],
      minlength: [2, "The name should be at least 2 characters"],
    },
    category: {
      type: String,
      required: [true, `{PATH} is required`],
      minlength: [3, "The category should be at least 3 characters"],
    },
    color: {
      type: String,
      required: [true, `{PATH} is required`],
      minlength: [2, "The color should be at least 2 characters"],
    },
    image: {
      type: String,
      required: [true, "{PATH} is required"],
      validate: {
        validator: function (value) {
          return /^https?:\/\//.test(value);
        },
        message: "URL must be valid",
      },
    },
    location: {
      type: String,
      required: [true, `{PATH} is required`],
      minlength: [5, "The Location should be between 5 and 15 characters"],
      maxlength: [15, "The Location should be between 5 and 15 characters"],
    },
    formula: {
      type: String,
      required: [true, `{PATH} is required`],
      minlength: [3, "The Formula should be between 3 and 30 characters"],
      maxlength: [30, "The Formula should be between 3 and 30 characters"],
    },
    description: {
      type: String,
      required: [true, "{PATH} is required"],
      minlength: [10, "The description should be at least 10 characters long"],
    },
    likedList: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],
    owner: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Stones = mongoose.model("Stones", stoneSchema);

module.exports = Stones;
