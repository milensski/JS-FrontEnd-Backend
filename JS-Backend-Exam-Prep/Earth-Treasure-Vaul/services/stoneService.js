const Stones = require("../models/Stones");

exports.getAll = () => {
  return Stones.find();
};

exports.search = (searchData) => {
  regex = new RegExp(`${searchData}`, "i");
  return Stones.find({ name: regex });
};

exports.getLast = (limit) => {
  return Stones.find().sort({ createdAt: -1 }).limit(limit);
};

exports.create = (formData) => {
  return Stones.create(formData);
};

exports.getOne = (_id) => {
  return Stones.findById(_id).populate(["owner", "likedList"]);
};

exports.like = async (_id, userId) => {
  await Stones.findByIdAndUpdate(
    _id,
    { $push: { likedList: userId } },
    { runValidators: true }
  );
};

exports.delete = async (_id) => {
  await Stones.findByIdAndDelete(_id);
};

exports.edit = async (_id, formData) => {
  return await Stones.findByIdAndUpdate(_id, formData, { runValidators: true });
};
