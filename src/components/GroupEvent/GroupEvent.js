import React, { Component } from 'react';
import Map from './../Map/Map';
import SwipeableViews from 'react-swipeable-views'
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
import './GroupEvent.css'
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
      suggestedPlaces:[],
      loaded:false,

    }
    this.getYelp = this.getYelp.bind(this);
    this.addSelectedPlacesToEvent = this.addSelectedPlacesToEvent.bind(this);
    this.addMiddlepoint = this.addMiddlepoint.bind(this);
  }
  
  componentWillReceiveProps(props){
    if(props.view === 2 && props.subView === 1 && props.passedState){
      console.log("i am here")
      const {groupAdmin,eventDate,eventTime,eventDeadline,selectedGroups,eventName,isCreating,group_id,auto_id} = props.passedState.e

      if(isCreating === true){
        axios.post('/api/createEvent',props.passedState.e)
          .then(res=>{
            this.setState({users:res.data,
              groupAdmin:groupAdmin,
              eventDate:eventDate,
              eventTime:eventTime,
              eventDeadline:eventDeadline,
              isCreating:isCreating,
              userId:props.state.user_id,
              eventName:eventName,
              loaded:true})})
          .catch(err=>console.log("CDMCDM",err));
      }
      else{
        axios.get(`/api/getEventDetails/${auto_id}`)
          .then(res=>{console.log("res.data",res.data);this.setState({users:res.data.users,suggestedPlaces:res.data.places,
            loaded:true})})
          .catch(err=>console.log(err))
      }
    }
    else{
      if(this.state.loaded){
        this.setState({loaded:false,yelp:[]})
      }
    }
  }

  getYelp(arr){
    this.setState({yelp:arr.businesses});
    let addMarker = []
      arr.businesses.map(e=>{
        let index = this.state.suggestedPlaces.findIndex(i => i.place_id === e.id && i.user_suggestion === true);
        if(index === -1){}
        else{
          addMarker.push(e)
        }
      })

      this.addToSelectedPlacesInital(addMarker)
    
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

  addToSelectedPlacesInital(j){
    let newMarkers = [];
    let newSelectedPlaces = 0;

    j.map(id=>{
      document.getElementById(id.id).style.backgroundColor = "#E53E4F";
      document.getElementById("img" + id.id).style.display = "none";
      document.getElementById("blackout" + id.id).style.display = "none";
      newMarkers.push({lat:id.coordinates.latitude,lng:id.coordinates.longitude,name:id.name,placeId:id.id})
      newSelectedPlaces += 1;
    });
    
   console.log("newMarkers",newMarkers)

    this.setState({markers:newMarkers,selectedPlaces:newSelectedPlaces})
  }

  addToSelectedPlaces(id){
    let newMarkers = this.state.markers.slice();
    //copies markers array from state
    let newSelectedPlaces = this.state.selectedPlaces
    //initializing variable for selected places count 
    let index = newMarkers.findIndex(e=>e.placeId === id.id);
    let suggestedPlace = this.state.suggestedPlaces.slice();

    if(index === -1){
      console.log("add")
      document.getElementById(id.id).style.backgroundColor = "#E53E4F";
      document.getElementById("img" + id.id).style.display = "none";
      document.getElementById("blackout" + id.id).style.display = "none";
      newMarkers.push({lat:id.coordinates.latitude,lng:id.coordinates.longitude,name:id.name,placeId:id.id})

      let index2 = suggestedPlace.findIndex(e=>e.place_id === id.id);
      if(index2 === -1){
      suggestedPlace.push({count:1,place_id:id.id,user_suggestion:true})
      }
      else{
        suggestedPlace[index2].count = +suggestedPlace[index2].count +1;
      }
      
      newSelectedPlaces += 1;
      //add one to selected placesa
    }
    else{
      newMarkers.splice(index,1);
      
      document.getElementById(id.id).removeAttribute("style")
      document.getElementById("img" + id.id).removeAttribute("style")
      document.getElementById("blackout" + id.id).removeAttribute("style")
      newSelectedPlaces -= 1;

      let index2 = suggestedPlace.findIndex(e=>e.place_id === id.id);
      suggestedPlace[index2].count -=1;
    }

    this.setState({markers:newMarkers,selectedPlaces:newSelectedPlaces,suggestedPlaces:suggestedPlace})
  }

  displayYelp(){
    if(this.state.yelp){
      //if yelp is true
      let timer = 0;

          let style = {};
      return this.state.yelp.map((e,i)=>{
          timer = i;
            style = { animationDelay: `${timer/20}s` }

            let index = this.state.suggestedPlaces.findIndex(i => i.place_id === e.id)
            return(
              <SwipeableViews axis="x" style={style} resistance key={e.ids} class="groupContainer">
                <div style={style}  id={e.id} className="groupContainerFlex eventContainerFlex" onClick={()=>this.addToSelectedPlaces(e)}>
                  <div>
                <div id={"img" + e.id} className="imgBackground"><img src={e.image_url}/></div>
                <div id={"blackout" + e.id} className="blackout"></div>
                <div className="otherFlex">
            
                  <div className="leftContainer eventLeftContainer">
                    
                    <div className="groupTitle">{e.name}</div>
                    <div className="groupPurpose"><img src={this.getRating(e.rating)} /></div>
                    <div className="groupPurpose">Based on {e.review_count} {e.review_count === 1 ? "review" : "reviews"}</div>
                  </div>
                  <div className="eventRightContainer">
                    <div className="groupPurpose">{!this.state.isCreating ? index !== -1 ? this.state.suggestedPlaces[index].count : "0" : ""}</div>
                  </div>
                  </div>
                  </div>
                </div>
                </SwipeableViews>
            )
        return (
        <ReactSwipe className="carousel" swipeOptions={{ continuous: false }} key={e.ids} id={"id" + e.group_id}> 
        {/* from what I remember the swipe continuous === false does now allow user to swipe on selected component */}
          <div style={style} className="groupContainer" id ={e.id} onClick={()=>this.addToSelectedPlaces(e)}>
          {/* when div is selected addToSelectedPlaces is invoked */}
            <div className="yelpName">{e.name}</div>
            <div> {!this.state.isCreating ? index !== -1 ? this.state.suggestedPlaces[index].count : "0" : ""}</div>
          </div>
          </ReactSwipe>
        )
      });
    }
    if (this.state.yelp.length === 0) { 
      return (
        <div>No results found!</div>
      )
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
    if(this.state.isCreating){
    axios.post(`/api/createEventFinal/`,this.state)
      .then()
      .catch(err=>console.log(err));
    }
    else{
      axios.post(`/api/updateEvent`,this.state)
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
        {this.state.loaded ?
          <div>
        {console.log("groupevent loaded",this.state.users)}
          <div className="containerForBtn">
          <button onClick={(e)=>{(e)=>e.preventDefault(); this.setState({showMap:!this.state.showMap})}} href="#">Hide Map</button>
          {this.state.selectedPlaces} {this.state.selectedPlaces === 1 ? "place" : "places"} selected
          <button onClick={()=>this.addSelectedPlacesToEvent()}>Add Selected Places</button>
          <div className="mapContainer mapMoveDown">
          <Map addMiddlepoint={this.addMiddlepoint} locations={this.state.users} getYelp={this.getYelp} getMarkers={this.state.markers} getSelectedInfoBox={this.getSelectedInfoBox} suggestedPlaces={this.state.suggestedPlaces} subView={this.props.subView} view={this.props.view}/>
          </div>
          </div>
          <div className="scrollableContainer eventScrollableContainer">
          
            {this.displayYelp()}
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
export default connect(mapStateToProps)(GroupEvent)