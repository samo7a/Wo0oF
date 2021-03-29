module.exports = function(app) {
  var controller = require('../API/controller.js');

  // signup route
  app.route('/signup')
    .post(controller.signup);

  // Login route
  app.route('/login')
	.post(controller.login);

  // Reset Password route
  app.route('/resetPassword')
  .post(controller.resetPassword);

  // Reset Password route
  app.route('/confirmPassword/:token')
  .post(controller.confirmPassword);

  // Verify Email route
  app.route('/verifyEmail/:email/:token')
  .get(controller.verifyEmail);
}
