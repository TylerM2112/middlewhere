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
            eventName: '',
            eventDate: '',
            eventTime: '',
            eventDeadline: '',
            groups:[],
            selectedGroups:[],
            eventAdmin:null,
            isCreating: true,
            validated: false,
        }
        this.displayGroups = this.displayGroups.bind(this);
        this.isValidated = this.isValidated.bind(this);
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

        this.setState({selectedGroups:newGroups}, () => this.isValidated())

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

    isValidated() {
        let count = 0;
        console.log("HEEEEEEEY")
        if ( this.state.eventName === '' ) { count += 1 };
        if ( !this.state.eventDate ) { count += 1}
        if ( !this.state.eventTime ) { count += 1}
        if ( !this.state.eventDeadline ) { count += 1 }
        console.log(this.state.selectedGroups[0])
        if ( this.state.selectedGroups.length === 0 ) { count += 1 }
        if ( count === 0 ) {
            this.setState({
                validated: true,
            })
        } else { 
            this.setState({
                validated: false,
            })
        }
     }
        
    render() {
        return (
            <div className="mainAddEventContainer">
                <input placeholder="Event Name" onChange={(e) => { this.setState({ eventName: e.target.value }, () => this.isValidated() )}}/>
                <br/>
                <input placeholder="date" type="date" onChange={(e) => { this.setState({ eventDate: e.target.value }, () => this.isValidated() )}} />
                <br />
                <input placeholder="time" type="time" onChange={(e)=>{this.setState({eventTime:e.target.value}, () => this.isValidated() )}}/>
                <br />

                {console.log("STATE FOR ADDEVENT",this.state)}
                <input type="date" onChange={e => {this.setState({ eventDeadline: e.target.value }, () => this.isValidated() )}} />
                {this.state.validated ?
                    <Link to={{ pathname: '/events/select', state: this.state }} ><button>Select places</button></Link>
                    :
                    <div></div>
                }
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