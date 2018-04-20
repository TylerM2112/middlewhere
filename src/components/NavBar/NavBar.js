import React, { Component } from 'react';
import "./navbar.css"
import Btn from '../Assets/Button/Btn';
import calendar from '../../assets/images/white-calendar.png'
import add_group from '../../assets/images/white-group.png'
import friends from '../../assets/images/friends-512.png'
import bestpicture from '../../assets/images/white-profile.png';
export default class NavBar extends Component {
    render() {
        return (
            <div className="nav_parent_div">
                <Btn label="EVENTS" link="/events" img={calendar}/>
                <Btn label="GROUPS" link="/groups" img= {add_group}/>
                <Btn label="PROFILE" link="/profile" img={bestpicture}/>
            </div>
        );
    }
}