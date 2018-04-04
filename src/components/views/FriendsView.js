import React, { Component } from 'react';
import Header from '../Header/Header';
import NavBar from '../NavBar/NavBar';

export default class FriendsView extends Component {
    render() {
        return (
            <div>
                <Header TitleOfPage={"Friends"}/> 
                    
                <NavBar/>
            </div>
        );
    }
}