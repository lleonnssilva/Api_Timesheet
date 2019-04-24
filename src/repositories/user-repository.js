"use strict";
const mongoose = require("mongoose");
const User = mongoose.model("User");

exports.get = async data => {
  const res = await User.find().populate("Appointment");
  return res;
};

exports.create = async data => {
  var user = new User(data);
  await user.save();
};

exports.authenticate = async data => {
  const res = await User.findOne({
    email: data.email,
    password: data.password
  });
  return res;
};

exports.getById = async id => {
  const res = await User.findById(id);
  return res;
};

exports.delete = async id => {
  const res = await User.findOneAndRemove(id);
  return res;
};
