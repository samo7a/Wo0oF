module.exports = function(app) {
  var controller = require('../API/controller.js');

  // signup route
  app.route('/signup')
    .post(controller.signup);
}