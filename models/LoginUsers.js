const mongoose = require("mongoose");
const loginSchema = new mongoose.Schema({
  username: String,
  userId: String,
  picture: String,
});
const LoginUser = mongoose.model("LoginUsers", loginSchema);

module.exports = LoginUser;
