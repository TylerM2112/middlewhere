import React, { Component } from 'react';
import Header from '../Header/Header';
import Map from '../Map/Map';
import ViewEvents from './../../components/ViewEvents/ViewEvents';
import AddEvent from './../../components/AddEvent/AddEvent';
import NewEvents from '../RyansNewEvent/NewEvents'
import GroupEvent from './../../components/GroupEvent/GroupEvent';
import {Route} from 'react-router-dom'
export default class EventsView extends Component {
    render() {
        return (
            <div>
                {/* <Header TitleOfPage={"Events"}/>  */}
                {/* <ViewEvents /> */}

                {/* ask brandon and Tyler why \/\/\/ is here */}
                <Route exact path='/events/' component={AddEvent}/>
                <Route exact path='/events/select' component={GroupEvent}/>

               {/* <NewEvents/> */}
                {/* <GroupEvent/> */}
                 {/* need help displaying component to learn how it works? */}
                {/* <AddEvent /> */}
            </div>
        );
    }
}