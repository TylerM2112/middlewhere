import React, { Component } from 'react';
import axios from 'axios';
import './newgroup.css';
import PostBttn from '../Assets/Button/PostButton';
import {connect} from 'react-redux';
import calendar from '../../assets/images/calendar.png';
import ReactSwipe from 'react-swipe';


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
            newGroupFriends:[]
        }
        this.postGroup = this.postGroup.bind(this)
        // this.inputValidation =  this.inputValidation.bind(this)
    }

    componentDidMount() {

      axios.get(`/api/friends/${this.props.state.user_id}`)
        .then(res=>this.setState({friends:res.data}))
        .catch(err=>console.log(err))
    }
    
    addToInvites(i){
        console.log('i', i)
    }

    // inputValidation() {
    //   const {groupName, groupPurpose, groupMembers} = this.state
    //   return (groupName === '' ? alert('please, fill out a groupname.') : (groupPurpose === '' ? alert('please fillout a group Purpose') : (groupMembers.length === 0  ? alert('please select group members.') : alert('form submission sucessful'))))}


    postGroup(){
      const {groupName, groupPurpose, groupMembers,newGroupFriends,groupAdmin} = this.state
      console.log('hit new Group')
      axios.post(`/api/new/group`, {group_admin:groupAdmin,group_title: groupName, group_members: newGroupFriends, group_purpose: groupPurpose})
      .then((resp) => {
        console.log('resp.data', resp.data)
        // alert(resp.data + 'has been posted to db')
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


     pushElem(elem){
       console.log('elem', elem)
        this.setState(prevState => ({groupMembers: [...prevState.groupMembers, elem]}))
     }

     addFriendToGroup(id){
        let newGroup = this.state.newGroupFriends.slice();
        let index = newGroup.indexOf(id);
      console.log()
        if(index === -1){
          newGroup.push(id);
        }
        else{
          newGroup.splice(index,1);
        }

        this.setState({newGroupFriends:newGroup});
     }

     displayFriends(){
      if(this.state.friends !== []){
        let timer = 0;
        let style = {};
        return this.state.friends.map((e,i)=>{
          timer = i;
          style = { animationDelay: `${timer/20}s` }
          let index = this.state.newGroupFriends.indexOf(+e.friend_id);
            return(

              <ReactSwipe className="carousel" swipeOptions={{ continuous: false }} key={e.group_id + i} id={"id" + e.group_id}>

                <div style={style} className={index === -1 ? "groupContainer singleFriendDiv" :"groupContainer singleFriendDiv purple" }onClick={()=>this.addFriendToGroup(+e.friend_id)}>
                  <div className="groupTitle">{e.friend_name}</div>
                  <img className="groupPicture" src={e.friend_picture}/>
                  {index !== -1 ?
                  <div className="border"></div>
                :
                  ''}
                </div>
              {/* <div className="singleFriendDiv" onClick={()=>this.addFriendToGroup(+e.friend_id)}>
                {index !== -1 ?
                  <div className="border"></div>
                :
                  ''}
                <img src={e.friend_picture}/><div>{e.friend_name}</div> 
              </div> */}
              </ReactSwipe>
          )
        })
      }
     }

    
     render() {
      // const displayFriendsOptions = this.state.friends.map((elem,i) => {
      //   return(
      //     <option onClick={() => this.pushElem(elem)}>{elem.auto_id} {elem.name}</option>
      //   )
      // })
        return (
            <div className="parent-newEvents-div">
              <div className="newGroupInput">
              <h2 className="new-event-h2">Make a new event</h2>
              <span><input className="newEvent-input" value={this.state.groupName} type="text" onChange={(e) => { this.setState({groupName: e.target.value})}} placeholder="Group Name"/> </span>
              <span><input className="newEvent-input" value={this.state.groupPurpose} type="text" onChange={(e) => { this.setState({groupPurpose: e.target.value})}} placeholder="Group Purpose"/> </span>
              {/* PostButton - prop-name: postButton is Universal prop */}
               <PostBttn label="SAVE GROUP"  postButtonFunctionProp={this.postGroup} class={"post-event-button"}/>
              </div>


                <div className="friendsDiv">
                  {this.displayFriends()}
                </div>

            {/* post button takes 2 props (class={} & label={}) */}
               
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