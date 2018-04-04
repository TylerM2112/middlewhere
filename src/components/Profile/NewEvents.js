import React, { Component } from 'react';
import axios from 'axios';
import './newEvents.css';

export default class NewEvent extends Component {
    constructor(props){
        super(props)

        this.state = {
            dbConfirm: '',
            name:'',
            date:'',
            event_description: '',
            startTime:'',
            endTime:'',
            picture:'',
            place: '',

        }
    }

    postEvent(){
        const {name, date, startTime, endTime, event_location, picture, place, event_description} = this.state
        console.log('hit')
        axios.post('/api/new/event', {
            event_name: name, 
            event_date: date, 
            event_start: startTime, 
            event_end: endTime , 
            event_location: place, 
            event_picture: picture, 
            event_description: event_description})
        .then((resp) => {
            console.log('resp.data', resp.data)
        })
        console.log('this.state', this.state)
    }

    render() {
        return (
            <div className="parent-newEvents-div">
                    <h2 className="new-event-h2">Make a new event</h2>
             <span>  <input className="newEvent-input" type="text" onChange={(e) => { this.setState({name: e.target.value})}} placeholder="Event Name"/> </span>
             <span>  <input className="newEvent-input" type="text" onChange={(e) => { this.setState({picture: e.target.value})}} placeholder="picture place holder"/> </span>
             <span>  <input className="newEvent-input" type="text" onChange={(e) => { this.setState({event_description: e.target.value})}} placeholder="describe your event:"/></span>
             <span>  <input className="newEvent-input" type="text" onChange={(e) => { this.setState({place: e.target.value})}} placeholder="Event Location"/></span>
             <span>  <input className="newEvent-input" type="text" onChange={(e) => { this.setState({startTime: e.target.value})}} placeholder="Start Time"/></span>
             <span>  <input className="newEvent-input" type="text" onChange={(e) => { this.setState({endTime: e.target.value})}} placeholder="End Time"/></span>
             <span>  <input className="newEvent-input" type="text" onChange={(e) => { this.setState({date: e.target.value})}} placeholder="Date"/></span>
               <button className="post-event-button" onClick={() => {this.postEvent()}}>SAVE EVENT</button>
            </div>
        );
    }
}