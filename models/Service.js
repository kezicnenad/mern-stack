const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: Number, required: true },
    logo: { type: Number, required: true },
    link: { type: String, required: true },
  },
  {
    collection: "users",
  }
);

const service = new mongoose.model("Service", serviceSchema);

module.exports = service;
