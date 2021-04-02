const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dateSchema = new Schema({
  year:{type: String},
  month:{type: String},
  sunday:{type :String}
});

module.exports = mongoose.model("Date", dateSchema);
