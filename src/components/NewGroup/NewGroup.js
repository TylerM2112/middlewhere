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
            groupMembers:[],
            friends: [],
            selectClass:'initial',
        }
        this.postGroup = this.postGroup.bind(this)
        this.addToInvites = this.addToInvites.bind(this)
        this.toggleSelect = this.toggleSelect.bind(this)
    }
    
    addToInvites(i){
        console.log('i', i)
    }

    postGroup(){
      const {groupName, groupPurpose, groupMembers} = this.state
      console.log('hit new Group')
      axios.post(`/api/new/group`, {group_title: groupName, group_members: groupMembers, group_purpose: groupPurpose})
      .then((resp) => {
        console.log('resp.data', resp.data)
        alert(resp.data + 'has been posted to db')
        })
        .catch((err) => {
            console.log('err', err)
        })

        this.setState({
          groupName: '',
          groupPurpose: '',
          groupAdmin: '',
              //having trouble with ressetting state after post to db
          })
    }

    componentDidMount(){
      axios.get('/api/friends')
      .then((resp) => {
        console.log('resp.data', resp.data)
        this.setState({
            friends: resp.data
        })
      })
    }

    toggleSelect(){
      if (this.state.selectClass === "initial"){
     this.setState({
      selectClass: "secondary",
     })
       } else {
         this.setState({
           selectClass: "initial",
         })
       }
     }


     pushElem(elem){
       console.log('elem', elem)
        this.setState(prevState => ({groupMembers: [...prevState.groupMembers, elem]}))
     }

    
     render() {
      const displayFriendsOptions = this.state.friends.map((elem,i) => {
        return(
          <option onClick={() => this.pushElem(elem)}>{elem.auto_id} {elem.name}</option>
        )
      })
        console.log('this.state', this.state)
        return (
            <div className="parent-newEvents-div">
              <h2 className="new-event-h2">Make a new event</h2>
              <span><input className="newEvent-input" value={this.state.groupName} type="text" onChange={(e) => { this.setState({groupName: e.target.value})}} placeholder="Group Name"/> </span>
              <span><input className="newEvent-input" value={this.state.groupPurpose} type="text" onChange={(e) => { this.setState({groupPurpose: e.target.value})}} placeholder="Group Purpose"/> </span>
             {/* <span>  <input className="newEvent-input" type="text" onChange={(e) => { this.setState({groupAdmin: e.target.value})}} placeholder="Date"/></span> */}
                
                <div className="group-friends-option" onClick={() => this.toggleSelect()}>
                  <select className={this.state.selectClass} multiple={true}>
                    {displayFriendsOptions}
                  </select>
                </div>

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