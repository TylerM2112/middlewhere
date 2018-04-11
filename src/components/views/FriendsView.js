import React, { Component } from 'react';
import Header from '../Header/Header';
import NewButton from '../Assets/Button/NewButton'
import DeleteButton from '../Assets/Button/DeleteButton'
import axios from 'axios';
import DisplayUsers from '../DisplayUsers/DisplayUsers';
import {connect} from "react-redux"
import ReactSwipe from 'react-swipe';
import './friendsView.css';

import {getUser} from '../../ducks/reducer.js'


class FriendsView extends Component {
    constructor(props){
        super(props)

        this.state = {
            users: [],
            confirmationMessage:'',
            friends:[],
            userBool: false,
            addNewUser: 'add new friend'
        }
       
        this.getUserFunction = this.getUserFunction.bind(this)
        this.deleteFriends = this.deleteFriends.bind(this)
    }

    // addFriend(id){
    //     axios.post(`/api/friends/:id`, {users})
    // }


   
    componentDidMount(){
        axios.get(`/api/friends/${this.props.state.user_id}`)
        .then((resp) => {
            console.log("GET FRIENDS CDM",resp.data)
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
        
        this.setState({userBool:!this.state.userBool})
    }

      deleteFriends(id){
          console.log('hit from delete')
          
          axios.delete(`/api/friends/${id}`)
          .then((resp) => {
                console.log('resp', resp)
            /////////////////////////////////
                axios.get(`/api/friends/${this.props.state.user_id}`)
                     .then((resp) => {
                                console.log("DELETE FRIENDS",resp.data)
                                this.setState({
                                friends: resp.data
                                })
                            })
                        .catch((err) => {
                                console.log('err', err)
                                })
            /////////////////////////////////
                })
            .catch((err) => {
                    console.log('err', err)
                    })
      }
    

    render() {

        console.log(this.state)

        const displayFriends = this.state.friends.map((elem) => {

            return (
                <div className="display_friends_array">
                    <div><img src={elem.friend_picture}/></div>
                    <div> {elem.auto_id}</div>
                    <div> {elem.friend_name}</div>
                    <DeleteButton propsFunction={() => this.deleteFriends(elem.auto_id)} buttonTxt={'delete friend'}/>
                </div>
            )   
        })

        return (
            <div>
                <Header TitleOfPage={"Friends"} NewButtonIsShown={true} getUserFunction={this.getUserFunction} />
                <NewButton propsFunction={this.getUserFunction} buttonTxt={this.state.addNewUser}/>
                <div><h1>{this.state.confirmationMessage ? this.state.confirmationMessage : null}</h1></div>
                {this.state.userBool ? <DisplayUsers/> : <div>{displayFriends}</div>}
                
                

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