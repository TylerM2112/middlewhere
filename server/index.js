const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
const session = require('express-session');
const axios = require('axios');


//CONTROLLERS
const userController = require('./controllers/userController');
const eventController = require('./controllers/eventController')
const friendController = require('./controllers/friendController.js')
const groupController = require('./controllers/groupController.js')
const yc = require('./controllers/yelpController');

//MIDDLEWARE
const checkBody = require('./middlewares/checkBody.js')

require('dotenv').config();

massive(process.env.CONNECTION_STRING).then(db => app.set('db', db)).catch(e => console.log("massive error", e));
const app = express();
app.use( express.static( `${__dirname}/../build` ) );

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


//////////////////////////////////\/\/auth0 code\/\/////////////////////////////////////////////////////
app.get('/auth/callback', (req, res) => { //from here Get request to 
  ///////////////////////////////////////////////////////////////////////////////////
    axios.post(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/oauth/token`, {
      // object being sent in post to get an access token
      client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
      client_secret: process.env.REACT_APP_AUTH0_CLIENT_SECRET,
      code: req.query.code,
      grant_type: 'authorization_code',
      redirect_uri: `https://${req.headers.host}/auth/callback`,
    }).then(accessTokenResponse => {
      console.log('req.headers', req.headers)
      const accessToken = accessTokenResponse.data.access_token;
    // *** Q: what does  this \/ do???? 
      return axios.get(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/userinfo/?access_token=${accessToken}`).then(userInfoResponse => {
        const userData = userInfoResponse.data;

    // console.log('userData', userData);
    // console.log('req.header.host', req.headers.host)
    
        return req.app.get('db').find_user_by_auth0_id(userData.sub).then(users => {
          if (users.length) {

            const user = users[0];

            req.session.user = {user_id: user.auto_id, email: user.email, name: user.name, phone: user.phone, picture: user.picture };
            res.redirect('/profile');

          } else {
            const createData = [userData.sub, userData.name, userData.email, userData.phone, userData.picture];
            return req.app.get('db').create_user(createData).then(newUsers => {
              const user = newUsers[0];
              req.session.user = {user_id: user.auto_id, name: user.name, email: user.email, phone: user.phone, picture: user.picture };
              res.redirect('/profile');
            })
          }
        });
      });
    }).catch(error => {
      console.log('error in /auth/callback', error);
      res.status(500).json({ message: 'An unexpected error occurred on the server.'})
    });
  /////////////////////////////////////////////////////////////////////////////////////////////
  }); // to here
  /////////////////////////////////////////////////////////////////////////////////////////////
  
  
//////////////////////////////////^^^auth0 code^^^////////////////////////////////////////////////////


//USER CONTROLLER
app.get('/api/getUserInfo/', userController.getUserInfo)
//FIND USER
app.get('/api/users:users', userController.search_user)

//get all users the db
app.get('/api/users', userController.get_users)

//NOTIFICATION ENDPOINTS
app.get(`/api/notifications/:user_id`, userController.getNotifications)
app.delete('/api/notifications/:notification_id', userController.remove_notification)
app.post('/api/events',eventController.approve_event);

//ADDRESS ENDPOINTS
app.post('/api/addUserAddress/:user_id', userController.addUserAddress);
app.put(`/api/address/:auto_id`, userController.editAddress)
app.put(`/api/address/default/:user_id`, userController.updateDefaults)
app.delete('/api/removeAddress/:auto_id', userController.removeAddress);

//FRIENDS CONTROLLER
app.get('/api/friends/:user_id', friendController.get_friends)
app.post('/api/friends', friendController.confirm_friend)
app.post('/api/friends/:id', friendController.post_friends)
app.delete('/api/friends/:id', friendController.delete_friend)

//GROUP CONTROLLER

//get groups for that user
app.get('/api/getGroups/:user_id', groupController.getGroups)
//adds a group to the db
app.post('/api/new/group', checkBody, groupController.post_group)
//send the notification to the users for a new group
app.post('/api/groups', groupController.approve_group)
//GET GROUPS FOR USER
app.get('/api/getGroups/:user_id',groupController.getGroups);
//gets the group members of a group
app.get('/api/getGroupMembers/:group_id',groupController.getGroupMembers)
//deletes a user from a group
app.delete('/api/deleteUserFromGroup/:group_id/:user_id',groupController.deleteUserFromGroup)

//EVENTS CONTROLLER

// app.post('/api/new/event', eventController.post_event)
// app.post('/api/events', eventController.approve_event)
//gets all the users of the selected groups for an event
app.post('/api/createEvent',eventController.createEvent);
//creates the event,notifications and the group admin suggested places
app.post('/api/createEventFinal',eventController.createEventFinal);
app.get('/api/getEventDetails/:group_id',eventController.getEventDetails);

//POST GROUP
app.post('/api/new/group', checkBody, groupController.post_group)
app.post('/api/groups', groupController.approve_group)
//GET GROUPS FOR USER
app.get('/api/getGroups/:user_id',groupController.getGroups);
app.get('/api/getGroupMembers/:group_id',groupController.getGroupMembers)
app.delete('/api/deleteUserFromGroup/:group_id/:user_id',groupController.deleteUserFromGroup)

//User address 
app.post('/api/addUserAddress/:user_id', userController.addUserAddress);
app.put(`/api/address/:auto_id`, userController.editAddress)
app.delete('/api/removeAddress/:auto_id', userController.removeAddress);

//Yelp Controller
app.post('/api/yelp/search', yc.search)


const path = require('path')
app.get('*', (req, res)=>{
res.sendFile(path.join(__dirname, '../build/index.html'));
}) 

const PORT = process.env.SERVER_PORT || 4000;
app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
