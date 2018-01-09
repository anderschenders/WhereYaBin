import React, { Component } from 'react';
import { AppRegistry, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import Bin from './Bin';
import Polyline from '@mapbox/polyline';


const BinMap = ({ userLocation, setBinLocation, coordinates, mapRegion, onRegionChangeComplete, bins, screenProps, setModalVisible }) => (

  // console.log('in BIN MAP, userLocation:');
  // console.log(userLocation);

  <MapView.Animated
    style={ styles.container }
    showsUserLocation={ true }
    initialRegion={ mapRegion }
    onRegionChangeComplete={ onRegionChangeComplete }
  >
    { bins.map(binArray => <Bin userLocation = { userLocation } setBinLocation={ setBinLocation } setModalVisible={ setModalVisible } screenProps={ screenProps } binArray={ binArray } key={ binArray[0].id } />) }

  <MapView.Polyline
    coordinates={ coordinates }
    strokeWidth={ 3 }
    strokeColor='blue' />

  </MapView.Animated>
);

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  }
});

export default BinMap;
