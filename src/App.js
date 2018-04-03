import React, { Component } from 'react';
import logo from './logo.svg';
import NavBar from './components/NavBar/NavBar.js'
import './App.css';
import {excon} from 'excon'

class App extends Component {
  render() {
    return (
     <div>
       <NavBar/>
     </div>
    );
  }
}

export default App;
