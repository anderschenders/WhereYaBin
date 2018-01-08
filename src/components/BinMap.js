import React, { Component } from 'react';
import { AppRegistry, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import Bin from './Bin';

const BinMap = ({ mapRegion, onRegionChangeComplete, bins, screenProps, setModalVisible }) => (
  <MapView.Animated
    style={ styles.container }
    showsUserLocation={ true }
    initialRegion={ mapRegion }
    onRegionChangeComplete={ onRegionChangeComplete }
  >
    { bins.map(binArray => <Bin setModalVisible={ setModalVisible } screenProps={ screenProps } binArray={ binArray } key={ binArray[0].id } />) }

  </MapView.Animated>
);

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  }
});

export default BinMap;
