module.exports = function(app) {
  var controller = require('../API/controller.js');

  // Signup route
  app.route('/signup')
  .post(controller.signup);

  // Login route
  app.route('/login')
	.post(controller.login);

  // Login route
  app.route('/editUser')
  .post(controller.editUser);

  // Reset Password route
  app.route('/resetPassword')
  .post(controller.resetPassword);

  // Confirm Password route
  app.route('/confirmPassword/:token')
  .post(controller.confirmPassword);

  // Verify Email route
  app.route('/verifyEmail/:email/:token')
  .get(controller.verifyEmail);

  // Create Dog Route
  app.route('/createDog')
  .post(controller.createDog);
}
