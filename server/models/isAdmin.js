const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const isAdminSchema = new Schema({
    status: { type: String }
});

module.exports = mongoose.model("IsAdmin", isAdminSchema);
