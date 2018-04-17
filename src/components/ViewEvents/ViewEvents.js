import React, { Component } from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {Link} from 'react-router-dom';
import ReactSwipe from 'react-swipe';

class ViewEvents extends Component {
    constructor(){
        super();

        this.state={
            events:[],
        }

        this.displayEvents = this.displayEvents.bind(this)
    }

    componentDidMount() {
        axios.get(`/api/getUserEvents/${this.props.state.user_id}`)
            .then(res=>this.setState({events:res.data}))
            .catch(err=>console.log(err));
    }

    displayEvents(){
        let html = [];
        if(this.state.events !== []){
            let timer = 0;
            let style = {};

            let userEvent = this.state.events.filter(e=>e.event_admin == this.props.state.user_id ? true : false)
            let otherEvent = this.state.events.filter(e=>e.event_admin == this.props.state.user_id ? false : true)

            if(userEvent){
                html.push(<div>Events You've Made</div>)

                 userEvent.map((e,i)=>{
                    timer = i;
                    style = { animationDelay: `${timer/20}s` }

                     let time = e.event_time.substr(0,2) < 12 ? e.event_time + " AM" : e.event_time.substr(0,2) - 12 + ":" + e.event_time.substr(3,2) + " PM"
                     let date = e.event_date.split("-")
                     date = `${date[1]}/${date[2]}/${date[0]}`;
                    html.push(
                        <ReactSwipe className="carousel" swipeOptions={{ continuous: false }} key={e.event_id + i} id={"id" + e.event_id}>
                            <div style={style} className="groupContainer" >
                                <div className="leftContainer">
                                <div className="groupTitle">{e.event_name}</div>
                                <div className="groupPurpose">on {date} at {time}</div>
                                <div>created by: {e.name}</div>
                                <div className="groupPurpose">{e.count} {e.count == 1 ? "person" : "people"} accepted so far</div>
                            </div>
                            <div className={!e.flipCard ? "rightContainer" : "rightContainer colorChange"}>
                            <img className="groupPicture" src={e.picture} />
                            </div>
                        </div>
                        <div className="groupDetails">
                            <Link to={{pathname:"/events/select",state:{group_id:e.auto_id,isCreating:false}}}><button className="btn1">SHOW GROUP</button></Link>
                            <button className="btn2" onClick={()=>this.leaveGroup(e.group_id)}>LEAVE GROUP</button>
                        </div>
                        </ReactSwipe>)
                })
            }
        }
        return html;
    }

    render() {
        return (
            <div>
                {this.displayEvents()}
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