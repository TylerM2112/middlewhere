import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";

const MapWithAMarker = withScriptjs(withGoogleMap(props =>
    <GoogleMap
      defaultZoom={10}
      defaultCenter={{ lat: props.middlepoint[0], lng: props.middlepoint[1] }}
  > {console.log("markers",props.markers)}
    {props.markers.map(e=>{
      if(e.checked){
        return <Marker position={{lat:e.coordinates.latitude,lng:e.coordinates.longitude}}
        onClick={(i)=>{props.displayInfoBox({i:i,name:e.name})}} />
      }
    })}

    <Marker position={{ lat: props.middlepoint[0], lng: props.middlepoint[1] }}/>
    </GoogleMap>
  ));

export default MapWithAMarker;


