import React, { Component } from 'react';
import axios from 'axios';
import './Friends.css';
import NewButton from '../Assets/Button/NewButton';
import DeleteButton from '../Assets/Button/DeleteButton'


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
            <DeleteButton propsFunction={() => this.deleteFriends(elem.auto_id)} buttonTxt={'delete friend'}/>
        </div>
    ))

    console.log('displayFriends', displayFriends)
        return (
            <div className="display_friends_parent">
                {displayFriends}
            </div>
        );
    }
}