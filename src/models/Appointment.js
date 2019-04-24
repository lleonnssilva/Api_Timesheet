const mongoose = require("mongoose");
const Appointment = new mongoose.Schema(
  {
    inputHour: {
      type: String,
      required: true
    },
    exitHour: {
      type: String,
      required: true
    },
    latPoint: {
      type: String,
      required: true
    },
    lonPoint: {
      type: String,
      required: true
    }
    // userId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User"
    // }
  },
  {
    timestamps: true
  }
);
module.exports = mongoose.model("Appointment", Appointment);
