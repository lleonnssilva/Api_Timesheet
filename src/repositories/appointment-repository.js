"use strict";
const mongoose = require("mongoose");
const Appointment = mongoose.model("Appointment");

exports.get = async () => {
  const res = await Appointment.find().populate("User");
  return res;
};

exports.getById = async id => {
  const res = await Appointment.findById(id);
  return res;
};

exports.getByEmployeeId = async EmployeeId => {
  const res = Appointment.find({
    employee: EmployeeId
  });
  return res;
};

exports.create = async data => {
  var appointment = new Appointment(data);
  await appointment.save();
};

exports.update = async (id, data) => {
  await Appointment.findByIdAndUpdate(id, {
    $set: {
      title: data.title,
      description: data.description,
      price: data.price,
      slug: data.slug
    }
  });
};

exports.delete = async id => {
  await Appointment.findOneAndRemove(id);
};
exports.delete = async id => {
  const res = await Appointment.findOneAndRemove(id);
  return res;
};
