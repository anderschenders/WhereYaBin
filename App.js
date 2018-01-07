'use strict'; //improved error handling, disables some less-than-ideal JS features

import React, { Component } from 'react';
import { AppRegistry, StyleSheet, View, ActivityIndicator, Dimensions, Text } from 'react-native';
import MapView from 'react-native-maps';
import BinMap from './src/components/BinMap';
import Modal from 'react-native-modal'

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
        this.fetchBins(region);
        this.onRegionChangeComplete(region);
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 0, distanceFilter: 1 }
    );
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
    this.setState({ modalVisible: true, modalMessage: message  }, () => {
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
            animationInTiming={100}
            isVisible={ this.state.modalVisible }
            backdropColor='blue'
          >
          <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', height: 100, width: 100 }}>
            <Text
              style={{fontSize: 20, textAlign: 'center', fontWeight: 'bold', color: 'white'}}>
              {this.state.modalMessage}
            </Text>

          </View>

          </Modal>

          <BinMap
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
