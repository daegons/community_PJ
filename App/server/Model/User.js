const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userNum: Number,
    email: String,
    displayName: String,
    uid: String,
    //프로필 img 추가
    photoURL: String,
  },
  { collection: "users" }
);
const User = mongoose.model("User", userSchema);

module.exports = { User };
