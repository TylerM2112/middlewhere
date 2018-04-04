import React, { Component } from 'react';
import logo from './logo.svg';
import NavBar from './components/NavBar/NavBar.js'
import Header from './components/Header/Header.js'
import Profile from './components/Profile/Profile';
import Test from './components/Test/Test';
import './App.css';
import {excon} from 'excon'

class App extends Component {
  render() {
    return (
     <div>
       <Header TitleOfPage={"Page Title Here"}/>
       <NavBar/>
       <Profile/>
       {/* <Test lat={36.208114} long={-86.586212}/> */}
     </div>
    );
  }
}

export default App;
