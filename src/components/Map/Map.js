import React, { Component } from 'react';
import MapWithAMarker from './MapParent';
import { middlepoint } from '../../utilities/middlepoint';
import axios from 'axios';


export default class Map extends Component {
  constructor() {
    super();
    this.state = {
      locations: [],
      middlepoint: null,
      yelp: null,
      infoBox:false,
      infoBoxX:0,
      infoBoxY:0,
      infoBoxName:null,
      loaded:false,
    }
    this.displayMap = this.displayMap.bind(this);
    this.displayYelp = this.displayYelp.bind(this);
    this.displayInfoBox = this.displayInfoBox.bind(this)
    this.setInfoBox = this.setInfoBox.bind(this)
  }
  componentDidMount() {
    if(this.props.subView === 1 && this.props.view === 2){
      console.log("CDM")
    if(typeof this.props.locations === 'undefined' || this.props.locations.length === 0 || this.state.yelp !== null ){console.log("what");return true }
      if(this.state.loaded){return}
      let mp = middlepoint(this.props.locations);
      this.props.addMiddlepoint(mp);
      this.setState({
        middlepoint: mp,locations:this.props.location,loaded:true
      }, () => {
        //Makes a call to server-side to initiate Yelp API call.
        axios.post('/api/yelp/search', this.state)
        .then(res => {
          console.log("YELP",res.data)
          this.props.getYelp(res.data)

          this.setState({
            yelp: res.data,
            loaded:true,
          })
        }).catch(error => { console.log("Yelp API Error", error) })
      })
    }
    else{
      if(this.state.loaded){
        this.setState({loaded:false,yelp:null})
      }
    }
  }

  componentWillReceiveProps(props){
    console.log("CWRP",props)
    if(props.subView === 1 && props.view === 2){
      if(typeof props.locations === 'undefined' || props.locations.length === 0 || this.state.yelp !== null ){console.log("what");return true }
      if(this.state.loaded){return}
      let mp = middlepoint(props.locations);
      props.addMiddlepoint(mp);
      this.setState({
        middlepoint: mp,locations:props.location,loaded:true
      }, () => {
        //Makes a call to server-side to initiate Yelp API call.
        axios.post('/api/yelp/search', this.state)
        .then(res => {
          console.log("YELP",res.data)
          props.getYelp(res.data)

          this.setState({
            yelp: res.data,
            loaded:true,
          })
        }).catch(error => { console.log("Yelp API Error", error) })
      })
    }
      else{
        if(this.state.loaded){
          this.setState({loaded:false,yelp:null})
        }
      }
  }


  setInfoBox(e){
    if(this.state.infoBoxName !== e.name){
      this.setState({infoBox:true,infoBoxX:e.i.Fa.x,infoBoxY:e.i.Fa.y,infoBoxName:e.name},()=>this.displayInfoBox())
      this.props.getSelectedInfoBox(e.name)
    }
    else{      
      this.setState({infoBox:!this.state.infoBox,infoBoxX:e.i.Fa.x,infoBoxY:e.i.Fa.y,infoBoxName:e.name},()=>this.displayInfoBox())
      this.props.getSelectedInfoBox(e.name)
  }
  }

  displayInfoBox(e){
    // let index = this.props.getMarkers.findIndex(i=>i.name === this.state.infoBoxName)
    // if(index.checked === false && this.sta)
    if(this.state.infoBox){
      let style = {top:this.state.infoBoxY+10,right:this.state.infoBoxX}
  
      return(<div style={style} className="infoBox">{this.state.infoBoxName}</div>)
    }
  }

  displayMap() {
    if (this.state.middlepoint !== null) {
      return (
        <MapWithAMarker
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDSrFGEyQytdhP2uxK_GEuYK_Qj1zPnn4c&v=3.exp&libraries=geometry,drawing,places"

          loadingElement={<div style={{ height: `100%`,width:`100%` }} />}
          containerElement={<div style={{ height: `200px`,width:`100%` }} />}

          mapElement={<div style={{ height: `100%` }} />}
          array={this.state.locations}
          middlepoint={this.state.middlepoint}
          markers={this.props.getMarkers}
          displayInfoBox={this.setInfoBox}
        />
      )
    } else {
      return (
        <div>Loading...</div>
      )
    }
  }

  displayYelp() {
    // console.log(this.state.yelp);
    if (this.state.yelp === false) { 
      return (
        <div>No results were found!</div>
      )
    }
    if (this.state.yelp !== null) {
      return(
      this.state.yelp.businesses.map(e => {
        // console.log(e);
        return (
          <div key={e.id}>
            <div>Name: {e.name}</div>
            <div>Image: {e.image_url}</div>
          </div>
        )
      }));
    } else {
      return (
        <div>Loading...</div>
      )
    }
  }


  render() {
    // console.log(this.state.yelp)
    return (
      <div className="mainMapContainer">
        <div>
          {this.displayInfoBox()}
          {this.displayMap()}
        </div>
      </div>

    )
  }
}``