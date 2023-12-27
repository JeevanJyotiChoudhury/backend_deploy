const mongoose = require("mongoose");

const userSignupSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    userName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);

const UserModel = mongoose.model("User", userSignupSchema);

module.exports = {
  UserModel,
};
