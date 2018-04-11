const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
const session = require('express-session');
const axios = require('axios');



//Controllers
const userController = require('./controllers/userController');
const eventController = require('./controllers/eventController')
const friendController = require('./controllers/friendController.js')
const groupController = require('./controllers/groupController.js')
const yc = require('./controllers/yelpController');

//Middlewares
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

//USER INFORMATION
app.get('/api/getUserInfo/:user_id', userController.getUserInfo)

////////////////////////testing friend selector/////////////////////////////////
app.get('/api/users', userController.get_users)
//GET FRIENDS
app.get('/api/friends', friendController.get_friends)
app.post('/api/friends', friendController.confirm_friend)


//POST FRIENDS 
app.post('/api/friends/:id', friendController.post_friends)

//NOTIFICATIONS
app.get(`/api/notifications/:user_id`, userController.getNotifications)
app.delete('/api/notifications/:notification_id', userController.remove_notification)

//GET GROUPS FOR USER
app.get('/api/getGroups/:user_id',groupController.getGroups);
app.get('/api/getGroupMembers/:group_id',groupController.getGroupMembers)
app.delete('/api/deleteUserFromGroup/:group_id/:user_id',groupController.deleteUserFromGroup)
//POST EVENT
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