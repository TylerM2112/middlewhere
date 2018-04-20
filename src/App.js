import React, { Component } from 'react';
import logo from './logo.svg';
import NavBar from './components/NavBar/NavBar.js'
import Header from './components/Header/Header.js'
import Profile from './components/Profile/Profile';
import NewEvent from './components/Profile/NewEvents'
import Friends from './components/Friends/Friends'
import GroupDetails from './components/GroupDetails/GroupDetails';
import NewGroup from './components/NewGroup/NewGroup';

import LoginView from './components/views/LoginView'
import EventsView from './components/views/EventsView'
import FriendsView from './components/views/FriendsView'
import GroupsView from './components/views/GroupsView'
import {Switch, Route} from 'react-router-dom';
import SwipeableViews from 'react-swipeable-views'

import Groups from './components/Groups/Groups';
import ViewEvents from './components/ViewEvents/ViewEvents';


import GroupEvent from './components/GroupEvent/GroupEvent';
import './Util.css';
import './App.css';

import Map from './components/Map/Map';
import Auth0Form from './components/Auth0Form/Auth0Form';

const styles = {
  tabs: {
    background: '#fff',
    padding:'10px',
    // position:'absolute',
    // bottom:'0',
    display:'inline',
    width:'33.3vw',
    border:'none',
  },
  slide: {
   
    minHeight: 100,
    color: '#fff',
    height:'100vh'
  },
  slides2: {
    padding: '20px',
    height: '200px',
    color: '#fff',
  },
  slide1: {
    backgroundColor: '#FEA900',
  },
  slide2: {
    backgroundColor: '#B3DC4A',
  },
  slide3: {
    backgroundColor: '#6AC0FF',
  },
};
class App extends Component {
  constructor(){
  super();
  this.state = {
    subView: 0,
    currentView:1,
    subViewToLoad:0,
    viewToLoad:1,
    onSwipe:0,
    passedState:null,
  };
}


  switchView = (view,subView,passedState) =>{
    
      this.setState({subView:subView,
        currentView:view,
        goToView:view,
        passedState:passedState});
      window.scrollTo(0,0)
  };

  onSwipe = (view) =>{
    if(this.state.onSwipe < view){
    this.setState({goToView:Math.ceil(view),onSwipe:view});
    }
    else{
      this.setState({goToView:Math.floor(view),onSwipe:view});
    }
  }

  changeIndex = (view) => {
      this.setState({currentView:view,goToView:view})

    window.scrollTo(0,0)
  }

  passState = (state) =>{
    this.setState({passedState:state});
  }

  changeSubView = (index) =>{
    this.setState({subView:index})
  }

  displayGroupView = () =>{
    return (
      <SwipeableViews resistance disabled={true} index={this.state.subView} className="eventsSwipe">
        <Groups subView={this.state.subView} view={this.state.goToView} switchView={this.switchView} passState={this.passState} />

        <GroupDetails subView={this.state.subView} view={this.state.goToView} switchView={this.switchView} passedState={this.state.passedState}/>
        <div></div>
      </SwipeableViews>
    )
  }

  displayProfileView = () =>{

   return(
      <SwipeableViews resistance index={this.state.subView} onChangeIdex ={this.changeSubView} disabled={true}>

        <div>
        <Profile subView={this.state.subView} view={this.state.goToView} />
        </div>
        
      </SwipeableViews>
    )
  }

  displayEventView = () =>{
    return (
      <SwipeableViews resistance index={this.state.subView} disabled={true}>
      <ViewEvents subView={this.state.subView} view={this.state.goToView} switchView={this.switchView} passedState={this.state.passedState} />


      <GroupEvent subView={this.state.subView} view={this.state.goToView} switchView={this.switchView} passedState={this.state.passedState} />

      <NewEvent subView={this.state.subView} view={this.state.goToView} switchView={this.switchView} passedState={this.state.passedState} />

      
      </SwipeableViews>

    )
  }

  render() {
    const { subView,currentView } = this.state;

    return (
      <div className="App">
          <Route exact path="/" component={Auth0Form}/>

        <Route path="/profile" render={(props) => (
        <div>
        <SwipeableViews resistance index={this.state.currentView} onSwitching={this.onSwipe} onChangeIndex={this.changeIndex} disabled={this.state.subView != 0 ? true : false} >
          <div>{this.displayGroupView()}</div>
          <div>{this.displayProfileView()}</div>
          <div>{this.displayEventView()}</div>
        </SwipeableViews>
        <div style={{position:'fixed',bottom:'0',width:'100vw'}}>
        <button className={currentView === 0 ? "navBtn redNav" : "navBtn"} style={styles.tabs} onClick={()=>this.switchView(0,0)}>Groups</button>
        <button className={currentView === 1 ? "navBtn redNav" : "navBtn"} style={styles.tabs} onClick={()=>this.switchView(1,0)}>Profile</button>
        <button className={currentView === 2 ? "navBtn redNav" : "navBtn"} style={styles.tabs} onClick={()=>this.switchView(2,0)}>Events</button>
        </div>
        </div>
        )} />
        </div>
    );
  }
}

export default App;
