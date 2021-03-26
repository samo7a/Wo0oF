
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
	
	const jwt = require('../createJWT');
	
	// incoming: login, password
	// outgoing: id, firstName, lastName, error

	const { login, password } = req.body;

	User.findOne({Email: login, Password: password}, function(err, user) {
		
		if (err)
			res.send(err);
	});
	
	ret = jwt.createToken( user.FirstName, User.LastName, User.id );

	res.status(200).json(ret);

}