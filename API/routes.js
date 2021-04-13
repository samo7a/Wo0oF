module.exports = function (app) {
  var controller = require('../API/controller.js');

  // Signup route
  app.route('/signup')
    .post(controller.signup);

  // Login route
  app.route('/login')
    .post(controller.login);

  // Edit User route
  app.route('/editUser')
    .post(controller.editUser);

  // Edit User route
  app.route('/reportAccounts')
    .post(controller.reportAccounts);

  // Reset Password route
  app.route('/resetPassword')
    .post(controller.resetPassword);

  // Confirm Password route
  app.route('/confirmResetPassword')
    .post(controller.confirmResetPassword);

  // Verify Email route
  app.route('/verifyEmail/:email/:token')
    .get(controller.verifyEmail);

  // Create Dog Route
  app.route('/createDog')
    .post(controller.createDog);

  // Create Dog Route
  app.route('/editDog')
    .post(controller.editDog);

  // Create Dog Route
  app.route('/deleteDog')
    .post(controller.deleteDog);

  // Display Dogs Route
  app.route('/displayDogs')
    .post(controller.displayDogs);

  // Like Dogs Route
  app.route('/likeDog')
    .post(controller.likeDog);

  // Upload Profile Picture route
  app.route('/uploadProfilePicture')
    .post(controller.uploadProfilePicture);
}

