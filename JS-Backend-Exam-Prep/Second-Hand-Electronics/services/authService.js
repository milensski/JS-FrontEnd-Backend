const User = require("../models/User");
const config = require("../config/config");
const bcrypt = require("bcrypt");
const jwt = require('../lib/jsonwebtoken')

exports.create = async (userData) => {

  const user = await User.findOne({
    $or: [{ email: userData.email }, { username: userData.username }],
  });

  if (user) {
    throw new Error("User already exists");
  }

  const password = await bcrypt.hash(
    userData.password,
    config.development.SALT_ROUNDS
  );

  userData.password = password;

  return User.create(userData);
};

exports.login = async (email, password) => {

    const user = await User.findOne({email})

    if (!user) {
        throw new Error('User or password mismatch')
    };

    isValid = await bcrypt.compare(password, user.password)

    if (!isValid) {
        throw new Error("User or password mismatch");
    };
    
    const payload = {
        _id: user._id,
        email: user.email,
        username: user.username,
    }

    const token = await jwt.sign(payload, config.development.SECRET)

    return token

}