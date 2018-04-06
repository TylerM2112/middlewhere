import React, { Component } from 'react';
import Header from '../Header/Header';
import Friends from '../Friends/Friends';

export default class FriendsView extends Component {
    render() {
        return (
            <div>
                <Header TitleOfPage={"Friends"}/> 
                <Friends />
            </div>
        );
    }
}