import React, { Component } from 'react';
import logo from './logo.svg';
import NavBar from './components/NavBar/NavBar.js'
import Header from './components/Header/Header.js'
import Profile from './components/Profile/Profile';
import NewEvent from './components/Profile/NewEvents'
import './App.css';

import { excon } from 'excon'
import Map from './components/Map/Map';


class App extends Component {
  render() {
    return (
      <div>
        <Header TitleOfPage={"WELCOME"} />
        <Map />
        <NavBar />
        <NewEvent />
      </div>
    );
  }
}

export default App;
