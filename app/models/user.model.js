const mongoose = require("mongoose");
const User = mongoose.model(
  "User",
  new mongoose.Schema({
    userName: String,
    accountNumber: String,
    emailAddress: String,
    identityNumber:String,
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ]
  },{
    timestamps: true
})
);
module.exports = User;