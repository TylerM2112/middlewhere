import React, { Component } from 'react';
import axios from 'axios';
import './newgroup.css';
import PostBttn from '../Assets/Button/PostButton';
import {connect} from 'react-redux';
import calendar from '../../assets/images/calendar.png';
import SwipeableViews from 'react-swipeable-views';


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
            newGroupFriends: [],
            validated: false,
        }
      this.postGroup = this.postGroup.bind(this);
      this.isValidated = this.isValidated.bind(this);
    }

    componentDidMount() {

    }

    componentWillReceiveProps(props) {

      if(props.subView === 2 && props.view === 0 && this.props.state.user_id){
        axios.get(`/api/friends/${this.props.state.user_id}`)
        .then(res=>{
          console.log('res.data', res.data)
          this.setState({friends:res.data})})
        .catch(err=>console.log(err))
      }
    }
  

    postGroup(){
      console.log('this.state from postgroup', this.state)
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
          document.getElementById(id).style.backgroundColor = "#E53E4F";
        }
        else{
          newGroup.splice(index,1);
          document.getElementById(id).removeAttribute("style")
        }

       this.setState({ newGroupFriends: newGroup }, () => { this.isValidated()});
     }

     displayFriends(){
       console.log('this.state.friends', this.state.friends)
      if(this.state.friends !== []){
        let timer = 0;
        let style = {};
        return this.state.friends.map((e,i)=>{
          timer = i;
          style = { animationDelay: `${timer/20}s` }
          let index = this.state.newGroupFriends.indexOf(+e.user_id);

          return(
            <SwipeableViews axis="x" style={style} resistance key={e.group_id + i} id={"id" + e.user_id} class="groupContainer">
                <div id={+e.user_id} style={style} className="groupContainerFlex" onClick={()=>this.addFriendToGroup(+e.user_id)}>
                  
                  <div className="leftContainer">
                    <div className="groupTitle">{e.friend_name}</div>
                    </div>
                  <div>
                    <img className="groupPicture" src={e.friend_picture} />
                  </div>
                </div>
              </SwipeableViews>
          )
        
        })
      }
     }

    //  writing callback for setState context

     valid = () => {
      this.setState({
        validated: true,
      })
    }

    notValid = () => {
      this.setState({
        validated: false,
      })
    }


  
  isValidated() { 
    let count = 0;
    let that = this
    if (this.state.groupName === '') { count += 1 }
    if (this.state.groupPurpose === '') { count += 1 }
    if (this.state.newGroupFriends.length >= 0) { count += 1 }
    if (count === 0) {
      this.valid()
    } else { 
      this.notValid()
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
              <h2 className="new-event-h2">Make a new group</h2>
              <span><input className="newEvent-input" value={this.state.groupName} type="text" onChange={(e) => { this.setState({ groupName: e.target.value }, () => { this.isValidated() })}} placeholder="Group Name"/> </span>
              <span><input className="newEvent-input" value={this.state.groupPurpose} type="text" onChange={(e) => { this.setState({groupPurpose: e.target.value}, () => { this.isValidated() })}} placeholder="Group Purpose"/> </span>
              {/* PostButton - prop-name: postButton is Universal prop */}
              {/* {this.state.validated ? */}
                <PostBttn label="SAVE GROUP" postButtonFunctionProp={this.postGroup} class={"post-event-button"}/>
                {/* : */}
                <div></div>
              {/* }  */}
              </div>


                <div className="scrollableContainer">
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