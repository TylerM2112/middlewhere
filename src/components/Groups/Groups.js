import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
// import './Groups.css';
import logo from './../../assets/images/mw.png'
import Header from '../Header/Header';
import {Link} from 'react-router-dom'
import Btn from './../Assets/Button/Btn';
import SwipeableViews from 'react-swipeable-views';

class Groups extends Component {
  constructor() {
    super();

    this.state = {
      groups: [],
      loading: false,
      runAnimation:false,
      userGroups:false,
      otherGroups:false,
    }
    this.userGroups = this.userGroups.bind(this);
    this.otherGroups = this.otherGroups.bind(this);
  }
  componentDidMount() {

    if(this.props.state.user_id){
    axios.get(`/api/getGroups/${this.props.state.user_id}`)
      .then(res => {
        console.log(res.data);
        this.setState({ groups: res.data, loading: true })
      })
      .catch(err => console.log(err));
    }



  }


  componentWillReceiveProps(props) {


    if(props.subView === 0 && props.view === 0){
      if(this.props.state.user_id){
        axios.get(`/api/getGroups/${this.props.state.user_id}`)
          .then(res =>this.setState({ groups: res.data, loading: true,runAnimation:true }))
          .catch(err => console.log(err));
        }
      // this.setState({runAnimation:true})
    }
  }

  showGroup(id) {
    let groups = this.state.groups.slice();
    let index = groups.findIndex(e => e.group_id === id)
    if (typeof groups[index].flipCard === 'undefined') {
      groups[index].flipCard = true;
    }
    else {
      groups[index].flipCard = !groups[index].flipCard;
    }

    this.setState({ groups: groups })
  }

  userGroups(){
    let html = [];

    let timer = 0;
    let style = {};
    if(this.state.groups.length > 0){
      // console.log(this.state.groups)
      let userGroups = this.state.groups.filter(e => e.group_admin == this.props.state.user_id);
      let otherGroups = this.state.groups.filter(e => e.group_admin != this.props.state.user_id);

      if(userGroups) {
        // !this.state.userGroups ? this.setState({userGroups:true}) : ''
        userGroups.map((e,i) =>{
          timer = i;
          style = { animationDelay: `${timer/20}s` }
            html.push( 
              <SwipeableViews axis="x" style={style} resistance key={e.group_id + i} id={"id" + e.group_id} class="groupContainer">
                <div style={style} className="groupContainerFlex">
                  
                  <div className="leftContainer">
                    <div className="groupTitle">{e.group_title}</div>
                    <div className="groupPurpose">{e.group_purpose}</div>
                    <div className="groupPurpose">{e.group_member_count} {e.group_member_count == 1 ? "member" : "members"}</div>
                  </div>
                  <div>
                    <img className="groupPicture" src={e.picture} />
                  </div>
                </div>
                

                <div className="groupDetails">
                  <button className="btn1" 
                    onClick={()=>{
                      this.props.switchView(0,1,{e});
                      }}
                      >SHOW GROUP</button>
                    <button className="btn2" onClick={()=>this.leaveGroup(e.group_id)}>DELETE GROUP</button>
                  </div>
                </SwipeableViews>
              
              )
        });
      }
    }

    return html;
  }
  otherGroups(){
    let htmlTwo = [];

    let timer = 0;
    let style = {};
    if(this.state.groups.length > 0){
      // console.log(this.state.groups)
      let userGroups = this.state.groups.filter(e => e.group_admin == this.props.state.user_id);
      let otherGroups = this.state.groups.filter(e => e.group_admin != this.props.state.user_id);

      if(otherGroups) {
        // !this.state.otherGroups ? this.setState({otherGroups:true}) : ''
        otherGroups.map((e,i) =>{
          timer = i;
          style = { animationDelay: `${timer/20}s` }
            htmlTwo.push( 
              <SwipeableViews axis="x" style={style} resistance key={e.group_id + i} id={"id" + e.group_id} class="groupContainer">
                <div style={style} className="groupContainerFlex">
                  
                  <div className="leftContainer">
                    <div className="groupTitle">{e.group_title}</div>
                    <div className="groupPurpose">{e.group_purpose}</div>
                    <div className="groupPurpose">{e.group_member_count} {e.group_member_count == 1 ? "member" : "members"}</div>
                  </div>
                  <div>
                    <img className="groupPicture" src={e.picture} />
                  </div>
                </div>
                

                <div className="groupDetails">
                  <button className="btn1" 
                    onClick={()=>{
                      this.props.switchView(0,1,{e});
                      }}
                      >SHOW GROUP</button>
                    <button className="btn2" onClick={()=>this.leaveGroup(e.group_id)}>DELETE GROUP</button>
                  </div>
                </SwipeableViews>
              
              )
        });
      }
    }

    return htmlTwo;
  }


  // displayGroups(){
  //   let html = [];
  //   console.log("GROUPS STATE",this.state)
  //   if (this.state.groups.length > 0 ) {
  //     let timer = 0;
  //     let style = {};
  // //     this.state.groups.map((e, i) => {
  //       timer = i;
  //       style = { animationDelay: `${timer/20}s` }
  //       if (e.group_admin == this.props.state.user_id) {


  //         //gets groups that user is admin of
  //         html.push(
  //           <SwipeableViews key={e.group_id + i} id={"id" + e.group_id}>
  //             <div style={style} className="groupContainer">
  //               <div className={!e.flipCard ? "leftContainer" : "leftContainer colorChange"}>
  //                 <div className="groupTitle">{e.group_title}</div>
  //                 <div className="groupPurpose">{e.group_purpose}</div>
  //                 <div className="groupPurpose">{e.group_member_count} {e.group_member_count == 1 ? "member" : "members"}</div>
  //               </div>
  //               <div className={!e.flipCard ? "rightContainer" : "rightContainer colorChange"}>
  //                 <img className="groupPicture" src={e.picture} />
  //               </div>
  //             </div>
              // <div className="groupDetails">
              // <button className="btn1" 
              //   onClick={()=>{
              //     this.props.switchView(0,1,{e});
              //     }}
              //     >SHOW GROUP</button>
              //   <button className="btn2" onClick={()=>this.deleteGroup(e.group_id)}>DELETE GROUP</button>
              // </div>
  //           </SwipeableViews>
  //         )
  //       }
  //     })

  //     if(html.length > 0){html.unshift(<div className="groupHeader">Groups You Made <Btn link='/groups/new' label='ADD GROUP'/></div>)}

  //     html.push(<div className="groupHeader">Groups You're Apart Of</div>)
  //     this.state.groups.map((e, i) => {
  //       timer = (timer+1);
  //       style = { animationDelay: `${timer/20}s` }
  //       if (e.group_admin != this.props.state.user_id) {

  //         html.push(
  //           <SwipeableViews key={e.group_id + i} id={"id" + e.group_id}>
  //             <div style={style} className="groupContainer" >
  //               <div className={!e.flipCard ? "leftContainer" : "leftContainer colorChange"}>
  //                 <div className="groupTitle">{e.group_title}</div>
  //                 <div className="groupPurpose">{e.group_purpose}</div>
  //                 <div>created by: {e.name}</div>
  //                 <div className="groupPurpose">{e.group_member_count} {e.group_member_count === 1 ? "member" : "members"}</div>
  //               </div>
  //               <div className={!e.flipCard ? "rightContainer" : "rightContainer colorChange"}>
  //                 <img className="groupPicture" src={e.picture} />
  //               </div>
  //             </div>
  //             <div className="groupDetails">
  //               <button className="btn1" 
  //               onClick={()=>{
  //                 this.props.switchView(0,1,{e});
  //                 }}
  //                 >SHOW GROUP</button>
  //               <button className="btn2" onClick={()=>this.leaveGroup(e.group_id)}>LEAVE GROUP</button>
  //             </div>
  //           </SwipeableViews>
  //         )
  //       }
  //     })
  //   }
  //   else {
  //     return (<div>No Groups<br/><Btn link='/groups/new' label='ADD GROUP'/></div>)
  //   }

  //   return html;
  // }
  leaveGroup(group_id){
    document.getElementById("id"+ group_id).style.animation = "removeGroupAni .7s linear"
    document.getElementById("id"+ group_id).style.animationFillMode = "forwards"
    // document.getElementById("id2"+ group_id).style.animation = "removeGroupAni 5s"
      axios.delete(`/api/deleteUserFromGroup/${group_id}/${this.props.state.user_id}`)
      .then(res=>{console.log("AXIOS GET",res.data);this.setState({groups:res.data})})
      .catch(err=>console.log(err))
    
  }

  deleteGroup(group_id){
    //style.animation give Id concat id with string andd do job
    document.getElementById("id"+ group_id).style.animation = "removeGroupAni .7s linear"
    document.getElementById("id"+ group_id).style.animationFillMode = "forwards"
  }

  changeHeader(){
    document.getElementById("otherGroups").style.position = "absolute";
    document.getElementById("otherGroups").style.top = "0";
  }
  render() {
    // if exists force element to be width of screen 
    document.getElementById("groupScrollableContainer") ? 
    document.getElementById("groupScrollableContainer").addEventListener("scroll", function(evt){
      if(document.getElementById("clearGroupDiv").getBoundingClientRect().top >= 10){
        document.getElementById("userGroups").style.animation="otherGroupsAni .5s forwards";
      }
      if(document.getElementById("clearGroupDiv").getBoundingClientRect().top <= 105){
        // let el = document.getElementById("clearGroupDiv").getBoundingClientRect().top
        // let px = (el - 105) + "px"

        // console.log(document.getElementById("userGroups").style.top)
        // document.getElementById("userGroups").style.position = "absolute";
        // document.getElementById("userGroups").style.top = px
        // document.getElementById("userGroups").style.animation="otherGroupsAni .5s reverse backwards";

      }
      else{
        // if(document.getElementById("clearGroupDiv").getBoundingClientRect().top >= 110){
        document.getElementById("userGroups").removeAttribute("style")
        }
        if (document.getElementById("clearGroupDiv").getBoundingClientRect().top <= 60) {
          // document.getElementById("groupScrollableContainer").style.marginTop = "60px";
          document.getElementById("otherGroups").style.position = "absolute";
          document.getElementById("otherGroups").style.top = "0";
          document.getElementById("otherGroups").style.animation="otherGroupsAni .5s forwards";
          document.getElementById("groupScrollableContainer").style.paddingTop = "108px";
          document.getElementById("groupScrollableContainer").style.height = "78.5vh";
        }
        else{
          console.log('thing')
        document.getElementById("otherGroups").removeAttribute("style")
        document.getElementById("groupScrollableContainer").removeAttribute("style")
  
        
  
        
       
        // document.getElementById("otherGroups").style.top = "inherit"
        
      }
    
    }) : ''

    return (
      <div className="mainGroupContainer">
        {this.state.runAnimation ?
        <div>
        <div className="halfContainer">
          <div id="userGroups" className="header"><p>Groups You've Made</p><button onClick={()=>this.props.switchView(0,2)}>Click</button></div>
          <div className="scrollableContainer" id="groupScrollableContainer" >
            {this.userGroups()}
            {this.userGroups()}
            {this.userGroups()}
            <div id="otherGroups" className="header"><p>Groups You're A Part Of</p></div>
            <div id="clearGroupDiv"></div>
            {this.otherGroups()}
            {this.otherGroups()}
            {this.otherGroups()}
            {this.otherGroups()}

          </div>
        </div>

        {/* <div  className="halfContainer">
          <div className="header"><p>Groups You're A Part Of</p></div>
          <div className="scrollableContainer nonMargin">
            {this.userGroups()}
            {this.userGroups()}
            {this.userGroups()}
            {this.userGroups()}
            {this.userGroups()}
            {this.userGroups()}
            {this.userGroups()}
            {this.userGroups()}
            {this.userGroups()}
            {this.userGroups()}
            {this.userGroups()}
    
          </div>
          </div> */}
        </div>
        
        :
          <div><img src={logo} /><center>LOADING</center></div>}
        
      </div>

    );
  }
}

const mapStateToProps = state => {
  return {
    state: state,
  }
}
export default connect(mapStateToProps)(Groups)