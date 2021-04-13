const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listSchema = new Schema({
  year: { type: String },
  month: { type: String },
  day: { type: String },
  title: { type: String },
  link: { type: String },
  city: { type: String },
  event: { type: String },
  eventName: { type: String },
});

module.exports = mongoose.model('List', listSchema);
