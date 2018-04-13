import React, { Component } from 'react';
import Map from './../Map/Map';
import './GroupEvent.css'
import logo from '../../assets/images/mw.png';
import yelpLogo from './../../assets/images/yelpLogo/Yelp_trademark_RGB.png'
import zero from './../../assets/images/yelp stars/small/small_0.png';
import oneHalf from './../../assets/images/yelp stars/small/small_1_half.png';
import one from './../../assets/images/yelp stars/small/small_1.png';
import twoHalf from './../../assets/images/yelp stars/small/small_2_half.png';
import two from './../../assets/images/yelp stars/small/small_2.png';
import threeHalf from './../../assets/images/yelp stars/small/small_3_half.png';
import three from './../../assets/images/yelp stars/small/small_3.png';
import fourHalf from './../../assets/images/yelp stars/small/small_4_half.png';
import four from './../../assets/images/yelp stars/small/small_4.png';
import five from './../../assets/images/yelp stars/small/small_5.png';
import axios from 'axios';
import ReactSwipe from 'react-swipe';
import {connect} from 'react-redux'
class GroupEvent extends Component {
  constructor(){
    super();

    this.state={
      yelp:[],
      markers:[],
      scrollPosition:0,
      showMap:false,
      selectedPlaces:0,
      users:[],
      middlepoint:null,
      eventAdmin:null,
      eventDate:null,
      eventTime:null,
      eventDeadline:null,
      isCreating:false,

    }

    this.getYelp = this.getYelp.bind(this)
    this.scrollPosition = this.scrollPosition.bind(this);
    this.addSelectedPlacesToEvent = this.addSelectedPlacesToEvent.bind(this)
    this.addMiddlepoint = this.addMiddlepoint.bind(this);
  }

  componentDidMount() {
    const {groupAdmin,eventDate,eventTime,eventDeadline,selectedGroups,isCreating,eventName} = this.props.location.state

    console.log("CDMCDMCDMCDMCDM",this.props.location.state)
    
    if(selectedGroups){
      axios.post('/api/createEvent',this.props.location.state)
        .then(res=>{this.setState({users:res.data,groupAdmin:groupAdmin,eventDate:eventDate,eventTime:eventTime,eventDeadline:eventDeadline,isCreating:isCreating,userId:this.props.state.user_id,eventName:eventName})})
        .catch(err=>console.log("CDMCDM",err));
    }
  }

  getYelp(arr){
    this.setState({yelp:arr.businesses},()=>this.displayYelp());
  }

  // displayBorder(e){
  //   let newYelp = this.state.yelp.slice();
  //   let index = newYelp.findIndex(i=>i.id === e);
    
  //   newYelp[index].checked = !newYelp[index].checked

  //   if(newYelp[index].checked){
  //     this.setState({yelp:newYelp,selectedPlaces:this.state.selectedPlaces+1})
  //   }
  //   else{
  //     this.setState({yelp:newYelp,selectedPlaces:this.state.selectedPlaces-1})
  //   }
    
  // }

  // displayYelp(){
  //   if(this.state.yelp){
  //   return this.state.yelp.map(e=>{
  //     return (<div className="yelpListContainer" id={encodeURI(e.name)} onClick={() => this.displayBorder(e.id)}>

  //     {e.image_url ?  
  //       <img className="pic" src={e.image_url} />
  //       :
  //       <img className="logo-filler" src={logo} />}


  //     <div className="blackout"></div>
  //     <div className="detailsContainer">
  //       <div className="yelpName">{e.name}</div>
  //       <div className="flexContainer">
  //       <div className="rating"><img src={this.getRating(e.rating)}/><br/>
  //       Based on {e.review_count} {e.review_count === 1 ? "Review" : "Reviews"}
  //       </div>
  //       <div className="peopleGoing"> 4</div>
  //       </div>
  //       <div className="yelpDistance">{(e.distance.toFixed(0)/1609.34).toFixed(2)} mi away from midpoint<div className="byYelp"><img src={yelpLogo}/></div></div>
  //     </div>
  //   </div>)
  //   })
  // }
  // else{
  //   return <div>HI</div>
  // }
  // }

  addToSelectedPlaces(id){
    let newMarkers = this.state.markers.slice();
    let newSelectedPlaces = this.state.selectedPlaces
    let index = newMarkers.findIndex(e=>e.placeId === id.id);
    console.log("ID",id)

    if(index === -1){
      document.getElementById(id.id).style.backgroundColor = "#300032";
      newMarkers.push({lat:id.coordinates.latitude,lng:id.coordinates.longitude,name:id.name,placeId:id.id})

      newSelectedPlaces += 1;
    }
    else{
      newMarkers.splice(index,1);
      document.getElementById(id.id).style.backgroundColor = "#c43235";
      newSelectedPlaces -= 1;
    }

    this.setState({markers:newMarkers,selectedPlaces:newSelectedPlaces})
  }

  displayYelp(){
    if(this.state.yelp){
      let timer = 0;
          let style = {};
      return this.state.yelp.map((e,i)=>{
        timer = i;
            style = { animationDelay: `${timer/20}s` }
        return (
        <ReactSwipe className="carousel" swipeOptions={{ continuous: false }} key={e.ids} id={"id" + e.group_id}> 
          <div style={style} className="groupContainer" id ={e.id} onClick={()=>this.addToSelectedPlaces(e)}>
            <div className="yelpName">{e.name}</div>
          </div>
          </ReactSwipe>
        )
      });
    }

  }
//uses rating from yelp and displays yelp stars
  getRating(r){
    switch(r){
      case 0:
        return zero;
      case 1:
        return one;
      case 1.5:
        return oneHalf;
      case 2:
        return two;
      case 2.5:
        return twoHalf;
      case 3:
        return three;
      case 3.5:
        return threeHalf;
      case 4:
        return four;
      case 4.5:
        return fourHalf;
      case 5:
        return five;
    }
  }

  getSelectedInfoBox(e){
    let id = document.getElementById(encodeURI(e)).offsetTop
//getting scrolling position
    document.getElementById("mainYelpList").scrollTo(0,id-240)
    /////////////////////////////////////////////////x, y id-240 meant to offset scroll position from top
  }




  addSelectedPlacesToEvent(){
    console.log(this.state.markers);
    if(this.state.isCreating){
    axios.post(`/api/createEventFinal/`,this.state)
      .then()
      .catch(err=>console.log(err));
    }
  }

  addMiddlepoint(mp){
   this.setState({middlepoint:mp})
  }

  render() {
    return (
      <div className="mainGroupEventContainer">
        {this.state.showMap ?
        <div className="containerForBtn">
        <button onClick={(e)=>{(e)=>e.preventDefault(); this.setState({showMap:!this.state.showMap})}} href="#">Hide Map</button>
        {this.state.selectedPlaces} {this.state.selectedPlaces === 1 ? "place" : "places"} selected
        <button onClick={()=>this.addSelectedPlacesToEvent()}>Add Selected Places</button>
        <div className="mapContainer mapMoveDown">
        <Map addMiddlepoint={this.addMiddlepoint} locations={this.state.users} getYelp={this.getYelp} getMarkers={this.state.markers} getSelectedInfoBox={this.getSelectedInfoBox}/>
        </div>
        </div> : 
        <div  className="containerForBtn">
        <button onClick={(e)=>{(e)=>e.preventDefault(); this.setState({showMap:!this.state.showMap})}} href="#">Show Map</button>
        {this.state.selectedPlaces} {this.state.selectedPlaces === 1 ? "place" : "places"} selected
        <button onClick={()=>this.addSelectedPlacesToEvent()}>Add Selected Places</button>
        <div className="mapContainer mapMoveUp">
        <Map  addMiddlepoint={this.addMiddlepoint} locations={this.state.users} getYelp={this.getYelp} getMarkers={this.state.markers} getSelectedInfoBox={this.getSelectedInfoBox}/>
        </div>
        </div>}
        <div className="mainYelpList" id="mainYelpList" onscroll={this.scrollPosition()}>
        <div className="yelpList" id="yelpList"  onscroll={()=>this.scrollPosition()}>
          {this.displayYelp()}

        </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state =>{
  return{
    state:state,
  }
}
export default connect(mapStateToProps)(GroupEvent)