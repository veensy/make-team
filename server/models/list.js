const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listSchema = new Schema({
  year:{type: String},
  month:{type: String},
  sunday:{type: String},
  title: { type: String },
  link:{ type: String },
});

module.exports = mongoose.model("List", listSchema);
