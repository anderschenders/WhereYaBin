'use strict'; //Strict Mode - improved error handling, disables some less-than-ideal JS features

import React, { Component } from 'react';
import { AppRegistry, StyleSheet, View, ActivityIndicator, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import BinMap from './src/components/BinMap';


let { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = .01;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const RAILSAPI = 'http://localhost:3000/bins';

export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      mapRegion: null,
      error: null,
      bins: [],
      // regionSet: false,
    }

    this.watchID = null;
  }

  componentDidMount() {
    this.watchID = navigator.geolocation.watchPosition(
      position => {
        let region = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
          error: null,
        }

        this.onRegionChangeComplete(region);
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 0, distanceFilter: 1 }
    );
  }

  onRegionChangeComplete(region) {
    this.fetchBins(region); //do I want to be re-fetching bins every time the user zooms/pans?

    // this.setState({
    //   mapRegion: region,
    //   error: null,
    // });
  }

  fetchBins(region) {
    fetch(RAILSAPI)
    .then((response) => response.json())
    .then((responseJson) => {
      console.log('@@@@@@@@@@ responseJson @@@@@@@@@@');
      console.log(responseJson);
      console.log('@@@@@@@@@@ setState @@@@@@@@@@');

      this.setState({
        mapRegion: region,
        error: null,
        bins: responseJson,
      });

      // this.setState({ bins: responseJson})
      console.log('@@@@@@ In App.js, after setState. New state: ');
      console.log(this.state);

      return responseJson;
    })
    .catch((error) => {
      console.error(error);
    });
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  render() {

    const { mapRegion, bins } = this.state;

    if (mapRegion) {
      return (
        <View style={styles.container}>
          <BinMap
            bins={ bins }
            mapRegion={ mapRegion }
            onRegionChangeComplete={ this.onRegionChangeComplete.bind(this) }
          />
        </View>
      );
    } else {
      return (
        <View style={styles.activityIndicatorStyle}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }

  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
  activityIndicatorStyle: {
    flex: 1,
    justifyContent: 'center',
  },
});

AppRegistry.registerComponent('App', () => WhereYaBin);
