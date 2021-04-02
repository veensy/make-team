const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String },
  roleId: { type: String },
  isAdminId: { type: String },
  isDmId : { type : String }
});

module.exports = mongoose.model("User", userSchema);
