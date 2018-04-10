import React, { Component } from 'react';
import axios from 'axios';
import './Friends.css'


export default class Friends extends Component {
    constructor(props){
        super(props)

        this.state = {
            friends: []
        }
    }
    componentDidMount(){
        axios.get('/api/friends')
        .then((resp) => {
            console.log('resp.data', resp.data);
            this.setState({
                friends: resp.data
            })
        
        })
        .catch((err) => {
            console.log('err', err)
        })
    }
    
    render() {
       console.log('this.state', this.state)
    const displayFriends = this.state.friends.map((elem) => (
        <div>
            <div>{elem.name}</div>
            <div>{elem.email}</div>
            <div>{elem.phone}</div>
            <div><img src={elem.picture}/></div>
        </div>
    ))

    console.log('displayFriends', displayFriends)
        return (
            <div>
                {displayFriends}
            </div>
        );
    }
}