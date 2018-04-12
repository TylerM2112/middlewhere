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

//USER CONTROLLER
app.get('/api/getUserInfo/:user_id', userController.getUserInfo)

//FIND USER
app.get('/api/users:users', userController.search_user)

app.get('/api/users', userController.get_users)
//NOTIFICATION ENDPOINTS
app.get(`/api/notifications/:user_id`, userController.getNotifications)
app.delete('/api/notifications/:notification_id', userController.remove_notification)
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
app.get('/api/getGroups/:user_id', groupController.getGroups);
app.post('/api/new/group', checkBody, groupController.post_group)
app.post('/api/groups', groupController.approve_group)
//GET GROUPS FOR USER
app.get('/api/getGroups/:user_id',groupController.getGroups);
app.get('/api/getGroupMembers/:group_id',groupController.getGroupMembers)
app.delete('/api/deleteUserFromGroup/:group_id/:user_id',groupController.deleteUserFromGroup)

//EVENTS CONTROLLER
app.post('/api/new/event', eventController.post_event)
app.post('/api/events', eventController.approve_event)


//POST GROUP
app.post('/api/new/group', checkBody, groupController.post_group)
app.post('/api/groups', groupController.approve_group)

//POST USER ADDRESS 
app.post('/api/addUserAddress/:user_id', userController.addUserAddress);
app.put(`/api/address/:auto_id`, userController.editAddress)
app.delete('/api/removeAddress/:auto_id', userController.removeAddress);


//Yelp Controller

app.post('/api/yelp/search', yc.search)


const PORT = process.env.SERVER_PORT || 4000;
app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));