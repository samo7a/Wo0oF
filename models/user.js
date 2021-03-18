const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var Int32 = require('mongoose-int32');

//Create Schema
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
    type: Data,
    required: true
  }
});

module.exports = user = mongoose.model("User", UserSchema);
