import React, { Component } from 'react';
import './App.css';
import MyMap from '../GoogleMap/GoogleMap';

class App extends Component {
  render() {
    return (
      <div className="App">
        <MyMap 
        isMarkerShown
        googleMapURL='https://maps.googleapis.com/maps/api/js?key=&callback=initMap'
        loadingElement={<div style={{ height: '50vh' }} />}
        containerElement={<div style={{ height: `50vh`, width: '50vw' }} />}
        mapElement={<div style={{ height: `100%` }} />}/>
      </div>
    );
  }
  
}

export default App;
