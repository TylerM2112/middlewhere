import React, { Component } from 'react';
import Header from '../Header/Header';
import Map from '../Map/Map';


export default class EventsView extends Component {
    render() {
        return (
            <div>
                <Header TitleOfPage={"Events"}/> 
            </div>
        );
    }
}