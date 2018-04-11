import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import './Groups.css';
import logo from './../../assets/images/mw.png'
import ReactSwipe from 'react-swipe';
import Header from '../Header/Header';
import {Link} from 'react-router-dom'

class Groups extends Component {
  constructor() {
    super();

    this.state = {
      groups: [],
      loading: false,
    }
  }
  componentDidMount() {
    axios.get(`/api/getGroups/${this.props.state.user_id}`)
      .then(res => { console.log(res.data); this.setState({ groups: res.data, loading: true }) })
      .catch(err => console.log(err));
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


  displayGroups(){
    let html = [];
    if (this.state.groups.length > 0) {
      let timer = 0;
      let style = {};
      this.state.groups.map((e, i) => {
        timer = i;
        style = { animationDelay: `${timer/100}s` }
        if (e.group_admin == this.props.state.user_id) {

          html.push(
            <ReactSwipe className="carousel" swipeOptions={{ continuous: false }} >
              <div style={style} className="groupContainer">
                <div className={!e.flipCard ? "leftContainer" : "leftContainer colorChange"}>
                  <div className="groupTitle">{e.group_title}</div>
                  <div className="groupPurpose">{e.group_purpose}</div>
                  <div className="groupPurpose">{e.group_member_count} {e.group_member_count == 1 ? "member" : "members"}</div>
                </div>
                <div className={!e.flipCard ? "rightContainer" : "rightContainer colorChange"}>
                  <img className="groupPicture" src={e.picture} />
                </div>
              </div>
              <div className="groupDetails">
              <Link to={{pathname:"/groupDetails",state:{e}}}><button className="btn1">SHOW GROUP</button></Link>
                <button className="btn2" onClick={()=>this.deleteGroup(e.group_id)}>DELETE GROUP</button>
              </div>
            </ReactSwipe>
          )
        }
      })
      if(html.length > 0){html.unshift(<div className="groupHeader">Groups You Made</div>)}
      html.push(<div className="groupHeader">Groups You're Apart Of</div>)
      this.state.groups.map((e, i) => {
        timer = (timer+1);
        style = { animationDelay: `${timer/100}s` }
        if (e.group_admin != this.props.state.user_id) {

          html.push(
            <ReactSwipe className="carousel" swipeOptions={{ continuous: false }} key={e.group_id + i} id={"id" + e.group_id}>
              <div style={style} className="groupContainer"id={"id" + e.group_id} >
                <div className={!e.flipCard ? "leftContainer" : "leftContainer colorChange"}>
                  <div className="groupTitle">{e.group_title}</div>
                  <div className="groupPurpose">{e.group_purpose}</div>
                  <div>created by: {e.name}</div>
                  <div className="groupPurpose">{e.group_member_count} {e.group_member_count === 1 ? "member" : "members"}</div>
                </div>
                <div className={!e.flipCard ? "rightContainer" : "rightContainer colorChange"}>
                  <img className="groupPicture" src={e.picture} />
                </div>
              </div>
              <div className="groupDetails" id={"id2" + e.group_id}>
                <Link to={{pathname:"/groupDetails",state:{e}}}><button className="btn1">SHOW GROUP</button></Link>
                <button className="btn2" onClick={()=>this.leaveGroup(e.group_id)}>LEAVE GROUP</button>
              </div>
            </ReactSwipe>
          )
        }
      })
    }
    else {
      return (<div>No Groups</div>)
    }

    return html;

  }

  leaveGroup(group_id){
    document.getElementById("id"+ group_id).style.animation = "removeGroupAni .5s linear"
    document.getElementById("id"+ group_id).style.animationFillMode = "forwards"
    // document.getElementById("id2"+ group_id).style.animation = "removeGroupAni 5s"
      // axios.delete(`/api/deleteUserFromGroup/${group_id}/${this.props.state.user_id}`)
      // .then(res=>{console.log("AXIOS GET",res.data);this.setState({groups:res.data})})
      // .catch(err=>console.log(err))
    
  }
  render() {
    return (
      <div className="mainGroupContainer">
        {this.state.loading ?
          this.displayGroups()
          :
          <div><img src={logo} /><center>LOADING</center></div>
        }
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