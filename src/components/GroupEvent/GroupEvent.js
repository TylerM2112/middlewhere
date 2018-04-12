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
export default class GroupEvent extends Component {
  constructor(){
    super();

    this.state={
      yelp:[],
      markers:[],
      scrollPosition:0,
      showMap:false,
      selectedPlaces:0,
    }

    this.getYelp = this.getYelp.bind(this)
    this.scrollPosition = this.scrollPosition.bind(this);
  }

  componentDidMount() {
    // let main = document.getElementById("mainYelpList")
    // main.addEventListener("scroll",this.scrollPosition)
  }

  getYelp(arr){
    this.setState({yelp:arr.businesses},()=>this.displayYelp());
  }

  displayBorder(e){
    let newYelp = this.state.yelp.slice();
    let index = newYelp.findIndex(i=>i.id === e);
    
    //makes new field in yelp object 
    newYelp[index].checked = !newYelp[index].checked

    if(newYelp[index].checked){
      this.setState({yelp:newYelp,selectedPlaces:this.state.selectedPlaces+1})
    }
    else{
      this.setState({yelp:newYelp,selectedPlaces:this.state.selectedPlaces-1})
    }
    
  }

  displayYelp(){
    if(this.state.yelp){
    return this.state.yelp.map(e=>{
      return (<div className="yelpListContainer" id={encodeURI(e.name)} onClick={() => this.displayBorder(e.id)}>

      {e.image_url ?  
        <img className="pic" src={e.image_url} />
        :
        <img className="logo-filler" src={logo} />}


      <div className="blackout"></div>

      {/* //checked field determines true or false for condiitonal rendering */}
      {e.checked ? <div className="border"></div> : ''}
      <div className="detailsContainer">
        <div className="yelpName">{e.name}</div>
        <div className="flexContainer">
        {/* //gets rating from yelp and displays stars */}
        <div className="rating"><img src={this.getRating(e.rating)}/><br/>
        Based on {e.review_count} {e.review_count === 1 ? "Review" : "Reviews"}
        </div>
        <div className="peopleGoing"> 4</div>
        </div>
        <div className="yelpDistance">{(e.distance.toFixed(0)/1609.34).toFixed(2)} mi away from midpoint<div className="byYelp"><img src={yelpLogo}/></div></div>
      </div>
    </div>)
    })
  }
  else{
    return <div>HI</div>
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


  render() {
    return (
      <div className="mainGroupEventContainer">
        {this.state.showMap ?
        <div className="containerForBtn">
        <button onClick={(e)=>{(e)=>e.preventDefault(); this.setState({showMap:!this.state.showMap})}} href="#">Hide Map</button>
        {this.state.selectedPlaces} {this.state.selectedPlaces === 1 ? "place" : "places"} selected
        <div className="mapContainer mapMoveDown">
        <Map getYelp={this.getYelp} getMarkers={this.state.yelp} getSelectedInfoBox={this.getSelectedInfoBox}/>
        </div>
        </div> : 
        <div  className="containerForBtn">
        <button onClick={(e)=>{(e)=>e.preventDefault(); this.setState({showMap:!this.state.showMap})}} href="#">Show Map</button>
        {this.state.selectedPlaces} {this.state.selectedPlaces === 1 ? "place" : "places"} selected
        <div className="mapContainer mapMoveUp">
        <Map getYelp={this.getYelp} getMarkers={this.state.yelp} getSelectedInfoBox={this.getSelectedInfoBox}/>
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