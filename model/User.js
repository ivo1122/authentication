const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique : true,
     },

    password: {
      type: String,
      required: true,
      max: 100,
    },
  },
  { collection: "users" }
);

module.exports = mongoose.model("userSchema", userSchema);
