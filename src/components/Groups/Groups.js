import React, { Component } from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import './Groups.css';
import logo from './../../assets/images/mw.png'
import ReactSwipe from 'react-swipe';

class Groups extends Component {
    constructor(){
        super();

        this.state ={
            groups:[],
            loading:false,
        }
    }
    componentDidMount() {
        axios.get(`/api/getGroups/${this.props.state.user_id}`)
            .then(res=>{console.log(res.data);this.setState({groups:res.data,loading:true})})
            .catch(err=>console.log(err));
    }

    showGroup(id){
        let groups = this.state.groups.slice();
        let index = groups.findIndex(e=>e.group_id === id)
        if(typeof groups[index].flipCard === 'undefined'){
            groups[index].flipCard = true;
        }
        else{
            groups[index].flipCard = !groups[index].flipCard;
        }

        this.setState({groups:groups})
    }

    displayGroups(){
        if(this.state.groups.length > 0){
                let timer = 0;
                let style = {};
            return this.state.groups.map((e,i)=>{ 
               
                timer = i/20;
                style = {animationDelay:`${timer}s`}

                    {/* <div style={style} className={!e.flipCard ? "groupContainer" : "groupContainer colorChange"} onClick={()=>this.showGroup(e.group_id)}>
                    <ReactSwipe className="carousel" swipeOptions={{continuous: false}}>
                        <div className="pane1">
                            <div className={!e.flipCard ? "leftContainer" : "leftContainer colorChange"}>
                                <div className="groupTitle">{e.group_title}</div>
                                <div className="groupPurpose">{e.group_purpose}</div>
                                <div>created by: {e.name}</div>
                            </div>
                            <div className={!e.flipCard ? "rightContainer" : "rightContainer colorChange"}>
                                <img className="groupPicture" src={e.picture}/>
                            </div>
                        </div>

                 
                    
                    <div  className="groupDetails">
                        <button className="btn1" onClick={(e)=>{e.stopPropagation();alert("fuck you tyler")}}>SHOW GROUP</button>
                        <button className="btn2" onClick={(e)=>{e.stopPropagation();alert("fuck you tyler")}}>LEAVE GROUP</button>
                    </div>
                    </ReactSwipe>
                    </div> */}
                return(
                     <ReactSwipe className="carousel" swipeOptions={{continuous: false}}>
                     <div style={style} className="groupContainer">
                        <div className={!e.flipCard ? "leftContainer" : "leftContainer colorChange"}>
                                <div className="groupTitle">{e.group_title}</div>
                                <div className="groupPurpose">{e.group_purpose}</div>
                                <div>created by: {e.name}</div>
                            </div>
                            <div className={!e.flipCard ? "rightContainer" : "rightContainer colorChange"}>
                                <img className="groupPicture" src={e.picture}/>
                            </div>
                    </div>
                    <div className="groupDetails">
                       <button className="btn1">SHOW GROUP</button>
                       <button className="btn2">LEAVE GROUP</button>
                    </div>
                    </ReactSwipe>
                )
        })
        }
        else{
            return (<div>No Groups</div>)
        }
    }
    render() {
        return (
            <div className="mainGroupContainer">
            {this.state.loading ?
                this.displayGroups()
            :
                <div><img src={logo}/><center>LOADING</center></div>
            }    
           </div>
            
        );
    }
}

const mapStateToProps = state =>{
    return {
        state:state,
    }
}
export default connect(mapStateToProps)(Groups)