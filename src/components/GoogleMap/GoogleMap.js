import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={16}
    defaultCenter={{ lat: 44.977575, lng: -93.498789 }}
  >
    {props.isMarkerShown && <Marker position={{ lat: 44.977575, lng: -93.498789 }} />}
  </GoogleMap>
))

  export default MyMapComponent;