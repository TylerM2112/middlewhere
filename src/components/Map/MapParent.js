import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";

const MapWithAMarker = withScriptjs(withGoogleMap(props =>
    <GoogleMap
      defaultZoom={8}
      defaultCenter={{ lat: props.middlepoint[0], lng: props.middlepoint[1] }}
  >
    {props.array.map(e => {
      // console.log(e.lat);
      return (
      <Marker position={{ lat: e.lat, lng: e.long }}
      />)
    })}
    {/* {console.log(props.middlepoint)} */}
    <Marker position={{ lat: props.middlepoint[0], lng: props.middlepoint[1] }}
      />
    </GoogleMap>
  ));

export default MapWithAMarker;


