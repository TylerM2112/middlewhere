import React, { Component } from 'react';
import logo from './logo.svg';
import NavBar from './components/NavBar/NavBar.js'
import Header from './components/Header/Header.js'
import './App.css';
import Tester from './Tester';
import {excon} from 'excon'

class App extends Component {
  render() {
    return (
     <div>
       <Header TitleOfPage={"Page Title Here"}/>
       <NavBar/>
       <Tester/>
     </div>
    );
  }
}

export default App;
