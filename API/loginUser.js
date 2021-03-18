require('express');
require('mongodb');

const jwt = require('./createJWT');

//load user model
const Users = require("./models/user.js");

app.post('/api/loginUser', async (req, res, next) =>
{
  // incoming: login, password
  // outgoing: id, firstName, lastName, error

 var error = '';

  const { login, password } = req.body;
  const db = client.db();

  const results = await db.collection('Users').find({Login:login,Password:password}).toArray();
  const results = await User.find({ Login: login, Password: password });

  var id = -1;
  var fn = '';
  var ln = '';

  if (results.length > 0)
  {
    id = results[0].UserId;
    fn = results[0].FirstName;
    ln = results[0].LastName;
  }

  try
  {
    ret = jwt.createToken( fn, ln, id );
  }
  catch(e)
  {
    ret = {error:e.message};
  }

  res.status(200).json(ret);
});
