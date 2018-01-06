import React, { Component } from 'react';
import { AppRegistry, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import Bin from './Bin';

const BinMap = ({ mapRegion, onRegionChangeComplete, bins, screenProps }) => (
  <MapView.Animated
    style={ styles.container }
    showsUserLocation={ true }
    region={ mapRegion }
    onRegionChangeComplete={ onRegionChangeComplete }
  >
    { bins.map(binArray => <Bin screenProps={ screenProps } binArray={ binArray } key={ binArray[0].location } />) }

  </MapView.Animated>
);

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  }
});

export default BinMap;
