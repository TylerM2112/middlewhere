import React, { Component } from 'react';
import "./navbar.css"
export default class NavBar extends Component {
    render() {
        return (
            <div className="nav_parent_div">
              <div className="nav_Link_Li">EVENTS <i class="fas fa-calendar-alt"></i></div>
              <div className="nav_Link_Li">GROUPS</div>
              <div className="nav_Link_Li">FRIENDS</div>
          </div>
        );
    }
}