import React, { Component } from 'react';
import { AppRegistry, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import Bin from './Bin';

const BinMap = ({ mapRegion, onRegionChangeComplete, bins }) => (
  <MapView.Animated
    style={ styles.container }
    showsUserLocation={ true }
    region={ mapRegion }
    onRegionChangeComplete={ onRegionChangeComplete }
  >
    { bins.map(bin => <Bin bin={ bin } key={ bin.id } />) }

  </MapView.Animated>
);

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  }
});

export default BinMap;
