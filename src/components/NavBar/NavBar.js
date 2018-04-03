import React, { Component } from 'react';
import "./navbar.css"
export default class NavBar extends Component {
    render() {
        return (
            <div className="nav_parent_div">
              <div className="nav_Link_Li"> <img src={require('../../assets/images/calendar.png')}/><h5>EVENTS</h5> </div>
              <div className="nav_Link_Li"><img src={require('../../assets/images/add_group.png')}/><h5>GROUPS</h5></div>
              <div className="nav_Link_Li"><img src={require('../../assets/images/friends-512.png')}/><h5>FRIENDS</h5></div>
          </div>
        );
    }
}