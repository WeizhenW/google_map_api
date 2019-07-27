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

  componentDidMount(){
    axios.get('/api/restaurants')
      .then(
        response => {
          this.setState({
            restaurantList: response.data,
          })
        }
      )
  }

  handleSelectedPin = (pin) => {
    console.log('in handle selected pin');
    axios.get(`/api/restaurants/${pin.id}`)
      .then(
        response => this.setState({
          selectedPin: response.data[0],
        })
      )
  }

  handleClearSelectedPin = () => {
    this.setState({
      selectedPin: '',
    })
  }

  handleCheckDistance = () => {
    const distance = geolib.getDistance(
      { latitude: this.props.reduxState.currentLocation.latitude, longitude: this.props.reduxState.currentLocation.longitude},
      { latitude: this.state.selectedPin.latitude, longitude: this.state.selectedPin.longitude}
    );
    console.log('distance is', distance);
  
  }

  render() {
    return (
      <>
      {/* {JSON.stringify(this.state, null, 2)} */}
      <GoogleMap
        defaultZoom={16}
        defaultCenter={{lat:Number(this.props.reduxState.currentLocation.latitude), lng: Number(this.props.reduxState.currentLocation.longitude) }}
      >
        {this.props.isMarkerShown && this.state.restaurantList.length &&
        this.state.restaurantList.map(restaurant => 
          <Marker key={restaurant.id} position={{ lat: Number(restaurant.latitude), lng: Number(restaurant.longitude)}} 
            onClick={()=>this.handleSelectedPin(restaurant)}/>
        )
      }

      {this.state.selectedPin && 
      <InfoWindow
      position={{
          lat: Number(this.state.selectedPin.latitude),
          lng: Number(this.state.selectedPin.longitude),
      }}
      onCloseClick={this.handleClearSelectedPin}
    >
      {/* {this.props.selectedPin.ref_organized_by ?
          <div id="infoWindow">
              <h4>Meetup Details</h4>
              <h5>Date: {this.props.selectedPin.date.substring(5, 7) + "/" + this.props.selectedPin.date.substring(8, 10) + "/" + this.props.selectedPin.date.substring(0, 4)}</h5>
              <h5>Time: {this.props.selectedPin.time.substring(0,5)}</h5>
              <Button variant="contained" color="secondary" size="small" onClick={this.viewMeetup}>View</Button>
          </div>
          : */}
          <div id="infoWindow">
              <h4>Name: {this.state.selectedPin.name}</h4>
              <h4>Address: {this.state.selectedPin.address}</h4>
              <button onClick={this.handleCheckDistance}>See detail</button>
          </div>
      {/* } */}
  </InfoWindow>
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