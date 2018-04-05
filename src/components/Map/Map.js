import React, { Component } from 'react';
import MapWithAMarker from './MapParent';
import { middlepoint } from '../../utilities/middlepoint';
import axios from 'axios';


export default class Map extends Component {
  constructor() {
    super();
    this.state = {
      locations: [{ long: -149.894107, lat: 61.203115 }, { long: -149.898655, lat: 61.203221 }, { long: -149.889133, lat: 61.1528869 }, { long: -149.737337, lat: 61.215882 }],
      middlepoint: null,
      yelp: null,
    }
    this.displayMap = this.displayMap.bind(this);
    this.displayYelp = this.displayYelp.bind(this);
  }
  componentDidMount() {
    let mp = middlepoint(this.state.locations);

    this.setState({
      middlepoint: mp
    }, () => {
      //Makes a call to server-side to initiate Yelp API call.
      axios.post('/api/yelp/search', this.state).then(res => {
        this.setState({
          yelp: res.data
        })
      }).catch(error => { console.log("Yelp API Error", error) })
    })
  }

  displayMap() {
    if (this.state.middlepoint !== null) {
      return (
        <MapWithAMarker
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDSrFGEyQytdhP2uxK_GEuYK_Qj1zPnn4c&v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          array={this.state.locations}
          middlepoint={this.state.middlepoint}
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
      <div>
        <div>
          {this.displayMap()}
        </div>
        <div>
          {this.displayYelp()}
        </div>
      </div>

    )
  }
}