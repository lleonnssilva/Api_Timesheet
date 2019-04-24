"use strict";

const mongoose = require("mongoose");

const User = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    allocated: {
      type: String,
      required: true,
      trim: true
    },
    officeHourInput: {
      type: String,
      required: true,
      default: Date.now
    },
    officeHourExit: {
      type: String,
      required: true,
      default: Date.now
    },
    codeEmployee: {
      type: Number,
      required: true
    },
    active: {
      type: Boolean,
      default: true
    },
    roles: [
      {
        type: String,
        required: true,
        enum: ["user", "admin"],
        default: "admin"
      }
    ],
    Appointments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Appointment" }]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("User", User);
