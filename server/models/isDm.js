const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const isDmSchema = new Schema({
  status: { type: String }
});

module.exports = mongoose.model("IsDm", isDmSchema);
