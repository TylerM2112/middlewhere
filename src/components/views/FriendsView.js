import React, { Component } from 'react';
import Header from '../Header/Header';
import NewButton from '../Assets/Button/NewButton'
import axios from 'axios';
import Friends from '../Friends/Friends';
import DisplayUsers from '../DisplayUsers/DisplayUsers';
import {connect} from "react-redux"

class FriendsView extends Component {
    constructor(props){
        super(props)

        this.state = {
            users: [],
            confirmationMessage:'',
            friends:[],
            userBool: false,
        }
       
        this.getUserFunction = this.getUserFunction.bind(this)
    }

    // addFriend(id){
    //     axios.post(`/api/friends/:id`, {users})
    // }


   
    componentDidMount(){
        axios.get('/api/friends')
        .then((resp) => {
            console.log(resp.data)
            this.setState({
                friends: resp.data
            })
        })
        .catch((err) => {
            console.log('err', err)
        })
    }
    
    getUserFunction(){
        console.log('hit')
        axios.get('/api/users')
        .then((resp) => {
          this.setState({
            users: resp.data,
            userBool: true,
          })
        })
        .catch((err) => {
          console.log('err', err)
        })
      }
    

    render() {

        console.log(this.state)

        const displayFriends = this.state.friends.map((elem) => {
            return (
                <div>
                    <div><img src={elem.friend_picture}/></div>
                    <div> {elem.friend_name}</div>
                </div>
            )   
        })

        return (
            <div>
                <Header TitleOfPage={"Friends"} NewButtonIsShown={true} getUserFunction={this.getUserFunction} />
                <div><h1>{this.state.confirmationMessage ? this.state.confirmationMessage : null}</h1></div>
                {this.state.userBool ? <DisplayUsers/> : null}
                <div>{displayFriends}</div>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        state:state
    }
}
export default connect(mapStateToProps)(FriendsView)