module.exports = function (app) {
  var controller = require("../API/controller.js");
  const express = require("express");
  const bodyParser = require("body-parser");
  const path = require("path");
  const crypto = require("crypto");
  const mongoose = require("mongoose");
  const multer = require("multer");
  const GridFsStorage = require("multer-gridfs-storage");
  const Grid = require("gridfs-stream");
  const methodOverride = require("method-override");

  // Mongo URI
  const mongoURI = process.env.MONGODB_URI;

  // Create mongo connection
  const conn = mongoose.createConnection(mongoURI);

  // Init gfs
  let gfs;

  let tempFileName = "";
  let tempUserID = "";

  console.log("Routes has been invoked!");

  conn.once("open", () => {
    // Init stream
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection("ProfilePictureUploads");
  });

  // Create storage engine
  const storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          //const filename = buf.toString('hex') + path.extname(file.originalname);
          gfs.files.remove({ filename: req.headers["userid"] });
          const filename = req.headers["userid"];
          const fileInfo = {
            filename: filename,
            bucketName: "ProfilePictureUploads",
          };

          tempUserID = fileInfo.filename;
          console.log("temp");

          console.log("Inside storage:" + JSON.stringify(fileInfo));
          resolve(fileInfo);
        });
      });
    },
  });

  //  Limiting the file size so it doesn't crash the database.
  // const upload = multer({ storage: storage, limits: { fieldSize: 10 * 1024 * 1024 } });
  const upload = multer({ storage });

  // @route GET /
  // @desc Loads form
  app.get("/getImages", (req, res) => {
    gfs.files.find().toArray((err, files) => {
      // Check if files
      if (!files || files.length === 0) {
        res.render("home", { files: false });
      } else {
        files.map((file) => {
          if (file.contentType === "image/jpeg" || file.contentType === "image/png") {
            file.isImage = true;
          } else {
            file.isImage = false;
          }
        });
        res.send({ files: files });
      }
    });
  });

  // @route POST /upload
  // @desc  Uploads file to DB
  app.post("/profilePicture", upload.single("file"), (req, res) => {
    var jsonReturn = { fileName: req.file };
    console.log(jsonReturn);
    res.status(200).json(jsonReturn);
  });

  // @route GET /image/:filename
  // @desc Display Image
  app.post("/getSingleImage/:filename", (req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
      // Check if file
      if (!file || file.length === 0) {
        console.log("File name inside of get image API: " + req.params.filename);
        return res.status(404).json({
          err: "No file exists",
        });
      }

      // Check if image
      if (file.contentType === "image/jpeg" || file.contentType === "image/png") {
        // Read output to browser
        const readstream = gfs.createReadStream(file.filename);

        var bufs = [];

        readstream.on('data', function(chunk) {
          bufs.push(chunk);

        }).on('end', function() { // done

          var fbuf = Buffer.concat(bufs);

          const img = `data:image/png;base64,${Buffer(fbuf).toString('base64')}`;
          res.send(img);
        });

        // readstream.pipe(res);
      } else {
        res.status(404).json({
          err: "Not an image",
        });
      }
    });
  });

  // Signup route
  app.route("/signup").post(controller.signup);

  // Login route
  app.route("/login").post(controller.login);

  // Edit User route
  app.route("/editUser").post(controller.editUser);

  // Edit User route
  app.route("/reportAccounts").post(controller.reportAccounts);

  // Reset Password route
  app.route("/resetPassword").post(controller.resetPassword);

  // Confirm Password route
  app.route("/confirmResetPassword").post(controller.confirmResetPassword);

  // Verify Email route
  app.route("/verifyEmail").post(controller.verifyEmail);

  // Create Dog Route
  app.route("/createDog").post(controller.createDog);

  // Create Dog Route
  app.route("/editDog").post(controller.editDog);

  // Create Dog Route
  app.route("/deleteDog").post(controller.deleteDog);

  // Display Dogs Route
  app.route("/displayDogs").post(controller.displayDogs);

  // Display Dogs Route
  app.route("/getOwnerDogs").post(controller.getOwnerDogs);

  // Like Dogs Route
  app.route("/likeDog").post(controller.likeDog);

  // Send message Route
  app.route("/sendMessage").post(controller.sendMessage);

  // Get messages Route
  app.route("/getMessages").post(controller.getMessages);

  // Get chats route
  app.route("/getChats").post(controller.getChats);

  // Delete chats route
  app.route("/deleteChat").post(controller.deleteChat);

  // Get likedDogs route
  app.route("/getLikedDogs").post(controller.getLikedDogs);

  // Get owner route
  app.route("/getOwner").post(controller.getOwner);

  // Get likers route
  app.route("/getLikers").post(controller.getLikers);
};
