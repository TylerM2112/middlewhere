import React, {Component} from 'react';
import axios from 'axios';
import PostButton from '../Assets/Button/PostButton'
import './displayUsers.css'
import {connect} from 'react-redux'

class DisplayUsers extends Component {
    constructor(props){
        super(props)

        this.state = {
            users: [],
            confirmationMessage:'',
        }
        this.addToFriendsFunc = this.addToFriendsFunc.bind(this)
    }

    componentDidMount(){
        axios.get('/api/users')
        .then((resp) => {
            // console.log('resp.data', resp.data)
            this.setState({
                users: resp.data
            })
        })
        .catch((err) => {
            console.log('err', err)
        })
    }

    addToFriendsFunc(id, index){

        console.log('index', index)
        
        axios.post(`/api/friends/${id}`, {receiver: id, sender: this.props.state.user_id, type: 'FRIEND'})
        .then((resp) => {
            this.setState({confirmationMessage: "request has been sent to " + this.state.users[index].name})
            axios.get('api/friends/')
            .then((resp) => {
                this.setState({
                    newDBfriends: resp.data
                })
            })
            .catch((err) => {
                console.log('err', err)
            })
        })
        .catch((err) => {
            console.log('err', err)
        })
    }


    
    render(){
        const displayUsers = this.state.users.map((elem, i) => {
            return (
                <div>
                    <div><img src={elem.picture}/></div>
                    <div> {elem.name}</div>
                    <PostButton postButtonFunctionProp={() => {this.addToFriendsFunc(elem.auto_id, i)}} label={'ADD TO FRIENDS'} class={"addToFriendsButton"}/>
                </div>
            )   
        })
        return(

            <div >
                <div className="x-box" onClick={window.close()}><h3>X</h3></div>
                <div>{this.state.confirmationMessage}</div>
             <div className="parent_users_display_div">{displayUsers}</div>

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