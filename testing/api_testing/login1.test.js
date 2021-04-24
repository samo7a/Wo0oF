// Login with a non existent account

const frisby = require('frisby');

it ('POST, Login should return a status of 500', function () {
  return frisby
    .post('https://wo0of.herokuapp.com/login', {
      Email: 'yourMom@gmail.com',
      Password: 'getClapped'
    })
    .expect('status', 500)
    .then(function (res) {
      var data = JSON.parse(res['_body']);
      console.log(data);
      expect(data.['msg']).toBe('This email address is not associated with any account');
    });
});
