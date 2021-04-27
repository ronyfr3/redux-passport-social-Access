const mongoose = require("mongoose");
const loginSchema = new mongoose.Schema({
  username: String,
  googleId: String,
  facebookId: String,
});
const LoginUser = mongoose.model("LoginUsers", loginSchema);

module.exports = LoginUser;
