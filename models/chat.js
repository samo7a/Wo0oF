const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var Int32 = require('mongoose-int32');

// Create Schema
const ChatSchema = new Schema({
  AdopterID: {
    type: Int32,
    required: true
  },
  OwnerID: {
    type: Int32,
    required: true
  },
  ChatID: {
    type: Int32,
    required: true
  },
  DogID: {
    type: Int32,
    required: true
  },
  isApproved: {
    type: Boolean,
    required: true
  }
});

module.exports = adopter = mongoose.model("Chats", ChatSchema);
