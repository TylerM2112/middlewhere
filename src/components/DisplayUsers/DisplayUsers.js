import React, {Component} from 'react';
import axios from 'axios';
import PostButton from '../Assets/Button/PostButton';
import NewButton from '../Assets/Button/NewButton';
import './displayUsers.css';
import {connect} from 'react-redux';
import {getUser} from '../../ducks/reducer.js';

class DisplayUsers extends Component {
    constructor(props){
        super(props)

        this.state = {
            users: [],
            input: '',
            confirmationMessage:'',
        }
        this.addToFriendsFunc = this.addToFriendsFunc.bind(this)
    }

    componentDidMount(){
        
        // axios.get('/api/users')
        // .then((resp) => {
           
        //     this.setState({
        //         users: resp.data
        //     })
        // })
        // .catch((err) => {
        //     console.log('err', err)
        // })
    }

    addToFriendsFunc(id, index){

        console.log('index', index)
        console.log(this.props.state)
        this.state.users.splice(index, 1)

        axios.post(`/api/friends/${id}`, {receiver: id, sender: this.props.state.user_id, type: 'friend'})
        .then((resp) => {
            // this.setState({
                // confirmationMessage: "request has been sent to " + this.state.users[index].name,
            // })

            // axios.get('api/friends/')
            // .then((resp) => {
            //     this.setState({
            //         newDBfriends: resp.data
            //     })
            // })
            // .catch((err) => {
            //     console.log('err', err)
            // })
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

    trackstate(value){
        this.setState({
            input: value,
        })
    }
    
    render(){
        let filteredUsers = this.state.users.filter((user) => {
            return  user.name.indexOf(this.state.input) !== -1;
        })



        const displayUsers = this.state.users.map((elem, i) => {
            return (
                <div className="individual_user_div">
                    <div><img src={elem.picture}/></div>
                    <div> {elem.name}</div>
                    <PostButton  postButtonFunctionProp={() => {this.addToFriendsFunc(elem.auto_id, i)}} label={'ADD TO FRIENDS'} class={"addToFriendsButton"}/>
                </div>
            )   
        })


        
        return(

            <div className="display_users_parent_div">
                <div className="x-box"><input className="friend_Search" value={this.state.input} onChange={(e) => {this.trackstate(e.target.value)}} type="text"/><NewButton buttonTxt={'SEARCH'} class={'search_button'} propsFunction={() => this.getSearch(this.state.input)}/></div>
                <div>{this.state.confirmationMessage}</div>
             <div>{displayUsers}</div>

            </div>
        )
    }
}



const mapStateToProps = (state) => {
    return {
        state:state
    }
}

export default connect(mapStateToProps)(DisplayUsers);