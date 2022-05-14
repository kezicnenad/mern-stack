const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let userSchema = new Schema(
  {
    username: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
  },
  {
    collection: "users",
  }
);

module.exports = mongoose.model("User", userSchema);