import React, { Component } from 'react';
import logo from './logo.svg';
import NavBar from './components/NavBar/NavBar.js'
import Header from './components/Header/Header.js'
import Profile from './components/Profile/Profile';
import Friends from './components/Friends/Friends'
import GroupDetails from './components/GroupDetails/GroupDetails';

import LoginView from './components/views/LoginView'
import EventsView from './components/views/EventsView'
import FriendsView from './components/views/FriendsView'
import GroupsView from './components/views/GroupsView'
import {Switch, Route} from 'react-router-dom';


import GroupEvent from './components/GroupEvent/GroupEvent';

import './App.css';

import Map from './components/Map/Map';
import Auth0Form from './components/Auth0Form/Auth0Form';


class App extends Component {
  render() {
    return (
     <div className="App">


      <Switch>
         <Route exact path="/" component={Auth0Form}/>
         <Route path="/events" component={EventsView}/>
         <Route path="/groups" component={GroupsView}/>
         <Route path="/friends" component={FriendsView}/>
         <Route path="/profile" component={Profile}/>
         <Route path="/groupDetails" component={GroupDetails}/>
        </Switch>
        {/* {console.log(window.location)} */}
        {window.location.pathname === '/' ?
            ''
          :
            <NavBar />  }
     </div>
    );
  }
}

export default App;
