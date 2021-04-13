const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const methodOverride = require('method-override');
require('dotenv').config();
const url = process.env.MONGODB_URI;
mongoose = require('mongoose'),
  mongoose.Promise = global.Promise;
mongoose.connect(url);
//client.connect(); // will throw an error localy.
const PORT = process.env.PORT || 5000;
const app = express();
Task = require('./API/models.js'), //created model loading here
  app.set('port', (process.env.PORT || 5000));
app.use(cors());
app.use(bodyParser.json());
app.use(methodOverride('_method'));



/*
    Add
    API
    Endpoints
    Here
*/

///////////////////////////////////////////////////
// For Heroku deployment

// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('frontend/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
}

var routes = require('./API/routes.js'); //importing route
routes(app); //register the route

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, OPTIONS'
  );
  next();
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
