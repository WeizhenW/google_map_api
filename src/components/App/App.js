import React, { Component } from 'react';
import './App.css';
import MyMap from '../GoogleMap/GoogleMap';

import { connect } from 'react-redux';

class App extends Component {
  state = {
    currentLocation: {
      latitude: '',
      longitude: '',
    }
  }
  //function to get current location from the browser
  getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  showPosition = (position) => {
    this.props.dispatch({
      type: 'SET_CURRENT_LOCATION',
      payload: {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      }  
    });
    this.setState({
      currentLocation: {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      }  
  })
}

  //fire function to get current location
  componentDidMount() {
    this.getLocation();
  }

  render() {
    return (
      <div className="App">
        {/* {JSON.stringify(this.state)} */}
        {/* {JSON.stringify(this.props.reduxState)} */}
        <MyMap
          isMarkerShown
          googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_KEY}&callback=initMap`}
          loadingElement={<div style={{ height: '100vh' }} />}
          containerElement={<div style={{ height: `100vh`, width: '100vw' }} />}
          mapElement={<div style={{ height: `100%` }}
          />} />
      </div>
    );
  }

}

const mapReduxStateToProps = reduxState => ({
  reduxState,
})
export default connect(mapReduxStateToProps)(App);
