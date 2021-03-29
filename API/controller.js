var mongoose = require('mongoose');
var nodemailer = require('nodemailer');
var bcrypt = require('bcrypt');
var http = require('http');
var url = require('url');
var User = mongoose.model('User');
var Token = mongoose.model('Token');
const crypto = require('crypto');
// Signup Function

// WIP, kinda
exports.signup = function(req, res) {

  const jwt = require('../createJWT');

  // incoming: Email, Password, Location, FirstName, LastName, userID, isOwner, ProfilePicture, ShortBio
  // outgoing: error, email

  var error = '';

  var { Email, Password, Location, FirstName, LastName, userID, isOwner, ProfilePicture, ShortBio } = req.body;
  console.log(req.body);

  const newUser = new User({ Email : Email, Password: Password, Location: Location,
                             FirstName: FirstName, LastName: LastName,
                             isOwner: isOwner, ProfilePicture: ProfilePicture, ShortBio: ShortBio});

  User.findOne({ Email: Email }, function (err, user)
  {
    // error occur
    if (err)
    {
      return res.status(500).send({msg: err.message});
    }
    // if email is exist into database i.e. email is associated with another user.
    else if (user)
    {
      // return res.status(500).send({msg:'This email address is already associated with another account.'});
      return res.status(400);
    }
    // if user does not exist into database then save the user into database for register account
    else
    {
      // password hashing for saving it into databse
      Password = bcrypt.hashSync(Password, 10);

      // create and save user
      newUser.save(function (err)
      {
        if (err)
        {
          return res.status(500).send({msg:err.message});
        }

        // generate token and save
        var token = new Token({ _userId: newUser._id, token: crypto.randomBytes(16).toString('hex') });

        token.save(function (err)
        {
          if (err)
          {
            return res.status(500).send({msg:err.message});
          }

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

          console.log("TEST 1");

          var mailOptions = {
            from: 'woofnoreply <woof4331@outlook.com>',
            to: Email,
            subject: 'Account Verification Link',
            text: 'Hello '+ FirstName +',\n\n' +
            'Please verify your account by clicking the link: \nhttp:\/\/' +
            req.headers.host + '\/verifyEmail\/' +
            Email + '\/' + token.token + '\n\nThank You!\n' };

          console.log("TEST 2");

          transporter.sendMail(mailOptions, function (err)
          {
            if (err)
            {
              return res.status(500).send('Technical Issue!, Please re-verify your Email.');
            }

            console.log('Verification Email sent: ' + info.response)
            return res.status(200).send('A verification email has been sent to ' + Email + '. It will expire after one day.');
          });
        });
      });
     }
  });
};


// Login Function
exports.login = function(req, res) {

	const jwt = require('../createJWT');

	// incoming: login, password
	// outgoing: id, firstName, lastName, error

	const { login, password } = req.body;

	User.findOne({Email: login, Password: password}, function(err, user)
  {
    // error occur
    if (err)
    {
      return res.status(500).send("Technical error, Please try logging in again");
    }
    // user is not found in database i.e. user is not registered yet.
    else if (user === null)
    {
      // This line of code gives a header error.
      // return res.status(401).send('This email address is not associated with any account.');
    }
    // comapre user's password if user is find in above step
    else if(!bcrypt.compareSync(password, user.password))
    {
      return res.status(401).send('Wrong Password!');
    }
    // check user is verified or not
    else if (!user.isVerified)
    {
      return res.status(401).send('Your Email has not been verified. Please click on resend');
    }
    // user successfully logged in
    else
    {
      console.log('User successfully logged in.');
    }
	});

	ret = jwt.createToken( user.FirstName, user.LastName, user.id );
  console.log(jwt);

	res.status(200).json(ret);

};

// Working pretty well, haven't found bugs....yet
exports.verifyEmail = function(req, res) {

  Token.findOne({ token: req.body.token }, function (err, token)
  {
    // token is not found into database then the token may have expired
    if (!token)
    {
      return res.status(400).send('Your verification link may have expired. Please re-verify your Email.');
    }
    // if token is found then check if they are a valid user
    else
    {

      User.findOne({ _id: token._userId }, function (err, user)
      {
        // not valid user
        if (user === null)
        {
          console.log(user);
          return res.status(401).send('We were unable to find a user for this verification.');
        }
        // user is already verified
        else if (user.isVerified)
        {
          return res.status(200).send('User has already been verified.');
        }

        // verify user
        else
        {
          // change isVerified to true
          user.isVerified = true;

          user.save(function (err)
          {
            // error occur
            if(err)
            {
              return res.status(500).send({msg: err.message});
            }
            // account successfully verified
            else
            {
              return res.status(200).send('Your account has been successfully verified');
            }
          });
        }
      });
    }
  });
};

// WIP
exports.resetPassword = function(req, res) {

  const { Email } = req.body;

  User.findOne(
  {
    where:
    {
      email: req.body.email,
    },
  }).then((user) =>
    {
      if (user === null)
      {
        console.error('email not in database');
        res.status(403).send('email not in db');
      }
      else
      {
        const token = crypto.randomBytes(20).toString('hex');
        user.update(
        {
          ResetPasswordToken: token,
          ResetPasswordExpires: Date.now() + 3600000,
        });

      var transporter = nodemailer.createTransport({
        service:'Hotmail',
        auth: {
            user: `${process.env.EMAIL_ADDRESS}`,
            pass: `${process.env.EMAIL_PASSWORD}`,
       },
      });

      var mailOptions = {
          from:'woofnoreply <woof4331@outlook.com>',
          to: Email,
          subject: 'Reset Password for Woof',
          text: 'Hi,\nWe have received a request to reset the password for Woof account ' + Email +
                ' You can reset your password by clicking the link below within one hour\n' + `http://localhost:5000/confirmPassword/${token}\n\n` +
                'If you did not rquest this, please ignore this email and your password will remain unchanged.\n'
      }

      console.log("Sending mail");

      transporter.sendMail(mailOptions, function(error, info) {
          if (error)
          {
              console.log(error);
          }
          else
          {
              console.log('Recovery Email sent: ' + info.response)
          }
      });
    }
  })
};

// WIP
exports.confirmPassword = function(req, res) {

  const {newPassword, confirmPassword} = req.body;

  User.findOne({ ResetPasswordToken: req.param.token }, function (err, user)
  {
    // token is not found into database then the token may have expired
    if (!user.ResetPasswordToken)
    {
      return res.status(400).send('Your verification link may have expired. Please reset your password again.');
    }
    // if token is found then reset password
    else
    {
      // Stuff
    }
  });
};
