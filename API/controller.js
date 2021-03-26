var mongoose = require('mongoose');
const User = require("../API/models.js");
  //User = mongoose.model('UserSchema');
  

exports.signup = function(req, res) {
	
  const jwt = require('../createJWT');
	
  // incoming: login, password
  // outgoing: id, firstName, lastName, error

  var error = '';

  const { Email, Password, Location, FirstName, LastName, userID, isOwner, ProfilePicture, ShortBio } = req.body;


  const newUser = new User({ Email : Email, Password: Password, Location: Location,
                             FirstName: FirstName, LastName: LastName,
                             userID: userID, isOwner: isOwner, ProfilePicture: ProfilePicture, ShortBio: ShortBio});

  try
  {
    newUser.save();
  }
  catch(e)
  {
    error = e.message;
    console.log(e.message);
  }

  var ret = { error: error };
  res.status(200).json(ret);
  
};



