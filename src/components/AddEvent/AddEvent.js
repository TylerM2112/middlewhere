import React, { Component } from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import ReactSwipe from 'react-swipe'
// import './AddEvent.css';
import {Link} from 'react-router-dom'
import SwipeableViews from 'react-swipeable-views';

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
            loaded:false,
        }
        this.displayGroups = this.displayGroups.bind(this);
        this.isValidated = this.isValidated.bind(this);
    }

    componentWillReceiveProps(props) {

        if(props.subView === 2 && props.view === 2){

            if(props.state.user_id){
                axios.get(`/api/getGroups/${this.props.state.user_id}`)
                .then(res => { console.log(res.data); this.setState({ groups: res.data, groupAdmin:props.state.user_id,loaded:true }) })
                .catch(err => console.log(err));
            }
        }
        else{
            if(this.state.loaded){
                this.setState({loaded:false})
            }
        }
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
            document.getElementById(id).removeAttribute("style")
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
                <SwipeableViews axis="x" style={style} resistance key={e.group_id + i} id={"id" + e.group_id} class="groupContainer">
                <div id={e.group_id} style={style} className="groupContainerFlex" onClick={()=>this.addGroupToEvent(e.group_id)}>
                  
                  <div className="leftContainer">
                    <div className="groupTitle">{e.group_title}</div>
                    <div className="groupPurpose">{e.group_purpose}</div>
                    <div className="groupPurpose">{e.group_member_count} {e.group_member_count == 1 ? "member" : "members"}</div>
                  </div>
                  <div>
                    <img className="groupPicture" src={e.picture} />
                  </div>
                </div>
                </SwipeableViews>
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
                {this.state.loaded ?    
            <div>        
                <input placeholder="Event Name" onChange={(e) => { this.setState({ eventName: e.target.value }, () => this.isValidated() )}}/>
                <br/>
                <input placeholder="date" type="date" onChange={(e) => { this.setState({ eventDate: e.target.value }, () => this.isValidated() )}} />
                <br />
                <input placeholder="time" type="time" onChange={(e)=>{this.setState({eventTime:e.target.value}, () => this.isValidated() )}}/>
                <br />

                {console.log("STATE FOR ADDEVENT",this.state)}
                <input type="date" onChange={e => {this.setState({ eventDeadline: e.target.value }, () => this.isValidated() )}} />
                {this.state.validated ?
                    <button onClick={()=>this.props.switchView(2,1,{e:this.state})}>Select places</button>
                    :
                    <div></div>
                        }
                <div className="scrollableContainer">        
                            {this.displayGroups()}
                </div>            
                </div>
                : ''}
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