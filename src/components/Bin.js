import React, { Component } from 'react';
import { AppRegistry, StyleSheet, View, Dimensions } from 'react-native';
import MapView from 'react-native-maps';

class Bin extends Component {

  render() {

    return (
      <MapView.Marker
        coordinate={{
          latitude: this.props.bin.latitude, longitude: this.props.bin.longitude}}
        pinColor='#000000'
      >

        <MapView.Callout>
        </MapView.Callout>

      </MapView.Marker>
    )
  }
}

export default Bin;
