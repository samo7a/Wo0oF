const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const AdopterSchema = new Schema({
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
  },
  isOwner: {
    type: Boolean,
    required: true
  },
  ShortBio: {
    type: String,
  }
});

module.exports = adopter = mongoose.model("adopters", AdopterSchema);
