const User = require("../models/User");
const config = require("../config/config");
const bcrypt = require("bcrypt");
const jwt = require("../lib/jsonwebtoken");

exports.create = async (userData) => {
  const user = await User.findOne({ email: userData.email });

  if (user) {
    throw new Error("User already exists");
  }

  const password = await bcrypt.hash(
    userData.password,
    config.development.SALT_ROUNDS
  );

  userData.password = password;

  const createdUser = await User.create(userData);

  const token = await generateToken(createdUser);

  return token;
};

exports.login = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    throw new Error("Invalid email or password");
  }

  const token = await generateToken(user);

  return token;
};

function generateToken(user) {
  const payload = {
    _id: user._id,
    email: user.email,
  };

  return jwt.sign(payload, config.development.SECRET);
}
