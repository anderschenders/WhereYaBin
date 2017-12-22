import React, { Component } from 'react';
import { AppRegistry, StyleSheet, View } from 'react-native';
import MapView from 'react-native-maps';

// import App from './App';

export default class WhereYaBin extends Component {
  render() {
    return (
      <MapView
        style ={ styles.container }
        initialRegion={{
          latitude: 47.6282408,
          longitude: -122.31348009999999,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  }
});

AppRegistry.registerComponent('WhereYaBin', () => WhereYaBin);
