import React from "react"
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
const { InfoBox } = require("react-google-maps/lib/components/addons/InfoBox");
const MyMapComponent = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) =>
    
  <GoogleMap defaultZoom={8} defaultCenter={{ lat: props.lat, lng: props.long }} >
  <Marker
      position={{ lat: props.lat, lng: props.long }}
      icon={"https://thaikila.com/wp-content/uploads/2015/07/map-png-google-maps-icon-free-icons-57501.png"}
      onClick={()=>alert("hi")}
    />
    <Marker
      position={{ lat: 36.30455, lng: -86.34564 }}
    />

      <div style={{ position:'absolute',top:'0',backgroundColor: `yellow`, opacity: 0.75, padding: `12px` }}>
        <div style={{ fontSize: `16px`, fontColor: `#08233B` }}>
          Hello, Taipei!
        </div>
      </div>
  </GoogleMap>
)

export default class Test extends React.PureComponent {
  state = {
    isMarkerShown: false,
  }

  componentDidMount() {
    // this.delayedShowMarker()
    this.setState({lat:this.props.lat,long:this.props.long})
  }

//   delayedShowMarker = () => {
//     setTimeout(() => {
//       this.setState({ isMarkerShown: true })
//     }, 3000)
//   }

  handleMarkerClick = () => {
    this.setState({ isMarkerShown: false })
    this.delayedShowMarker()
  }

  render() {
    return (
        <div style={{position:'relative'}}>
      <MyMapComponent
        isMarkerShown={this.state.isMarkerShown}
        onMarkerClick={this.handleMarkerClick}
        lat={this.state.lat}
        long={this.state.long}
      />
      </div>
    )
  }
}