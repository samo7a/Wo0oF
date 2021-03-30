const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var Int32 = require('mongoose-int32');

//User Schema
const UserSchema = new Schema({
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
  Password: {
    type: String,
    required: true
  },
  Location: {
    type: String,
  },
  isOwner: {
    type: Boolean,
    required: true
  },
  ShortBio: {
    type: String,
  },
  ResetPasswordToken: {
    type: String
  },
  ResetPasswordExpires: {
    type: Date
  },
  ProfilePicture: {
    type: String,
  },
  isVerified: {
    type: Boolean,
    default: false
  },

  SpamReports: [{
    Description: String,
    Date: Date,   
  }],

  Dogs: [{
      Name: String,
      Bio: String,
      Breed: String,
      Weight: mongoose.Schema.Types.Decimal128,
      Height: Int32,
      Age: Int32,
      Sex: String,
      DogID: String
    }]
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

// Token Schema
const TokenSchema = new Schema({
    _userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    token: {
      type: String,
      required: true
    },
    expireAt: {
      type: Date,
      default: Date.now,
      index:
      {
        expires: 86400000
      }
    }
});

module.exports = adopter = mongoose.model("Chats", ChatSchema);
module.exports = user = mongoose.model("User", UserSchema);
module.exports = token = mongoose.model("Token", TokenSchema);
