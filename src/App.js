import React, { Component } from 'react';
import logo from './logo.svg';
import NavBar from './components/NavBar/NavBar.js'
import './App.css';
import Tester from './Tester';
import {excon} from 'excon'

class App extends Component {
  render() {
    return (
     <div>
       <NavBar/>
       <Tester/>
     </div>
    );
  }
}

export default App;
