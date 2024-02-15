const Electronic = require("../models/Electronic");

exports.create = (formData, user_id) => {
  return Electronic.create(formData, { owner: user_id });
};
