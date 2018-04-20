import React, { Component } from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {Link} from 'react-router-dom';
import ReactSwipe from 'react-swipe';
import SwipeableViews from 'react-swipeable-views'
class ViewEvents extends Component {
    constructor(){
        super();

        this.state={
            events:[],
            runAnimation:false,
        }

        this.displayEvents = this.displayEvents.bind(this)
    }

    componentDidMount() {
        axios.get(`/api/getUserEvents/${this.props.state.user_id}`)
            .then(res=>this.setState({events:res.data}))
            .catch(err=>console.log(err));
    }

    componentWillReceiveProps(props){
        if(props.view === 2 && props.subView === 0){
            if(this.props.state.user_id){
            axios.get(`/api/getUserEvents/${this.props.state.user_id}`)
            .then(res=>this.setState({events:res.data,runAnimation:true}))
            .catch(err=>console.log(err));
            }
            else{
            this.setState({runAnimation:true})
            }
        }
    
    }

    displayEvents(){
        let html = [];
        if(this.state.events !== []){
            let timer = 0;
            let style = {};

            let userEvent = this.state.events.filter(e=>e.event_admin == this.props.state.user_id ? true : false)
            let otherEvent = this.state.events.filter(e=>e.event_admin == this.props.state.user_id ? false : true)

            if(userEvent){

                 userEvent.map((e,i)=>{
                    timer = i;
                    style = { animationDelay: `${timer/20}s` }

                     let time = e.event_time.substr(0,2) < 12 ? e.event_time + " AM" : e.event_time.substr(0,2) - 12 + ":" + e.event_time.substr(3,2) + " PM"
                     let date = e.event_date.split("-")
                     date = `${date[1]}/${date[2]}/${date[0]}`;
                     html.push(
                         <SwipeableViews axis="x" style={style} resistance key={e.group_id + i} id={"id" + e.group_id} class="groupContainer eventContainer ">
                            <div style={style} className="groupContainerFlex rightAni">
                            
                            <div className="leftContainer">
                                <div className="groupTitle">{e.event_name}</div>
                                <div className="groupPurpose">on {date} at {time}</div>
                                <div className="groupPurpose">created by: {e.name}</div>
                                <div className="groupPurpose">{e.count} {e.count == 1 ? "person" : "people"} accepted so far</div>
                            </div>
                            <div>
                                <img className="groupPicture" src={e.picture} />
                            </div>
                            </div>
                            

                            <div className="groupDetails">
                            <button className="btn1" 
                                onClick={()=>{
                                this.props.switchView(2,1,{e});
                                }}
                                >SEE EVENT</button>
                               
                            </div>
                        </SwipeableViews>
                     )
                    // html.push(
                    //     <ReactSwipe className="carousel" swipeOptions={{ continuous: false }} key={e.event_id + i} id={"id" + e.event_id}>
                    //         <div style={style} className="groupContainer" >
                    //             <div className="leftContainer">
                    //             <div className="groupTitle">{e.event_name}</div>
                    //             <div className="groupPurpose">on {date} at {time}</div>
                    //             <div>created by: {e.name}</div>
                    //             <div className="groupPurpose">{e.count} {e.count == 1 ? "person" : "people"} accepted so far</div>
                    //         </div>
                    //         <div className={!e.flipCard ? "rightContainer" : "rightContainer colorChange"}>
                    //         <img className="groupPicture" src={e.picture} />
                    //         </div>
                    //     </div>
                    //     <div className="groupDetails">
                    //         <Link to={{pathname:"/events/select",state:{group_id:e.auto_id,isCreating:false}}}><button className="btn1">SHOW GROUP</button></Link>
                    //         <button className="btn2" onClick={()=>this.leaveGroup(e.group_id)}>LEAVE GROUP</button>
                    //     </div>
                    //     </ReactSwipe>)
                })
            }
        }
        return html;
    }

    render() {
        return (
            <div className="mainEventContainer">
                {this.state.runAnimation ?
                <div>
                <div id="userGroups" className="header"><p>Events You've Created</p><button onClick={()=>this.props.switchView(2,2)}>Click</button></div>
                <div className="scrollableContainer" id="groupScrollableContainer" >
                    {this.displayEvents()}
                </div>
                <div id="otherGroups"className="header"><p>Groups You're A Part Of</p></div>
            <div id="clearGroupDiv"></div>
                </div>
                :
                ''}
            </div>
        );
    }
}

const mapStateToProps = state =>{
    return{
        state:state,
    }
}

export default connect(mapStateToProps)(ViewEvents);