import React, { Component } from 'react';
import Header from '../Header/Header';
import Map from '../Map/Map';
import ViewEvents from './../../components/ViewEvents/ViewEvents';
import AddEvent from './../../components/AddEvent/AddEvent';
import GroupEvent from './../../components/GroupEvent/GroupEvent';
import {Route} from 'react-router-dom'
export default class EventsView extends Component {
    render() {
        return (
            <div>
                {/* <Header TitleOfPage={"Events"}/>  */}
                {/* <ViewEvents /> */}
                
                <Route exact path='/events/' component={ViewEvents}/>
                <Route exact path='/events/select' component={GroupEvent}/>

                {/* <AddEvent /> */}
            </div>
        );
    }
}