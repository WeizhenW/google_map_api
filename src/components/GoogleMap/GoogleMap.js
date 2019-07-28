import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';
import axios from 'axios';

import * as geolib from 'geolib';


class myMap extends Component {
  state = {
    selectedPin: '',
  }

  getDatabaseRestaurants = () => {
    axios.get('/api/restaurants')
      .then(
        response => {
          this.props.dispatch({
            type: 'SET_DATABASE_RESULT',
            payload: response.data,
          })
        }
      )
  }

  componentDidMount(){
    this.getDatabaseRestaurants();
  }

  handleSelectedPin = (pin, type) => {
    console.log('in handle selected pin');
    console.log(pin);
    if(type === 'google'){
      this.setState({
        selectedPin:{
          lat: pin.geometry.location.lat,
          lng: pin.geometry.location.lng,
          name: pin.name,
          address: pin.vicinity,
          rating: pin.rating,
        }
      })
    } else {
      this.setState({
        selectedPin:{
          lat: Number(pin.latitude),
          lng: Number(pin.longitude),
          name: pin.name,
          address: pin.address,
        }
      })
    }
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
          {this.props.isMarkerShown && this.props.reduxState.googleResult.length?
            this.props.reduxState.googleResult.map(restaurant =>
              <Marker 
                key={restaurant.place_id} 
                position={{ lat: restaurant.geometry.location.lat, lng: restaurant.geometry.location.lng }}
                onClick={() => this.handleSelectedPin(restaurant, 'google')} 
              />)
              :
              this.props.reduxState.dbResult.map(restaurant =>
                <Marker 
                  key={restaurant.id} 
                  position={{ lat: Number(restaurant.latitude), lng: Number(restaurant.longitude) }}
                  onClick={() => this.handleSelectedPin(restaurant, 'database')} 
                />)
          }

          {this.state.selectedPin &&
            <InfoWindow
              position={{
                lat: this.state.selectedPin.lat,
                lng: this.state.selectedPin.lng,
              }}
            onCloseClick={this.handleClearSelectedPin}
            >
              <div id="infoWindow">
                <h4>Name: {this.state.selectedPin.name}</h4>
                <h4>Address: {this.state.selectedPin.address}</h4>
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