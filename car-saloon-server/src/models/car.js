const mongoose = require("mongoose");

const CarSchema = new mongoose.Schema({
  licensePlateNumber: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^[a-zA-Z]{3}-[0-9]{3}$/.test(v);
      },
    },
  },
  brandName: {
    type: String,
    required: true,
  },
  modelName: {
    type: String,
    required: true,
  },
  fuelType: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return ["benzin", "dizel", "elektromos", "hibrid"].includes(v);
      },
    },
  },
  dateOfManufacture: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Car", CarSchema);
