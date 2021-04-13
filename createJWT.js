const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.createToken = function ( id, fn, ln, isOwner, email, phone, location, bio )
{
    try
    {
      const expiration = new Date();
      
      if (phone === undefined)
        phone = "";
      if (location === undefined)
        location = "";
      if (bio === undefined)
        bio = "";
      const user = {userId: id, firstName: fn, lastName: ln, isOwner: isOwner, email: email, phone: phone, location: location, bio: bio};

      console.log("Inside createJWT: " + JSON.stringify(user));

      // In order to expire with a value other than the default, use the
      // following.
      const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET,
         { expiresIn: '30m'} );

      var ret = { accessToken: accessToken };
    }
    catch(e)
    {
      var ret = {error:e.message};
    }
    return ret;
}

exports.isExpired = function( token )
{
  var isError = jwt.verify( token, process.env.ACCESS_TOKEN_SECRET,
    (err, verifiedJwt) =>
  {
    if( err )
    {
      return true;
    }
    else
    {
      return false;
    }
  });

  return isError;
}

exports.refresh = function( token )
{
  var ud = jwt.decode(token,{complete:true});

  var userId = ud.payload.id;
  var firstName = ud.payload.firstName;
  var lastName = ud.payload.lastName;
  var isOwner = ud.payload.isOwner;
  var email = ud.payload.email;
  var phone = ud.payload.phone;
  var location = ud.payload.location;
  var bio = ud.payload.bio;

  return createToken( userId, firstName, lastName, isOwner, email, phone, location, bio );
}
