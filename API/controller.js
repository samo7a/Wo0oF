
var mongoose = require('mongoose');
var User = mongoose.model('User')
  


exports.signup = function(req, res) {
	
  const jwt = require('../createJWT');
	
  // incoming: login, password	
  // outgoing: id, firstName, lastName, error

  var error = '';

  const { Email, Password, Location, FirstName, LastName, userID, isOwner, ProfilePicture, ShortBio } = req.body;
  console.log(req.body);


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


// Login Function
exports.login = function(req, res) {
	
  // incoming: login, password
  // outgoing: id, firstName, lastName, error

 var error = '';

  const { login, password } = req.body;
  
  //const results = await db.collection('Users').find({Login:login,Password:password}).toArray();
  //const results = await User.find({ Login: login, Password: password });
  results = [];

  var id = -1;
  var fn = '';
  var ln = '';

  if (results.length > 0)
  {
    id = results[0].UserId;
    fn = results[0].FirstName;
    ln = results[0].LastName;
  }

  try
  {
    ret = jwt.createToken( fn, ln, id );
  }
  catch(e)
  {
    ret = {error:e.message};
  }

  res.status(200).json(ret);

}