import React, { Component } from 'react';
import Header from '../Header/Header';
import NewButton from '../Assets/Button/NewButton'
import axios from 'axios';
import Friends from '../Friends/Friends';
import ReactSwipe from 'react-swipe';

export default class FriendsView extends Component {
    constructor(props){
        super(props)

        this.state = {

        }
    }

    // addFriend(id){
    //     axios.post(`/api/friends/:id`, {users})
    // }

    componentDidMount(){
        axios.get('/api/users')
        .then((resp) => {
            this.setState({
                users: resp.data
            })
        })
        .catch((err) => {
            console.log('err', err)
        })
    }

    render() {
        return (
            <div className="mainFriendsContainer">
                <Header TitleOfPage={"Friends"} NewButtonIsShown={true} buttonName={'add friend'}/> 
                
            </div>
        );
    }
}``