'use strict'; //improved error handling, disables some less-than-ideal JS features

import React, { Component } from 'react';
import { AppRegistry, StyleSheet, View, ActivityIndicator, Dimensions, Text } from 'react-native';
import MapView from 'react-native-maps';
import BinMap from './src/components/BinMap';
import Modal from 'react-native-modal';
import Polyline from '@mapbox/polyline';

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
      modalVisible: false,
      modalMessage: null,
      coordinates: [],
    }

    // this.watchID = null;
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
        this.fetchBins(region);
        this.onRegionChangeComplete(region);

      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 0, distanceFilter: 1 }
    );
  }

  getDirections(startLoc, desinationLoc) {
    console.log('@@@@@@@@ In App.js, getDirections() @@@@@@@@');
    const mode = 'walking';
    const APIKEY = 'AIzaSyCDMdyVaob5663a2l6ZSr7Kcuc6wKgsS74';
    let origin = startLoc;
    let destination = desinationLoc;
    let url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${APIKEY}&mode=${mode}`;

    fetch(url)
      .then((response) => {
        console.log('In fetch all to google API, response:');
        console.log('response.json()');
        console.log(response.json());
        console.log(JSON.parse(response._bodyText));
        return JSON.parse(response._bodyText)})
      .then((responseJson) => Polyline.decode(responseJson.routes[0].overview_polyline.points))
      .then((points) => points.map((point, index) => {
        console.log('In fetch all to google API, points:');
        console.log(points);
        return {
          latitude: point[0],
          longitude: point[1]
        }
      }))
      .then((coordinates) => this.setState({coordinates: coordinates}))
      .catch(error => console.log(error))
  }

  onRegionChangeComplete(region) {
    // this.fetchBins(region); //QUESTION: do I want to be re-fetching bins every time the user zooms/pans?

    // this.setState({
    //   mapRegion: region,
    //   error: null,
    // });
  }

  fetchBins(region) {
    fetch(RAILSAPI)
    .then((response) => response.json())
    .then((responseJson) => {
      console.log('@@@@@@@@@@ In App.js, fetchBins, responseJson @@@@@@@@@@');
      console.log(responseJson);

      //QUESTION: is this the right place for setState?
      this.setState({
        mapRegion: region,
        error: null,
        bins: responseJson,
      });

      let currentLocation = `${this.state.mapRegion.latitude},${this.state.mapRegion.longitude}`;
      console.log('current latitude:')
      console.log(this.state.mapRegion.latitude);

      this.getDirections(currentLocation,'47.6240076601029,-122.31271869761');

      console.log('After setState. New state: ');
      console.log(this.state);

      return responseJson;
    })
    .catch((error) => {
      console.error(error); //QUESTION: what else can I do here?
    });
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  setModalVisible(message) {
    this.setState({ modalVisible: true, modalMessage: message }, () => {
      setTimeout(() => {
        console.log('in setTimeout modal');
        this.setState({ modalVisible: false });
        console.log('Bye modal');
      }
      , 500);
    })
  }

  render() {

    const { mapRegion, bins } = this.state;

    if (mapRegion) {
      return (
        <View style={styles.container}>

          <Modal
            style={{ justifyContent: 'flex-end', margin: 0 }}
            isVisible={ this.state.modalVisible }
            onModalHide={() => console.log('Give directions!')}
          >
            <View style={{ backgroundColor: 'white',padding: 22, justifyContent: 'center', alignItems: 'center',}}>
              <Text
                style={{fontSize: 30, textAlign: 'center', fontWeight: 'bold', color: 'blue' }}>
                {this.state.modalMessage}
              </Text>

            </View>

          </Modal>

          <BinMap
            coordinates={ this.state.coordinates }
            setModalVisible={ this.setModalVisible.bind(this) }
            screenProps={ this.props.screenProps }
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
    flex: 1,
    height: '100%',
    width: '100%',
  },
  activityIndicatorStyle: {
    flex: 1,
    justifyContent: 'center',
  },
});

AppRegistry.registerComponent('App', () => WhereYaBin);
