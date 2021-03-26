var mongoose = require('mongoose');
const User = require("../API/models.js");
  //User = mongoose.model('UserSchema');
  const jwt = require('../createJWT');

exports.signup = function(req, res) {
	
  // incoming: login, password
  // outgoing: id, firstName, lastName, error

  var error = '';

  const { Email, Password, Location, FirstName, LastName, userID, isOwner, ProfilePicture, ShortBio } = req.body;

  const db = client.db();

  const newUser = new User({ Email : Email, Password: Password, Location: Location,
                             FirstName: FirstName, LastName: LastName,
                             userID: userID, isOwner: isOwner, ProfilePicture: ProfilePicture, ShortBio: ShortBio});

  if (jwt.isExpired(jwtToken))
  {
    var r = {error:'The JWT is no longer valid'};
    res.status(200).json(r);
    return;
  }

  try
  {
    const db = client.db();
    const result = db.collection('Users').insertOne(newUser);
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



