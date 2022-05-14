const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let serviceSchema = new Schema(
  {
    service_name: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    logo: {
      type: String,
      require: true,
    },
    link: {
      type: String,
      require: true,
    },
  },
  {
    collection: "services",
  }
);

module.exports = mongoose.model("Service", serviceSchema);
