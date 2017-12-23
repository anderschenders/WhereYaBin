import React, { Component } from 'react';
import { AppRegistry, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';

const BinMap = ({ mapRegion, onRegionChange, bins }) => (
  <MapView
    style={ styles.container }
    showsUserLocation={ true }
    region= {mapRegion}
    onRegionChange={ onRegionChange }
  >
  </MapView>
);

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  }
});

export default BinMap;
