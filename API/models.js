const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var Int32 = require('mongoose-int32');

//User Schema
const UserSchema = new Schema({
  userID: {
    type: Int32,
    required: true
  },
  FirstName: {
    type: String,
    required: true
  },
  LastName: {
    type: String,
    required: true
  },
  Email: {
    type: String,
    required: true
  },
  Location: {
    type: String,
    required: true
  },
  isOwner: {
    type: Boolean,
    required: true
  },
  ShortBio: {
    type: String,
    required: true
  },
  ProfilePicture: {
    type: String,
    required: true
  }
});

// Chat Schema
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
module.exports = user = mongoose.model("User", UserSchema);