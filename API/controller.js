var mongoose = require("mongoose");
var nodemailer = require("nodemailer");
var bcrypt = require("bcrypt");
var http = require("http");
var url = require("url");
var User = mongoose.model("User");
var Token = mongoose.model("Token");
var Chat = mongoose.model("Chat");
ObjectId = require("mongodb").ObjectID;

const crypto = require("crypto");
const jwt = require("../createJWT");

var DogCounter = 0;

// Signup Function
// Almost complete, need to use GridFS to upload ProfilePicture
exports.signup = async function (req, res) {
  // incoming: Email, Password, Location, FirstName, LastName, userID, isOwner, ProfilePicture, ShortBio
  // outgoing: error, email

  var error = "";

  var { Email, Password, Location, FirstName, LastName, isOwner } = req.body;
  console.log(req.body);

  User.findOne({ Email: Email }, function (err, user) {
    // Check if error occurs
    if (err) {
      console.log("err error");
      // return res.status(500).send({msg: err.message});
      return res.status(500);
    }
    // if email is exist into database i.e. email is associated with another user.
    else if (user) {
      console.log("User exists already :(");
      // return res.status(400).send({msg: "User exists already :("});
      return res.status(500);
    }
    // if user does not exist into database then save the user into database for register account
    else {
      // password hashing for saving it into databse
      Password = bcrypt.hashSync(Password, 10);

      const newUser = new User({ Email: Email, Password: Password, FirstName: FirstName, LastName: LastName, isOwner: isOwner });

      // create and save user
      newUser.save(function (err) {
        if (err) {
          // return res.status(500).send({msg: "Technical Error creating User :("});
          return res.status(500);
        }

        // generate token and save
        var token = new Token({ _userId: newUser._id, token: crypto.randomBytes(16).toString("hex") });

        token.save(function (err) {
          if (err) {
            return res.status(500).send({ msg: "Technical Error creating Token :(" });
          }
        });

        // Send email (use credintials of in .env file)
        var transporter = nodemailer.createTransport({
          service: "Hotmail",
          auth: {
            user: `${process.env.EMAIL_ADDRESS}`,
            pass: `${process.env.EMAIL_PASSWORD}`,
          },
        });

        if (process.env.NODE_ENV === "production") {
          var mailOptions = {
            from: "woofnoreply <woof4331@outlook.com>",
            to: Email,
            subject: "Account Verification Link",
            text:
              "Hello " +
              FirstName +
              ",\n\n" +
              "Please verify your account by clicking the link: \nhttps://" +
              req.headers.host +
              ".com" +
              "/verifyEmail/" +
              Email +
              "/" +
              token.token +
              "\n\nThank You!\n",
          };
        } else {
          var mailOptions = {
            from: "woofnoreply <woof4331@outlook.com>",
            to: Email,
            subject: "Account Verification Link",
            text:
              "Hello " +
              FirstName +
              ",\n\n" +
              "Please verify your account by clicking the link: \nhttp://" +
              req.headers.host +
              "/verifyEmail/" +
              Email +
              "/" +
              token.token +
              "\n\nThank You!\n",
          };
        }

        transporter.sendMail(mailOptions, function (err) {
          if (err) {
            // return res.status(500).send({msg: "Technical Error sending Email :("});
            return res.status(500);
          } else {
            console.log("Verification Email sent: " + info.response);
            res.status(200).send({ msg: "Verification Email Sent! :)" });
          }
        });
      });
    }
  });

  return res.status(200).send({ msg: "Verification Email Sent! :)" });
};

// Complete Login API
exports.login = function (req, res) {
  // incoming: login, password
  // outgoing: id, firstName, lastName, error

  const { Email, Password } = req.body;

  User.findOne({ Email: Email }, function (err, user) {
    // Check if error occurs
    if (err) {
      return res.status(500).send({ msg: "Technical error, Please try logging in again" });
    }
    // user is not found in database i.e. user is not registered yet.
    else if (user === null) {
      // This line of code gives a header error.
      return res.status(500).send({ msg: "This email address is not associated with any account" });
    }
    // comapre user's password if user is find in above step
    else if (!bcrypt.compareSync(Password, user.Password)) {
      return res.status(500).send({ msg: "Wrong Password!" });
    }
    // check user is verified or not
    else if (!user.isVerified) {
      return res.status(500).send({ msg: "Your Email has not been verified. Please click on resend" });
    }
    // user successfully logged in
    else {
      const ret = jwt.createToken(user._id, user.FirstName, user.LastName, user.isOwner, user.Email, user.Phone, user.Location, user.Bio);
      console.log(jwt);

      res.status(200).json(ret);
    }
  });
};

// Complete editUser API
exports.editUser = function (req, res) {
  // incoming: FirstName, LastName, Email, Phone, Location, ProfilePicture, ShortBio
  // outgoing: error, jwt

  var { UserID, FirstName, LastName, Email, Phone, Location, ProfilePicture, ShortBio } = req.body;
  console.log(req.body);

  // Forgive me Papa Szum for going over 100 characters
  User.findOneAndUpdate(
    { _id: ObjectId(UserID) },
    { $set: { FirstName: FirstName, LastName: LastName, Email: Email, Phone: Phone, ProfilePicture: ProfilePicture, ShortBio: ShortBio } },
    function (err, user) {
      // Check for any technical errors
      if (err) {
        return res.status(500).send("Technical error while attempting to update User information.");
      }
      // Update JWT and send confirmation message.
      else {
        const ret = jwt.createToken(user._id, user.FirstName, user.LastName, user.isOwner, user.Email, user.Phone, user.Location, user.Bio);
        console.log(jwt);

        res.status(200).json(ret);
      }
    }
  );
};

// Complete Verify Email API
exports.verifyEmail = function (req, res) {
  Token.findOne({ token: req.params.token }, function (err, token) {
    // Token is not found in the database then the token may have expired
    if (!token) {
      return res.status(400).send("Your verification link may have expired. Please re-verify your Email.");
    }
    // if token is found then check if they are a valid user
    else {
      User.findOne({ _id: token._userId }, function (err, user) {
        // User does not exist in database
        if (user === null) {
          console.log(user);
          return res.status(404).send("We were unable to find a user for this verification.");
        }
        // User is already verified
        else if (user.isVerified) {
          return res.status(200).send("User has already been verified.");
        }

        // Verify user
        else {
          // Change isVerified to true
          user.isVerified = true;

          user.save(function (err) {
            // Technical error occured
            if (err) {
              return res.status(500).send({ msg: err.message });
            }
            // Account successfully verified
            else {
              res.status(200).send(`${user.Email}` + " has been successfully verified");
            }
          });
        }
      });
    }
  });
};

// Complete Reset Password API
exports.resetPassword = function (req, res) {
  // incoming: Email
  // outcoming: email

  const { Email } = req.body;

  User.findOne({ Email: Email }, function (err, user) {
    if (user === null) {
      res.status(404).send("Email not in database");
    } else {
      const token = crypto.randomBytes(20).toString("hex");

      user.ResetPasswordToken = token;
      user.ResetPasswordExpires = Date.now() + 3600000;

      user.save();

      var transporter = nodemailer.createTransport({
        service: "Hotmail",
        auth: {
          user: `${process.env.EMAIL_ADDRESS}`,
          pass: `${process.env.EMAIL_PASSWORD}`,
        },
      });

      if (process.env.NODE_ENV === "production") {
        var mailOptions = {
          from: "woofnoreply <woof4331@outlook.com>",
          to: Email,
          subject: "Reset Password for Woof",
          text:
            "Hi,\nWe have received a request to reset the password for Woof account " +
            Email +
            " You can reset your password by clicking the link below within one hour\n" +
            `https://wo0of.herokuapp.com/confirmPassword/${token}\n\n` +
            "If you did not request this, please ignore this email and your password will remain unchanged.\n",
        };
      } else {
        var mailOptions = {
          from: "woofnoreply <woof4331@outlook.com>",
          to: Email,
          subject: "Reset Password for Woof",
          text:
            "Hi,\nWe have received a request to reset the password for Woof account " +
            Email +
            " You can reset your password by clicking the link below within one hour\n" +
            `http://localhost:3000/confirmPassword\n\n` +
            "Make sure to copy and paste the following confirmation code into the reset form.\n" +
            `${token}` +
            "\n\nIf you did not request this, please ignore this email and your password will remain unchanged.\n",
        };
      }

      console.log("Sending mail");

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Recovery Email sent: " + info.response);
          res.status(200).send({ msg: "A password recovery email has been sent. It will expire after one hour." });
        }
      });
    }
  });
};

// Complete confirmResetPassword API
exports.confirmResetPassword = function (req, res) {
  var { resetToken, newPassword } = req.body;

  User.findOne({ ResetPasswordToken: resetToken }, function (err, user) {
    // User is not found into database then the token may have expired
    if (!user) {
      console.log("Could not find user");
      return res.status(500).send({ msg: "Your verification link may have expired. Please resend your email." });
    }
    // If token is found then reset password
    else {
      console.log("Resetting password now");

      // Password hashing for saving it into databse
      newPassword = bcrypt.hashSync(newPassword, 10);
      user.Password = newPassword;
      user.ResetPasswordToken = "";
      user.ResetPasswordExpires = Date.now();

      user.save();

      var transporter = nodemailer.createTransport({
        service: "Hotmail",
        auth: {
          user: `${process.env.EMAIL_ADDRESS}`,
          pass: `${process.env.EMAIL_PASSWORD}`,
        },
      });

      var mailOptions = {
        from: "woofnoreply <woof4331@outlook.com>",
        to: user.Email,
        subject: "Confirmation of Password Reset for Woof",
        text: "Hi,\nWe would like to confirm that the following Woof account, " + user.Email + " has had their password reset recently.\n",
      };

      console.log("Sending mail");

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Recovery Email sent: " + info.response);
          res.status(200).send({ msg: "Password successfully reset!" });
        }
      });
    }
  });
};

// Complete reportAccounts API
exports.reportAccounts = function (req, res) {
  var { UserID, Description } = req.body;

  const newReport = { Description: Description, Date: Date.now() };

  // Forgive me Papa Szum for going over 100 characters
  User.findOneAndUpdate({ _id: ObjectId(UserID) }, { $push: { SpamReports: newReport } }, function (err, user) {
    // Check for any technical errors
    if (err) {
      return res.status(500).send("Technical error while attempting to update User information.");
    }
    // Update JWT and send confirmation message.
    else {
      res.status(200).send("Report successfully inserted!");
    }
  });
};

// Create Dog Function
exports.createDog = function (req, res) {
  // incoming: Dog Name, password
  // outgoing: id, firstName, lastName, error

  var { Name, UserID, Bio, Breed, Weight, Height, Age, Sex } = req.body;

  //console.log("Json package: " + req.body + "UserID: " + UserID);

  var DogID = DogCounter++;
  const newDog = { DogID: DogID, Name: Name, Bio: Bio, Breed: Breed, Weight: Weight, Height: Height, Age: Age, Sex: Sex };

  // Forgive me Papa Szum for going over 100 characters
  User.findOneAndUpdate({ _id: ObjectId(UserID) }, { $push: { Dogs: newDog } }, function (err, user) {
    // Check for any technical errors
    if (err) {
      return res.status(500).send("Technical error while attempting to update User information.");
    }
    // Update JWT and send confirmation message.
    else {
      // For the FE ppl, attach DogID to the dog profile.
      var jsonReturn = { dogID: ObjectId(newDog._id) };
      return res.status(200).send(jsonReturn);
    }
  });
};

// Complete deleteDog API
exports.deleteDog = function (req, res) {
  var { UserID, DogID } = req.body;

  // Forgive me Papa Szum for going over 100 characters
  User.findOneAndUpdate({ _id: ObjectId(UserID) }, { $pull: { Dogs: { _id: ObjectId(DogID) } } }, function (err, user) {
    // Check for any technical errors
    if (err) {
      return res.status(500).send("Technical error while attempting to update User information.");
    }
    // Update delete message
    else {
      return res.status(200).send("Dog successfully deleted!");
    }
  });
};

// Complete editUser API
exports.editDog = function (req, res) {
  var { Name, UserID, DogID, Bio, Breed, Weight, Height, Age, Sex } = req.body;

  // Find user then find the dog and update
  User.findOneAndUpdate(
    { _id: ObjectId(UserID), "Dogs._id": ObjectId(DogID) },
    {
      $set: {
        "Dogs.$.Name": Name,
        "Dogs.$.Bio": Bio,
        "Dogs.$.Breed": Breed,
        "Dogs.$.Weight": Weight,
        "Dogs.$.Height": Height,
        "Dogs.$.Age": Age,
        "Dogs.$.Sex": Sex,
      },
    },
    function (err, owner) {
      if (err) {
        return res.status(500).send("Technical error while attempting to find User information.");
      } else {
        return res.status(200).send("Dog successfully updated!");
      }
    }
  );
};

// Complete displayDogs API
exports.displayDogs = function (req, res) {
  var { Location } = req.body;
  
  
  Usernum = 0;
  dogarray = [];
  var i, j;
  
	  
	// Find the next owner in the same area
	User.find({Location: Location, isOwner : true}, function (err, owners) {
		if (err) {
			console.log(err);
			return res.status(500).send("Technical error while attempting to find User information.");
		} 
		else
		{
			// Loop through the users
			
			for(j=0; j< owners.length; j++)
			{
				foundowner = owners[j];
				
				// Loop through the dogs of the user and ensure that they have not been seen before and then add them to array
				for(i=0; i<foundowner.Dogs.length; i++)
				{
					// TODO: Make sure that they have not already been seen by this user
					if(dogarray.length < 10)
					{
						dogarray.push(foundowner.Dogs[i]);
					}

					else
					{
						res.send(dogarray);
						return;
					}
				}
			}
		}
		res.send(dogarray);
	})
};

// Complete likeDog API
exports.likeDog = function (req, res) {
	
	// Imports: UserID, OwnerID, DogID, isLiked
	var { UserID, OwnerID, DogID, isLiked } = req.body;
	
	console.log(req.body);

	// Create a new chat with that user's information
	const newChat = new Chat({ AdopterID: UserID, DogID: DogID, OwnerID: OwnerID});
	
	// create and save user
	newChat.save(function (err) {
	if (err) {
		console.log(err);
		return res.status(500);
	}
	
	else {
	  return res.end('ended');
	}
	
	console.log("saving done");
	});

};