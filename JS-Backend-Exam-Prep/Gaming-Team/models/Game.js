const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, `{PATH} is required`],
    minlength: [4, "The name should be at least 4 characters"],
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
  price: {
    type: Number,
    required: [true, "{PATH} is required"],
    minlength: [0, "The price should be positive"],
  },
  description: {
    type: String,
    required: [true, "{PATH} is required"],

    minlength: [10, "The description should be at least 10 characters long"],
    maxlength: [
      200,
      "The description should be lower than 200 characters long",
    ],
  },
  genre: {
    type: String,
    required: [true, `{PATH} is required`],
    minlength: [2, "The genre should be at least 2 characters"],
  },
  platform: {
    type: String,
    required: true,
    enum: ["PC", "Nintendo", "PS4", "PS5", "XBOX"],
  },
  boughtBy: [
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

const Game = mongoose.model("Game", gameSchema);

module.exports = Game;
