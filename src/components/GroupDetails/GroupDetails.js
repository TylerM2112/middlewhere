import React, { Component } from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
// import './GroupDetails.css';
import ReactSwipe from 'react-swipe';
import SwipeableViews from 'react-swipeable-views'

class GroupDetails extends Component {
    constructor(){
        super();

        this.state = {
            groupDetails:[],
            groupMembers:[],
            isGroupAdmin:false,
        }

    }
    componentWillReceiveProps(props) {
        console.log(props)
        if(props.subView === 1 && props.view === 0 && props.passedState){
            console.log(props.passedState.e)
            this.setState({loaded:true})
            axios.get(`/api/getGroupMembers/${props.passedState.e.group_id}`)
            .then(res=> this.setState({groupDetails:props.passedState.e,
                groupMembers:res.data,
                isGroupAdmin:props.passedState.e.group_admin == props.state.user_id}))
            .catch(err=>console.log(err));
        }
    }

    displayDetails(){
        if(this.state.groupDetails){
            let e = this.state.groupDetails;
            return(
            <SwipeableViews axis="x" resistance key={e.group_id} id={"id" + e.group_id} class="groupContainer">
                <div className="groupContainerFlex">
                  
                  <div className="leftContainer">
                    <div className="groupTitle">{e.group_title}</div>
                    <div className="groupPurpose">{e.group_purpose}</div>
                    <div className="groupPurpose">{e.group_member_count} {e.group_member_count == 1 ? "member" : "members"}</div>
                  </div>
                  <div>
                    <img className="groupPicture" src={e.picture} />
                  </div>
                </div>
              
              <div className="absHeader2">
                  {this.state.isGroupAdmin ? 
                        <div><button onClick={()=>this.deleteGroup()}>Delete Group</button></div>
                    :
                        <div><button onClick={()=>this.leaveGroup()}>Leave Group</button></div> }
              
              </div>
              </SwipeableViews>
            )
        }
    }

    displayGroupMembers(){
        let timer = 0;
        let style = {};
        if(this.state.groupMembers){
            return this.state.groupMembers.map((e,i)=>{
                timer = i;
                style = { animationDelay: `${timer/20}s` }
                return(
                    <SwipeableViews axis="x" style={style} resistance key={e.group_id + i} id={"id" + e.group_id} class="groupContainer">
                <div style={style} className="groupContainerFlex">
                  
                  <div className="leftContainer">
                    <div className="groupTitle">{e.name}</div>
                  </div>
                  <div>
                    <img className="groupPicture" src={e.picture} />
                  </div>
                </div>
                    {this.state.isGroupAdmin ? 
                    //some use for possible conditional admin rendering 
                            <div className="groupMemberContainerRight"><button className="groupContainerButton" onClick={()=>this.removeUser(e.auto_id)}>Remove User</button></div>
                        :
                            ''
                    }
                    </SwipeableViews>
                )
            })
        }
    }
    render() {
        return (
            <div className="mainGroupDetailsContainer">
                {this.displayDetails()}
                <div className="scrollableContainer">
                {this.displayGroupMembers()}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state =>{
    return {
        state:state,
    }
}

export default connect(mapStateToProps)(GroupDetails)