import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';


class myMap extends Component {

  render() {
    return (
      <>
      {JSON.stringify(this.props)}
      <GoogleMap
        defaultZoom={16}
        defaultCenter={{lat:this.props.reduxState.currentLocation.latitude, lng: this.props.reduxState.currentLocation.longitude }}
      >
        {this.props.isMarkerShown && 
        // <>
        <Marker position={{ lat: 44.9728576, lng: -93.4680556}} />
        // </>
      }
      </GoogleMap>
      </>
    )
  }
}

const mapReduxStateToProps = reduxState => ({
  reduxState,
})

const WrappedMap = withScriptjs(withGoogleMap(myMap));

export default connect(mapReduxStateToProps)(WrappedMap);