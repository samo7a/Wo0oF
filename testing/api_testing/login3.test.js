// Login with a non existent account

const frisby = require('frisby');

it ('POST, Signup should return a status of 200', function () {
  return frisby
    .post('https://wo0of.herokuapp.com/signup', {
      Email: "badBunny101@gmail.com",
      Password:"rum",
      Location: "00901",
      FirstName: "Bad",
      LastName: "Bunny",
      isOwner: "False"
    })
    .expect('status', 200);
    // .then(function (res) {
    //   var data = JSON.parse(res['_body']);
    //   console.log(data);
    //   expect(data.['msg']).resolves.toBe('Verification Email Sent! :)');
    // });
});
//
// it ('POST, Login should return a status of 500', function () {
//   return frisby
//     .post('https://wo0of.herokuapp.com/login', {
//       Email: 'badBunny101@gmail.com',
//       Password: 'deezNuts'
//     })
//     .expect('status', 500)
//     .then(function (res) {
//       var data = JSON.parse(res['_body']);
//       console.log(data);
//       expect(data.['msg']).toBe('Your Email has not been verified. Please verify your email');
//     });
// });


// describe('Email Verification', function () {
//   it('POST, Signup should return a status of 200', function () {
//     return frisby
//       .post('https://wo0of.herokuapp.com/signup', {
//         Email: "badBunny101@gmail.com",
//         Password:"rum",
//         Location: "00901",
//         FirstName: "Bad",
//         LastName: "Bunny",
//         isOwner: "False"
//       })
//       .expect('status', 200)
//       .then(function (res) {
//         var data = JSON.parse(res['_body']);
//         console.log(data);
//         expect(data.['msg']).toBe('Verification Email Sent! :)');
//       })
//       .then(function (res) { // res = FrisbyResponse object
//
//         // Get first post's comments
//         // RETURN the FrisbySpec object so function waits on it to finish - just like a Promise chain
//         return frisby
//           .post('https://wo0of.herokuapp.com/login', {
//             Email: 'badBunny101@gmail.com',
//             Password: 'deezNuts'
//           })
//           .expect('status', 500)
//           .then(function (res) {
//             var data = JSON.parse(res['_body']);
//             console.log(data);
//             expect(data.['msg']).toBe('Your Email has not been verified. Please verify your email');
//           });
//       });
//   });
// });
