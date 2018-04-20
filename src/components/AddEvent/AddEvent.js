import React, { Component } from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import ReactSwipe from 'react-swipe'
import './AddEvent.css';
import {Link} from 'react-router-dom'

class AddEvent extends Component {
    constructor(){
        super();

        this.state={
            eventName:null,
            eventDate:null,
            eventTime:null,
            eventDeadline:null,
            groups:[],
            selectedGroups:[],
            eventAdmin:null,
            isCreating:true,
        }
        this.displayGroups = this.displayGroups.bind(this);
    }

    componentDidMount() {
        // axios.get(`/api/getUserEvents/${this.props.state.user_id}`)
        //     .then(res=>console.log(res.data));

        axios.get(`/api/getGroups/${this.props.state.user_id}`)
        //on mount axios gets groups associated with users in sessions
      .then(res => { console.log(res.data); this.setState({ groups: res.data, loading: true,groupAdmin:this.props.state.user_id }) })
        // sets state of groups and makes groupAdmin whatever user is in session
      .catch(err => console.log(err));
    }

    addGroupToEvent(id){
        
        let newGroups = this.state.selectedGroups.slice();
        //copy of selected groups
        let index = this.state.selectedGroups.indexOf(id);

        if(index === -1){
            newGroups.push(id);
            document.getElementById(id).style.backgroundColor = "#300032";
        }
        else{
            newGroups.splice(index,1);
            document.getElementById(id).style.backgroundColor = "#c43235";
        }

        this.setState({selectedGroups:newGroups})

    }

    displayGroups(){
        // implementing ReactSwipe
        let html = [];
        if (this.state.groups.length > 0 ) {
          let timer = 0;
          let style = {};
          this.state.groups.map((e, i) => {
            let index = this.state.selectedGroups.indexOf(+e.group_id);
            timer = i;
            style = { animationDelay: `${timer/20}s` }
            html.push(
                <ReactSwipe className="carousel" swipeOptions={{ continuous: false }} key={e.group_id + i} id={"id" + e.group_id}>
                  <div style={style} id={e.group_id} className="groupContainer" onClick={()=>this.addGroupToEvent(e.group_id)}>
                    <div className={!e.flipCard ? "leftContainer" : "leftContainer colorChange"}>
                      <div className="groupTitle">{e.group_title}</div>
                      <div className="groupPurpose">{e.group_purpose}</div>
                      <div className="groupPurpose">{e.group_member_count} {e.group_member_count == 1 ? "member" : "members"}</div>
                
                    </div>
                    <div className={!e.flipCard ? "rightContainer" : "rightContainer colorChange"}>
                      <img className="groupPicture" src={e.picture} />
                    </div>
                  </div>
                  
                </ReactSwipe>
              )

          })
        }

        return html;
    }
        
    render() {
        return (
            <div className="mainAddEventContainer">
                <input placeholder="Event Name" onChange={(e)=>this.setState({eventName:e.target.value})}/>
                <br/>
                <input placeholder="date" type="date" onChange={(e)=>this.setState({eventDate:e.target.value})} />
                <br />
                <input placeholder="time" type="time" onChange={(e)=>this.setState({eventTime:e.target.value})}/>
                <br />

                <input type="date" onChange={e=>this.setState({eventDeadline:e.target.value})}/>
                <Link to={{pathname:'/events/select', state:this.state}} ><button>Select places</button></Link>

                {this.displayGroups()}
            </div>
        );
    }
}

const mapStateToProps = state =>{
    return{
        state:state,
    }
}

export default connect(mapStateToProps)(AddEvent);