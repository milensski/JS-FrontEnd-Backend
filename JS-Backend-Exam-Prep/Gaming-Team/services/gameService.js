const Game = require("../models/Game");

exports.getAll = () => {
  return Game.find();
};

exports.search = (searchData) => {
  regex = new RegExp(`.*${searchData.name}`);
  return Game.find({
    $or: [
      { name: { $regex: regex , $options: "i" } },
      { platform: searchData.platform },
    ],
  });
};

exports.create = (formData) => {
  return Game.create(formData);
};

exports.getOne = (_id) => {
     try {
      return Game.findById(_id).populate(["owner", "boughtBy"]);
    } catch (e) {
      return console.log(e);
    }
};

exports.buy = async (_id, userId) => {
  await Game.findByIdAndUpdate(
    _id,
    { $push: { boughtBy: userId } },
    { runValidators: true }
  );
};

exports.delete = async (_id) => {
  await Game.findByIdAndDelete(_id);
};

exports.edit = async (_id, formData) => {
  return await Game.findByIdAndUpdate(_id, formData, { runValidators: true });
};
