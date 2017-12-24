import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text } from 'react-native';
import MapView from 'react-native-maps';

class Bin extends Component {

  //TODO: below doesn't work
  //pinColor= { this.checkBinType }
  checkBinType() {
    console.log('@@@@@@@@ in checkBinType @@@@@@@@@');
    console.log(this.props.bin.bin_type);
    if (this.props.bin.bin_type.includes('N SIDE')) {
      return '#000000';
    } else {
      return 'blue';
    }
  }

  render() {

    return (
      <MapView.Marker
        coordinate={{
          latitude: this.props.bin.latitude, longitude: this.props.bin.longitude}}
        pinColor= 'blue'
      >

        <MapView.Callout>
          <Card>
            
          </Card>
          <Text>Mup?</Text>
          <Text>Mup?</Text>
        </MapView.Callout>

      </MapView.Marker>
    )
  }
}

export default Bin;
