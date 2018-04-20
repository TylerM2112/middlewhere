import React, { Component } from 'react';
import Header from '../Header/Header';
import NewButton from '../Assets/Button/NewButton'
import DeleteButton from '../Assets/Button/DeleteButton'
import axios from 'axios';
import DisplayUsers from '../DisplayUsers/DisplayUsers';
import {connect} from "react-redux";
import ReactSwipe from 'react-swipe';
import './friendsView.css';
import SwipeableViews from 'react-swipeable-views';


import {getUser} from '../../ducks/reducer.js'


class FriendsView extends Component {
    constructor(props){
        super(props)

        this.state = {
            users: [],
            confirmationMessage:'',
            friends:[],
            userBool: false,
            addNewUser: 'ADD NEW FRIEND',
            displayUserDiv: 'display_users_parent_div',
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
        //using setState to alternate text of button 

        if (this.state.userBool === false){
            this.setState({
                addNewUser: "DONE ADDING FRIENDS",
                displayUserDiv: 'secondary_users_parent_div',
            })
        } else if (this.state.userBool === true) {
            this.setState({
                addNewUser: "ADD NEW FRIEND",
                displayUserDiv:'display_users_parent_div',
            })
        }
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

      getSearch(userList){
        console.log('hit from getSearch')
        axios.get(`/api/users${userList}`)
        .then((resp) => {
            console.log('resp', resp)
            this.setState({
                users: resp.data
            })
        })
    }

    //need to find someway to update props in DisplayUser when I click search to fix splice when noticfication has been sent

    trackstate(value){
        this.setState({
            input: value,
        })
    }
    

    render() {

        console.log(this.state)

        const displayFriends = this.state.friends.map((elem) => {

            return (
                <SwipeableViews resistance>
                <div className="display_friends_array">
                    <div><img src={elem.friend_picture}/></div>
                    <div> {elem.auto_id}</div>
                    <div> {elem.friend_name}</div>
                    <DeleteButton propsFunction={() => this.deleteFriends(elem.auto_id)} className="deleteButton" buttonTxt={'delete friend'}/>
                </div>
                </SwipeableViews>
            )   
        })

        return (
            <div>
                <NewButton propsFunction={this.getUserFunction} buttonTxt={this.state.addNewUser} class={'show_user'}/>
                <div><h1>{this.state.confirmationMessage ? this.state.confirmationMessage : null}</h1></div>
                
                {/*putting input here to fix sticky search input */}
                {this.state.userBool ? <div><input className="friend_Search" placeholder="SEARCH " value={this.state.input} onChange={(e) => {this.trackstate(e.target.value)}} type="text"/><NewButton buttonTxt={'SEARCH'} class={'search_button'} propsFunction={() => this.getSearch(this.state.input)}/></div> : null}
                {this.state.userBool ? <DisplayUsers displayUserDiv={this.state.displayUserDiv} users={this.state.users}/> : <div>{displayFriends}</div>}
                
                

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