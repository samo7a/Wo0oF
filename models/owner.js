const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const OwnerSchema = new Schema({
  FirstName: {
    type: String,
    required: true
  },
  LastName: {
    type: String,
    required: true
  },
  Location: {
    type: String,
    required: true
  },
  Email: {
    type: String,
    required: true
  },
  Password: {
    type: String,
    required: true
  }
});

module.exports = owner = mongoose.model("owners", OwnerSchema);
