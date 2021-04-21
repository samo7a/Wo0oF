const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var Int32 = require("mongoose-int32");

//User Schema
const UserSchema = new Schema({
  FirstName: {
    type: String,
    required: true,
  },

  LastName: {
    type: String,
    required: true,
  },

  Email: {
    type: String,
    required: true,
  },

  Password: {
    type: String,
    required: true,
  },

  Location: {
    type: String,
  },

  isOwner: {
    type: Boolean,
    required: true,
  },

  Phone: {
    type: String,
  },

  ShortBio: {
    type: String,
  },

  ResetPasswordToken: {
    type: String,
  },

  ResetPasswordExpires: {
    type: Date,
  },

  isVerified: {
    type: Boolean,
    default: false,
  },

  FileName: {
    type: String,
  },

  SpamReports: [
    {
      Description: String,
      Date: Date,
    },
  ],

  LikedDogs: [
    {
      IsLiked: Boolean,
      DogID: String
    }
  ],

  Dogs: [
    {
      DogID: String,
      Name: String,
      Bio: String,
      Breed: String,
      Weight: mongoose.Schema.Types.Decimal128,
      Size: String,
      Age: Int32,
      Sex: String,
      isPottyTrained: Boolean,
      isNeutered: Boolean,
      OwnerID: String,
      FileID: Schema.Types.ObjectId
    },
  ],
});

// Chat Schema
const ChatSchema = new Schema({
  AdopterID: {
    type: String,
    required: true,
  },

  OwnerID: {
    type: String,
    required: true,
  },

  DogID: {
    type: String,
    required: true,
  },

  Messages: [
    {
      text: String,
      createdAt: Date,
      userID: String,
    },
  ],

});

// Token Schema
const TokenSchema = new Schema({
  _userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },

  token: {
    type: String,
    required: true,
  },

  expireAt: {
    type: Date,
    default: Date.now,
    index: {
      expires: 86400000,
    },
  },
});

module.exports = chat = mongoose.model("Chat", ChatSchema);
module.exports = user = mongoose.model("User", UserSchema);
module.exports = token = mongoose.model("Token", TokenSchema);
