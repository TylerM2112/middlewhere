import React, { Component } from 'react';
import axios from 'axios';
import './newgroup.css';
import PostBttn from '../Assets/Button/PostButton';
import {connect} from 'react-redux';
import calendar from '../../assets/images/calendar.png'


class NewGroup extends Component {
    constructor(props){
        super(props)

        this.state = {
            dbConfirm: '',
            groupName: '',
            groupPurpose: '',
            groupAdmin:  this.props.state.user_id,

        }
        this.postGroup = this.postGroup.bind(this)
    }
    // setMembers(){
    //     axios.get('/api/')
    // }

    postGroup(){
        const {groupName, groupPurpose, groupAdmin} = this.state

        console.log('hit new Group')
        axios.post(`/api/new/group`, {group_title: groupName, group_admin: groupAdmin, group_purpose: groupPurpose})
        .then((resp) => {
            console.log('resp.data', resp.data)
            alert(resp.data + 'has been posted to db')
            this.setState({
                groupName: '',
                groupPurpose: '',
                groupAdmin: '',

            })
        })
        .catch((err) => {
            console.log('err', err)
        })


       
    }

    render() {
        console.log('this.state', this.state)
        return (
            <div className="parent-newEvents-div">
                    <h2 className="new-event-h2">Make a new event</h2>
             <span>  <input className="newEvent-input" type="text" onChange={(e) => { this.setState({groupName: e.target.value})}} placeholder="Group Name"/> </span>
             <span>  <input className="newEvent-input" type="text" onChange={(e) => { this.setState({groupPurpose: e.target.value})}} placeholder="Group Purpose"/> </span>
             {/* <span>  <input className="newEvent-input" type="text" onChange={(e) => { this.setState({groupAdmin: e.target.value})}} placeholder="Date"/></span> */}
           
            {/* post button takes 2 props (class={} & label={}) */}
               <PostBttn label="SAVE GROUP"  postGroup={this.postGroup} class={"post-event-button"}/>

            </div>
        );
    }
}

const mapStateToProps = state =>{
    return{
        state:state,
    }
}

export default connect(mapStateToProps)(NewGroup)