const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const teamSchema = new Schema({
  year:{type: String},
  month:{type: String},
  sunday:{type: String},
  md: { type: String },
  bass:{ type: String },
  guitar:{ type: String },
  keyboard: { type: String },
  drum:{ type: String },
});

module.exports = mongoose.model("Team", teamSchema);
