import React, { Component } from 'react';
import "./navbar.css"
import Btn from '../Assets/Button/Btn';
import calendar from '../../assets/images/calendar.png'
import add_group from '../../assets/images/add_group.png'
import friends from '../../assets/images/friends-512.png'
export default class NavBar extends Component {
    render() {
        return (
            <div className="nav_parent_div">
                <Btn label="EVENTS" link="/events" img={calendar}/>
                <Btn label="GROUPS" link="/groups" img= {add_group}/>
                <Btn label="PROFILE" link="/profile"/>
            </div>
        );
    }
}