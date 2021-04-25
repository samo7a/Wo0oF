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

  SpamReports: [
    {
      Description: String,
      Date: Date,
    },
  ],

  LikedDogs: [
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
    },
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
    },
  ],
  LikedAdopters: [
    {
      FirstName: String,
      LastName: String,
      Email: String,
      Phone: String,
      ShortBio: String,
      UserID: String,
      Dog:{
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
      },
    },
  ],
  DislikedDogs: [
    {
      DogID: String,
    },
  ],
});

// Chat Schema
const ChatSchema = new Schema({
  AdopterID: {
    type: String,
  },

  OwnerID: {
    type: String,
  },

  Dog: {
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
