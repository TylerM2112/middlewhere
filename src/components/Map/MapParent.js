import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import logo from './../../assets/images/mwLogoSmallpng.png'
const MapWithAMarker = withScriptjs(withGoogleMap(props =>
    <GoogleMap
      defaultZoom={12}
      defaultCenter={{ lat: props.middlepoint[0], lng: props.middlepoint[1] }}
  >
    {props.markers ?
        props.markers.map(e => {
         
            return <Marker position={{ lat: e.lat, lng: e.lng }}
              onClick={(i) => { props.displayInfoBox({ i: i, name: e.name }) }} />
        })
      :
      <div></div>}

    <Marker icon={logo} position={{ lat: props.middlepoint[0], lng: props.middlepoint[1] }}/>
    </GoogleMap>
  ));

export default MapWithAMarker;


