var mongoose = require('mongoose');
var nodemailer = require('nodemailer');
var bcrypt = require('bcrypt');
var http = require('http');
var url = require('url');
var User = mongoose.model('User');
var Token = mongoose.model('Token');
const crypto = require('crypto');
ObjectId = require('mongodb').ObjectID;
// Signup Function

// Almost complete, need to use GridFS to upload ProfilePicture
exports.signup = function(req, res) {

  const jwt = require('../createJWT');

  // incoming: Email, Password, Location, FirstName, LastName, userID, isOwner, ProfilePicture, ShortBio
  // outgoing: error, email

  var error = '';

  var { Email, Password, Location, FirstName, LastName, isOwner, ProfilePicture, ShortBio } = req.body;
  console.log(req.body);

  User.findOne({ Email: Email }, function (err, user)
  {
    // Check if error occurs
    if (err)
    {
      return res.status(500).send({msg: err.message});
    }
    // if email is exist into database i.e. email is associated with another user.
    else if (user)
    {
      console.log("User exists already :(");
      // return res.status(500).send({msg:'This email address is already associated with another account.'});
      return res.status(400).send({msg: "User exists already :("});
    }
    // if user does not exist into database then save the user into database for register account
    else
    {
      // password hashing for saving it into databse
      Password = bcrypt.hashSync(Password, 10);

      const newUser = new User({ Email : Email, Password: Password, Location: Location,
                                 FirstName: FirstName, LastName: LastName,
                                 isOwner: isOwner, ProfilePicture: ProfilePicture, ShortBio: ShortBio});

      // create and save user
      newUser.save(function (err)
      {
        if (err)
        {
          return res.status(500).send({msg: "Technical Error creating User :("});
        }

        // generate token and save
        var token = new Token({ _userId: newUser._id, token: crypto.randomBytes(16).toString('hex') });

        token.save(function (err)
        {
          if (err)
          {
            return res.status(500).send({msg: "Technical Error creating Token :("});
          }
        });

        // Send email (use credintials of in .env file)
        var transporter = nodemailer.createTransport(
        {
          service: 'Hotmail',
          auth:
          {
            user: `${process.env.EMAIL_ADDRESS}`,
            pass: `${process.env.EMAIL_PASSWORD}`,
          }
        });

        var mailOptions = {
          from: 'woofnoreply <woof4331@outlook.com>',
          to: Email,
          subject: 'Account Verification Link',
          text: 'Hello '+ FirstName +',\n\n' +
          'Please verify your account by clicking the link: \nhttp:\/\/' +
          req.headers.host + '\/verifyEmail\/' +
          Email + '\/' + token.token + '\n\nThank You!\n' };

        transporter.sendMail(mailOptions, function (err)
        {
          if (err)
          {
            return res.status(500).send({msg: "Technical Error sending Email :("});
          }

          else
          {
            console.log('Verification Email sent: ' + info.response)
            return res.status(200).send({msg: "Verification Email Sent! :)"});
          }
        });
      });
     }
  });

  return res.status(200).send({msg: "Verification Email Sent! :)"});
};

// Complete Login API
exports.login = function(req, res) {

	const jwt = require('../createJWT');

	// incoming: login, password
	// outgoing: id, firstName, lastName, error

	const { Email, Password } = req.body;

	User.findOne({Email: Email}, function(err, user)
  {
    // Check if error occurs
    if (err)
    {
      return res.status(500).send({msg: "Technical error, Please try logging in again"});
    }
    // user is not found in database i.e. user is not registered yet.
    else if (user === null)
    {
      // This line of code gives a header error.
      return res.status(500).send({msg: 'This email address is not associated with any account'});
    }
    // comapre user's password if user is find in above step
    else if(!bcrypt.compareSync(Password, user.Password))
    {
      return res.status(500).send({msg: 'Wrong Password!'});
    }
    // check user is verified or not
    else if (!user.isVerified)
    {
      return res.status(500).send({msg: 'Your Email has not been verified. Please click on resend'});
    }
    // user successfully logged in
    else
    {
      const ret = jwt.createToken( user.FirstName, user.LastName, user._id );
      console.log(jwt);

      res.status(200).json(ret);
    }
	});
};

// Complete editUser API
exports.editUser = function(req, res) {

  const jwt = require('../createJWT');

  // incoming: FirstName, LastName, isOwner, ProfilePicture, ShortBio
  // outgoing: error, jwt

  var { UserID, FirstName, LastName, isOwner, ProfilePicture, ShortBio } = req.body;
  console.log(req.body);

  // Forgive me Papa Szum for going over 100 characters
  User.findOneAndUpdate({ _id : ObjectId(UserID) }, { $set: {FirstName: FirstName, LastName: LastName, isOwner: isOwner, ProfilePicture: ProfilePicture, ShortBio: ShortBio}}, function(err, user)
  {
    // Check for any technical errors
    if (err)
    {
      return res.status(500).send('Technical error while attempting to update User information.');
    }
    // Update JWT and send confirmation message.
    else
    {
      const ret = jwt.createToken( user.FirstName, user.LastName, user._id );
      console.log(jwt);

      res.status(200).json(ret);
    }
  });
};

// Complete Verify Email API
exports.verifyEmail = function(req, res) {

  Token.findOne({ token: req.params.token }, function (err, token)
  {
    // Token is not found in the database then the token may have expired
    if (!token)
    {
      return res.status(400).send('Your verification link may have expired. Please re-verify your Email.');
    }
    // if token is found then check if they are a valid user
    else
    {

      User.findOne({ _id: token._userId }, function (err, user)
      {
        // User does not exist in database
        if (user === null)
        {
          console.log(user);
          return res.status(401).send('We were unable to find a user for this verification.');
        }
        // User is already verified
        else if (user.isVerified)
        {
          return res.status(200).send('User has already been verified.');
        }

        // Verify user
        else
        {
          // Change isVerified to true
          user.isVerified = true;

          user.save(function (err)
          {
            // Technical error occured
            if (err)
            {
              return res.status(500).send({msg: err.message});
            }
            // Account successfully verified
            else
            {
              return res.status(200).send(`${user.Email}` + ' has been successfully verified');
            }
          });
        }
      });
    }
  });
};

// Complete Reset Password API
exports.resetPassword = function(req, res) {

  // incoming: Email
  // outcoming: email

  const { Email } = req.body;

  User.findOne({ Email: Email }, function (err, user)
  {
    if (user === null)
    {
      res.status(403).send('email not in db');
    }

    else
    {

      const token = crypto.randomBytes(20).toString('hex');

      user.ResetPasswordToken = token;
      user.ResetPasswordExpires = Date.now() + 3600000;

      user.save();

      var transporter = nodemailer.createTransport(
      {
        service:'Hotmail',
        auth: {
            user: `${process.env.EMAIL_ADDRESS}`,
            pass: `${process.env.EMAIL_PASSWORD}`,
       },
      });

      var mailOptions =
      {
          from:'woofnoreply <woof4331@outlook.com>',
          to: Email,
          subject: 'Reset Password for Woof',
          text: 'Hi,\nWe have received a request to reset the password for Woof account ' + Email +
                ' You can reset your password by clicking the link below within one hour\n' + `http://localhost:5000/confirmPassword/${token}\n\n` +
                'If you did not request this, please ignore this email and your password will remain unchanged.\n'
      }

      console.log("Sending mail");

      transporter.sendMail(mailOptions, function(error, info)
      {
        if (error)
        {
            console.log(error);
        }
        else
        {
            console.log('Recovery Email sent: ' + info.response);
            return res.status(200).send({msg: 'A password recovery email has been sent. It will expire after one hour.'});
        }
      });
    }
  });
};

// Complete confirmPassword API
exports.confirmPassword = function(req, res) {

  var { newPassword } = req.body;

  User.findOne({ ResetPasswordToken: req.params.token }, function (err, user)
  {
    // User is not found into database then the token may have expired
    if (!user)
    {
      return res.status(500).send({msg: 'Your verification link may have expired. Please resend your email.'});
    }
    // If token is found then reset password
    else
    {
      // Password hashing for saving it into databse
      newPassword = bcrypt.hashSync(newPassword, 10);
      console.log(user.Email);
      user.Password = newPassword;
      user.ResetPasswordToken = '';
      user.ResetPasswordExpires = Date.now();
      user.save();
    }
  });

  return res.status(200).send('Password successfully reset!');
};
