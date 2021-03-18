const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var Int32 = require('mongoose-int32');

// Create Schema
const MessageSchema = new Schema({
  ChatID: {
    type: Int32,
    required: true
  },
  SenderID: {
    type: Int32,
    required: true
  },
  TimeStamp: {
    type: Date,
    required: true
  },
  Content: {
    type: String,
    required: true
  }
});

module.exports = message = mongoose.model("Message", MessageSchema);
