const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teamSchema = new Schema({
  year: { type: String },
  month: { type: String },
  day: { type: String },
  md: { type: String },
  bass: { type: String },
  guitar: { type: String },
  keyboard: { type: String },
  drum: { type: String },
  city: { type: String },
  event: { type: String },
  eventName: { type: String },
});

module.exports = mongoose.model('Team', teamSchema);
