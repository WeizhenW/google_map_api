import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';
import axios from 'axios';

import * as geolib from 'geolib';


class myMap extends Component {
  state = {
    restaurantList: [],
    selectedPin: '',
  }

  // componentDidMount(){
  //   axios.get('/api/restaurants')
  //     .then(
  //       response => {
  //         this.props.dispatch({
  //           type: 'SET_DATABASE_RESULT',
  //           payload: response.data,
  //         })
  //         this.setState({
  //           restaurantList: response.data,
  //         })
  //       }
  //     )
  // }

  handleSelectedPin = (pin) => {
    console.log('in handle selected pin');
    console.log(pin);
    this.setState({
      selectedPin: pin,
    });
  }

  handleClearSelectedPin = () => {
    this.setState({
      selectedPin: '',
    })
  }

  handleCheckDistance = () => {
    const distance = geolib.getDistance(
      { latitude: this.props.reduxState.currentLocation.latitude, longitude: this.props.reduxState.currentLocation.longitude },
      { latitude: this.state.selectedPin.latitude, longitude: this.state.selectedPin.longitude }
    );
    console.log('distance is', distance);

  }

  render() {
    return (
        <GoogleMap
          defaultZoom={14}
          defaultCenter={{ lat: Number(this.props.reduxState.currentLocation.latitude), lng: Number(this.props.reduxState.currentLocation.longitude) }}
        >
          {this.props.isMarkerShown && this.props.reduxState.googleResult.length &&
            this.props.reduxState.googleResult.map(restaurant =>
              <Marker 
                key={restaurant.place_id} 
                position={{ lat: restaurant.geometry.location.lat, lng: restaurant.geometry.location.lng }}
                onClick={() => this.handleSelectedPin(restaurant)} 
              />
            )
          }

          {this.state.selectedPin &&
            <InfoWindow
              position={{
                lat: this.state.selectedPin.geometry.location.lat,
                lng: this.state.selectedPin.geometry.location.lng,
              }}
            onCloseClick={this.handleClearSelectedPin}
            >
              
              <div id="infoWindow">
                <h4>Name: {this.state.selectedPin.name}</h4>
                <h4>Address: {this.state.selectedPin.vicinity}</h4>
                <h4>Address: {this.state.selectedPin.rating}</h4>
                <button onClick={this.handleCheckDistance}>See detail</button>
              </div>
              
        </InfoWindow>
          }
        </GoogleMap>
    )
  }
}

const mapReduxStateToProps = reduxState => ({
  reduxState,
})

const WrappedMap = withScriptjs(withGoogleMap(myMap));

export default connect(mapReduxStateToProps)(WrappedMap);