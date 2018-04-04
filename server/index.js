const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
const session = require('express-session');
const axios = require('axios');

//Controllers
const userController = require('./controllers/userController');
const yc = require('./controllers/yelpController');

require('dotenv').config();

massive(process.env.CONNECTION_STRING).then(db => app.set('db', db)).catch(e => console.log("massive error", e));
const app = express();

app.use(bodyParser.json());
app.use(session({
  secret: process.env.SESSION_SECRET,
  saveUninitialized: false,
  resave: false,
  cookie: {
    //two weeks
    maxAge: 60 * 60 * 24 * 14 * 1000,
  },
}));

//USER INFORMATION
app.get('/api/getUserInfo/:user_id', userController.getUserInfo)
app.post('/api/addUserAddress/:user_id', userController.addUserAddress)

//Yelp Controller
app.post('/api/yelp/search', yc.search)

const PORT = process.env.SERVER_PORT || 4000;
app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));