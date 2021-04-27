var mongoose = require("mongoose");
var nodemailer = require("nodemailer");
var sendGridTransport = require("nodemailer-sendgrid-transport");
var bcrypt = require("bcrypt");
var http = require("http");
var url = require("url");
var User = mongoose.model("User");
var Token = mongoose.model("Token");
var Chat = mongoose.model("Chat");
ObjectId = require("mongodb").ObjectID;

const crypto = require("crypto");
const jwt = require("../createJWT");

// Signup Function
// Almost complete, need to use GridFS to upload ProfilePicture
exports.signup = function (req, res) {
  // incoming: Email, Password, Location, FirstName, LastName, userID, isOwner, ProfilePicture, ShortBio
  // outgoing: error, email

  var error = "";

  var { Email, Password, Location, FirstName, LastName, isOwner } = req.body;
  // console.log(req.body);

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

      const newUser = new User({
        Email: Email,
        Password: Password,
        FirstName: FirstName,
        LastName: LastName,
        isOwner: isOwner,
      });

      // create and save user
      newUser.save(function (err) {
        if (err) {
          // return res.status(500).send({msg: "Technical Error creating User :("});
          return res.status(500);
        }

        // generate token and save
        var token = new Token({
          _userId: newUser._id,
          token: crypto.randomBytes(16).toString("hex"),
        });

        token.save(function (err) {
          if (err) {
            return res.status(500).send({ msg: "Technical Error creating Token :(" });
          }
        });

        var options = {
          auth: {
            api_key: process.env.SENDGRID_APIKEY,
          },
        };

        // Send email (use credentials in .env file)
        var transporter = nodemailer.createTransport(sendGridTransport(options));

        if (process.env.NODE_ENV === "production") {
          var mailOptions = {
            from: "woofnoreply <woof4331@outlook.com>",
            to: Email,
            subject: "Account Verification Link",
            text:
              "Hi,\nWe have received a request to verify the following Woof account " +
              Email +
              "\nPlease verify your account by clicking the link:\n" +
              `https://wo0of.herokuapp.com/verifyUserEmail\n\n` +
              "Make sure to copy and paste the following confirmation code into the reset form.\n" +
              `${token.token}` +
              "\n\nIf you did not request this, please ignore this email.\n",
          };
        } else {
          var mailOptions = {
            from: "woofnoreply <woof4331@outlook.com>",
            to: Email,
            subject: "Account Verification Link",
            text:
              "Hi,\nWe have received a request to verify the following Woof account " +
              Email +
              "\nPlease verify your account by clicking the link:\n" +
              `http://localhost:3000/verifyUserEmail\n\n` +
              "Make sure to copy and paste the following confirmation code into the reset form.\n" +
              `${token.token}` +
              "\n\nIf you did not request this, please ignore this email.\n",
          };
        }

        transporter.sendMail(mailOptions, function (err) {
          if (err) {
            // return res.status(500).send({msg: "Technical Error sending Email :("});
            console.log("error is " + err);
            return res.status(500);
          } else {
            // console.log("Verification Email sent");
            res.status(200).send({ msg: "Verification Email Sent! :)" });
          }
        });
      });
    }
  });
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
      return res.status(500).send({
        msg: "Your Email has not been verified. Please verify your email",
      });
    }
    // user successfully logged in
    else {
      const ret = jwt.createToken(user._id, user.FirstName, user.LastName, user.isOwner, user.Email, user.Phone, user.Location, user.ShortBio);
      console.log("Inside of Login: " + JSON.stringify(ret));

      res.status(200).json(ret);
    }
  });
};

// Complete editUser API
exports.editUser = function (req, res) {
  // incoming: FirstName, LastName, Email, Phone, Location, ProfilePicture, ShortBio
  // outgoing: error, jwt

  var { UserID, FirstName, LastName, Phone, Location, ProfilePicture, ShortBio } = req.body;
  // console.log(req.body);

  // Forgive me Papa Szum for going over 100 characters
  User.findOneAndUpdate(
    { _id: ObjectId(UserID) },
    {
      $set: {
        FirstName: FirstName,
        LastName: LastName,
        Location: Location,
        Phone: Phone,
        ShortBio: ShortBio,
      },
    },
    function (err, user) {
      // Check for any technical errors
      if (err) {
        return res.status(500).send("Technical error while attempting to update User information.");
      }
      // Update JWT and send confirmation message.
      else {
        const ret = jwt.createToken(UserID, FirstName, LastName, user.isOwner, user.Email, Phone, Location, ShortBio);
        // console.log(JSON.stringify(ret));

        res.status(200).json(ret);
      }
    }
  );
};

// Complete Verify Email API
exports.verifyEmail = function (req, res) {
  const { emailToken } = req.body;

  Token.findOne({ token: emailToken }, function (err, token) {
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

      var options = {
        auth: {
          api_key: process.env.SENDGRID_APIKEY,
        },
      };

      // console.log(JSON.stringify(options));

      // Send email (use credentials in .env file)
      var transporter = nodemailer.createTransport(sendGridTransport(options));

      if (process.env.NODE_ENV === "production") {
        var mailOptions = {
          from: "woofnoreply <woof4331@outlook.com>",
          to: Email,
          subject: "Reset Password for Woof",
          text:
            "Hi,\nWe have received a request to reset the password for Woof account " +
            Email +
            " You can reset your password by clicking the link below within one hour\n" +
            `https://wo0of.herokuapp.com/confirmPassword\n\n` +
            "Make sure to copy and paste the following confirmation code into the reset form.\n" +
            `${token}` +
            "\n\nIf you did not request this, please ignore this email and your password will remain unchanged.\n",
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

      // console.log("Sending mail");

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          // console.log("Recovery Email sent: " + info.response);
          res.status(200).send({
            msg: "A password recovery email has been sent. It will expire after one hour.",
          });
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
      return res.status(500).send({
        msg: "Your verification link may have expired. Please resend your email.",
      });
    }
    // If token is found then reset password
    else {
      // console.log("Resetting password now");

      // Password hashing for saving it into databse
      newPassword = bcrypt.hashSync(newPassword, 10);
      user.Password = newPassword;
      user.ResetPasswordToken = "";
      user.ResetPasswordExpires = Date.now();

      user.save();

      var options = {
        auth: {
          api_key: process.env.SENDGRID_APIKEY,
        },
      };

      // Send email (use credentials in .env file)
      var transporter = nodemailer.createTransport(sendGridTransport(options));

      var mailOptions = {
        from: "woofnoreply <woof4331@outlook.com>",
        to: user.Email,
        subject: "Confirmation of Password Reset for Woof",
        text: "Hi,\nWe would like to confirm that the following Woof account, " + user.Email + " has had their password reset recently.\n",
      };

      // console.log("Sending mail");

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          // console.log("Recovery Email sent: " + info.response);
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

  var { Name, UserID, Bio, Breed, Size, Age, Sex, isPottyTrained, isNeutered } = req.body;

  const newDog = {
    Name: Name,
    Bio: Bio,
    Breed: Breed,
    Size: Size,
    Age: Age,
    Sex: Sex,
    isPottyTrained: isPottyTrained,
    isNeutered: isNeutered,
    OwnerID: UserID,
  };

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
      console.log(err);
      return res.status(500).send("Technical error while attempting to update User information.");
    }
    else {
    User.updateMany({ $pull: { LikedDogs: { DogID: ObjectId(DogID) } } }, function (err) {
        if (err) {
          console.log(err);
          return res.status(500).send("Technical error while attempting to update User information.");
        }
        // Update delete message
        else {
        User.updateMany({ $pull: { LikedAdopters: { DogID: ObjectId(DogID) } } }, function (err) {
          if (err) {
            console.log(err);
            return res.status(500).send("Technical error while attempting to update User information.");
          }
          // Update delete message
          else {return res.status(200).send("Dog successfully deleted!");
          }
        })
        }
      })
    }
  });
};

// Complete editDog API
exports.editDog = function (req, res) {
  var { Name, UserID, Bio, Breed, Size, Age, Sex, isPottyTrained, isNeutered, DogID } = req.body;

  // console.log(req.body);
  // Find user then find the dog and update
  User.findOneAndUpdate(
    { _id: ObjectId(UserID), "Dogs._id": ObjectId(DogID) },
    {
      $set: {
        "Dogs.$.Name": Name,
        "Dogs.$.Bio": Bio,
        "Dogs.$.Breed": Breed,
        "Dogs.$.Size": Size,
        "Dogs.$.Age": Age,
        "Dogs.$.Sex": Sex,
        "Dogs.$.isPottyTrained": isPottyTrained,
        "Dogs.$.isNeutered": isNeutered,
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
  var { Location, id } = req.body;
  var Usernum = 0;
  var ignoreDogs = [];
  var dogarray = [];
  var i, j, k;
  var useDog = true;
  var yeetnum = 0;

  if (Location == "") {
    return res.send(dogarray);
  }

  // Grab the users liked and disliked dogs
  User.findOne({ _id: id }, function (err, user) {
    if (err) {
      console.log(err);
      return res.status(500).send("Technical error while attempting to find User information.");
    } else {
      for (j = 0; j < user.LikedDogs.length; j++) {
        ignoreDogs.push(user.LikedDogs[j].DogID);
      }
      for (j = 0; j < user.DislikedDogs.length; j++) {
        ignoreDogs.push(user.DislikedDogs[j].DogID);
      }
      //console.log("Ignoredogs is: " + ignoreDogs);

      // Find the owners in the same area
      var Lowerlocation = Location - 20;
      var Upperlocation = Location + 20;
      User.find({ Location: { $lt: Upperlocation }, isOwner: true, Location: { $gt: Lowerlocation } }, function (err, owners) {
        if (err) {
          console.log(err);
          return res.status(500).send("Technical error while attempting to find User information.");
        } else {
          // Loop through the users

          for (j = 0; j < owners.length; j++) {
            foundowner = owners[j];

            // Loop through the dogs of the user and ensure that they have not been seen before and then add them to array
            for (i = 0; i < foundowner.Dogs.length; i++) {
              useDog = true;
              for (k = 0; k < ignoreDogs.length; k++) {
                //console.log(ignoreDogs[k] + " vs " + foundowner.Dogs[i]._id);
                if (ignoreDogs[k] == foundowner.Dogs[i]._id) {
                  yeetnum++;
                  useDog = false;
                }
              }
              if (useDog) {
                dogarray.push(foundowner.Dogs[i]);
              }
              if (dogarray.length >= 10) {
                //console.log("yeeted " + yeetnum);
                return res.send(dogarray);
              }
            }
          }
        }
        //console.log("yeeted " + yeetnum);
        res.send(dogarray);
      });
    }
  });
};

// Function for an owner to get a list of their dogs
exports.getOwnerDogs = function (req, res) {
  var { id } = req.body;
  if (id === undefined) {
    return res.status(500).send("Technical error while attempting to find User information.");
  }
  // Find the next owner in the same area
  User.findOne({ _id: id }, function (err, owner) {
    if (err) {
      console.log(err);
      return res.status(500).send("Technical error while attempting to find User information.");
    } else {
      res.send(owner.Dogs);
    }
  });
};

// Complete likeDog API
exports.likeDog = function (req, res) {
  // Imports: UserID, OwnerID, DogID, isLiked
  var { UserID, Dog, IsLiked } = req.body;

  // console.log(IsLiked);
  OwnerID = Dog.OwnerID;
  // console.log(Dog.OwnerID);

  if (IsLiked === true) {
    // console.log("dog liked");

    const LikedDog = {OwnerID: Dog.OwnerID, DogID: Dog._id}

    User.findOneAndUpdate({ _id: ObjectId(UserID) }, { $push: { LikedDogs: LikedDog } }, function (err) {
      if (err) {
        console.log(err);
        return res.status(500);
      } else {
        const liker = {
          DogID: Dog._id,
          UserID: UserID,
        };
        User.findOneAndUpdate({ _id: ObjectId(OwnerID) }, { $push: { LikedAdopters: liker } }, function (err) {
          if (err) {
            console.log(err);
            return res.status(500);
          } else {
            // console.log("////////////// USER IS//////////////" + liker)
            return res.status(200);
          }
        });
       }
        });
      
      }
    else{
    // Add the dog to the user's disliked dogs
    const DislikedDog = { DogID: Dog._id };
    // console.log(DislikedDog);
    User.findOneAndUpdate({ _id: ObjectId(UserID) }, { $push: { DislikedDogs: DislikedDog } }, function (err) {
      if (err) {
        console.log(err);
        return res.status(500);
      }
    });
  }
  return res.send(200);
};

exports.sendMessage = function (req, res) {
  var { userID, chatID, messageData } = req.body;
  const newMessage = { text: messageData, createdAt: Date.now(), userID: userID };
  Chat.findOneAndUpdate({ _id: ObjectId(chatID) }, { $push: { Messages: newMessage } }, function (err) {
    if (err) {
      console.log(err);
      return res.status(500);
    } else {
      return res.send(200);
    }
  });
};

exports.getMessages = function (req, res) {
  var { chatID } = req.body;
  Chat.findOne({ _id: chatID }, function (err, chat) {
    if (err) {
      console.log(err);
      return res.status(500).send("Technical error while attempting to find User information.");
    } else {
      res.send(chat.Messages);
    }
  });
};

exports.getChats = function (req, res) {
  var { userID } = req.body;
  Chat.find({ $or: [{ AdopterID: userID }, { OwnerID: userID }] }, function (err, chats) {
    if (err) {
      console.log(err);
      return res.status(500).send("Technical error while attempting to find User information.");
    } else {
      res.send(chats);
    }
  });
};

exports.deleteChat = function (req, res) {
  var { chatID } = req.body;
  Chat.findOneAndDelete({ _id: chatID }, function (err) {
    if (err) {
      console.log(err);
      return res.status(500).send("Technical error while attempting to find User information.");
    } else {
      res.status(200);
    }
  });
};

exports.getLikedDogs = function (req, res) {
  var { id } = req.body;
  User.findOne({ _id: id }, function (err, founduser) {
    if (err) {
      console.log(err);
      return res.status(500).send("Technical error while attempting to find User information.");
    } else {
      res.send(founduser.LikedDogs);
    }
  });
};

exports.getOwner = function (req, res) {
  var { OwnerID } = req.body;
  User.findOne({ _id: OwnerID }, function (err, founduser) {
    if (err) {
      console.log(err);
      return res.status(500).send("Technical error while attempting to find User information.");
    } else {
      res.send(founduser);
    }
  });
};

exports.getLikers = function (req, res) {
  var { id } = req.body;
  User.findOne({ _id: id }, function (err, founduser) {
    if (err) {
      console.log(err);
      return res.status(500).send("Technical error while attempting to find User information.");
    } else {
      res.send(founduser.LikedAdopters);
    }
  });
};

exports.getDog = function (req, res) {
  var { DogID } = req.body;
  User.findOne({Dogs: {$elemMatch: {_id: DogID}}}, function (err, foundDog){
    if (err) {
      console.log(err);
      return res.status(500).send("Technical error while attempting to find User information.");
    } else {
      res.send(foundDog.Dogs[0]);
    }
  }).select({Dogs: {$elemMatch: {_id: DogID}}});
};