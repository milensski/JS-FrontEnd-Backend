const Electronic = require("../models/Electronic");

exports.getAll = () => {
  return Electronic.find();
};

exports.create = (formData) => {
  return Electronic.create(formData);
};

exports.getOne = (_id) => {
  return Electronic.findById(_id).populate(["owner", "buyingList"]);
};

exports.buy = async (_id, userId) => {
  await Electronic.findByIdAndUpdate(_id, { $push: { buyingList: userId } });
};

exports.delete = async (_id) => {
  await Electronic.findByIdAndDelete(_id);
};

exports.edit = async (_id, formData) => {
  return await Electronic.findByIdAndUpdate(_id, formData)
}