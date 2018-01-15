'use strict'; //improved error handling, disables some less-than-ideal JS features

import React, { Component } from 'react';
import { AppRegistry, StyleSheet, View, ActivityIndicator, Dimensions, Text, TouchableOpacity } from 'react-native';
import MapView from 'react-native-maps';
import BinMap from './src/components/BinMap';
import Modal from 'react-native-modal';
import Polyline from '@mapbox/polyline';

let { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = .01;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
// const RAILSAPI = 'http://localhost:3000/bins';
const RAILSAPI = 'https://whereyabin.herokuapp.com/bins';


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
      binLocation: null,
      userLocation: null,
      welcomeModalVisible: false,
    }

    // this.watchID = null;
  }

  componentDidMount() {
    console.log('@@@@@@@@@ In App.js, componentDidMount @@@@@@@@@');
    console.log(new Date().toTimeString());
    this.watchID = navigator.geolocation.watchPosition(
      position => {
        let region = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
          error: null,
        }

        const userLocation = {
          user_lat: region.latitude,
          user_lng: region.longitude,
        };

        console.log('Setting state, mapRegion and userLocation');
        this.setState({
          mapRegion: region,
          error: null,
          // bins: responseJson,
          userLocation: userLocation,
        });

        console.log('Getting bins from this.props.screenProps.getBins(region)');
        this.props.screenProps.getBins(region);
        // this.fetchBins(region);
        this.onRegionChangeComplete(region);

      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 0, distanceFilter: 1 }
    );
  }

  setBinLocation(binLocation) {
    console.log('@@@@@@@ In App.js, setBinLocation, binLocation @@@@@@@');
    console.log(binLocation);
    console.log(new Date().toTimeString());

    let currentLocation = `${this.state.mapRegion.latitude},${this.state.mapRegion.longitude}`;

    this.getDirections(currentLocation, binLocation);
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
        console.log('In fetch request to google directions API, response:');
        console.log(new Date().toTimeString());
        console.log('response.json()');
        console.log(response.json());
        console.log(JSON.parse(response._bodyText));
        return JSON.parse(response._bodyText)})
      .then((responseJson) => Polyline.decode(responseJson.routes[0].overview_polyline.points))
      .then((points) => points.map((point, index) => {
        // console.log('In fetch all to google API, points:');
        // console.log(points);
        return {
          latitude: point[0],
          longitude: point[1]
        }
      }))
      .then((coordinates) => this.setState({coordinates: coordinates}))
      .catch(error => console.log(error))
  }

  onRegionChangeComplete(region) {
    //QUESTION: do nothing here? when I try to take this out, errors
    //
    // this.setState({
    //   mapRegion: region,
    //   error: null,
    // });
  }

  // fetchBins(region) {
  //   console.log('@@@@@@@@@@ In App.js, fetchBins, responseJson @@@@@@@@@@');
  //   console.log('BEFORE FETCH');
  //   console.log(new Date().toTimeString());
  //   fetch(RAILSAPI)
  //   .then((response) => response.json())
  //   .then((responseJson) => {
  //     console.log('AFTER FETCH');
  //     console.log(new Date().toTimeString());
  //     console.log(responseJson);
  //
  //     const userLocation = {
  //       user_lat: region.latitude,
  //       user_lng: region.longitude,
  //     };
  //
  //     this.setState({
  //       mapRegion: region,
  //       error: null,
  //       bins: responseJson,
  //       userLocation: userLocation,
  //     });
  //
  //     let currentLocation = `${this.state.mapRegion.latitude},${this.state.mapRegion.longitude}`;
  //
  //     return responseJson;
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
  // }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  setModalVisible(message) {
    this.setState({ modalVisible: true, modalMessage: message }, () => {
      setTimeout(() => {
        this.setState({ modalVisible: false });
      }
      , 300);
    })
  }

  render() {

    console.log('this.props.screenProps.communityData');
    console.log(this.props.screenProps.communityData);

    const { mapRegion, bins } = this.state;

    if (mapRegion && this.props.screenProps.communityData) {

      return (
        <View style={styles.viewContainer}>

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

          <Modal
            style={{ justifyContent: 'flex-end', margin: 0 }}
            isVisible={ this.props.screenProps.welcomeModalVisible }
            onBackdropPress={() => this.props.screenProps.setWelcomeModal(false)}
          >

            <View style={{ flex: 1, backgroundColor: '#ebf0f0', justifyContent: 'center', }}>
              <Text
                style={{ fontSize: 25, textAlign: 'center', fontWeight: 'bold', color: '#284f80', marginBottom: 5, }}>
                Welcome!
              </Text>
              <Text style={{fontSize: 16, marginRight: 15, marginLeft: 15, textAlign: 'center', }}>
                When you catch yourself thinking 'Whereya, Bin?' use this app to find a convenient bin near you.
              </Text>

              <View style={{marginTop: 15, marginRight: 20, marginLeft: 20, backgroundColor: 'white', }}>

                <Text style={{marginTop: 10, textAlign: 'center', color: '#468cba', fontSize: 20, fontWeight: 'bold',}}>
                  How to use the Map
                </Text>
                <Text style={{ fontWeight: 'bold', marginTop: 10, marginRight: 20, marginLeft: 20, textAlign: 'center', fontSize: 16, }}>
                  Tap on pins to: 1) use a bin (directions will pop up!), 2) report a full bin, or 3) report a missing bin.
                </Text>

                <View style={{ marginTop: 5, marginRight: 22, marginLeft: 22, marginBottom: 15, }}>
                  <Text style={{ fontWeight: 'bold', marginTop: 3, fontSize: 15, color: 'purple'}}>
                    PURPLE pins: garbage&recycle
                  </Text>
                  <Text style={{ fontWeight: 'bold', marginTop: 3, fontSize: 15, color: 'blue'}}>
                    BLUE pins: lone recycle bins
                  </Text>
                  <Text style={{ fontWeight: 'bold', marginTop: 3, fontSize: 15, }}>
                    BLACK pins: lone garbage bins
                  </Text>
                </View>

              </View>

              <View style={{marginTop: 15, marginRight: 20, marginLeft: 20, marginBottom: 15, backgroundColor: 'white', }}>
                <Text style={{marginTop: 10, textAlign: 'center', color: '#468cba', fontSize: 18, fontWeight: 'bold',}}>
                  Some interesting information:
                </Text>
                <Text style={{fontWeight: 'bold', marginLeft: 20, marginTop: 10, fontSize: 15,}}>
                  You are user #{this.props.screenProps.communityData.user_count + 1}
                </Text>
                <Text style={{fontWeight: 'bold', marginTop: 3, marginLeft: 20, marginBottom: 10, fontSize: 15,}}>
                  Current total of trash binned: {this.props.screenProps.communityData.action_use_count}
                </Text>
                <Text style={{fontWeight: 'bold', marginTop: 8, marginLeft: 20, marginBottom: 10, fontSize: 15, color: '#284F80'}}>
                  Check out the Community tab for more stats!
                </Text>
              </View>

              <TouchableOpacity onPress={() => this.props.screenProps.setWelcomeModal(false)}>
                <View
                  style={{
                    backgroundColor: 'lightblue',
                    padding: 12,
                    margin: 16,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 4,
                    borderColor: 'rgba(0, 0, 0, 0.1)',}}>
                  <Text style={{fontSize: 16, fontWeight: 'bold'}}>CLOSE</Text>
                </View>
              </TouchableOpacity>

            </View>
          </Modal>

          <BinMap
            userLocation={ this.state.userLocation }
            setBinLocation={ this.setBinLocation.bind(this) }
            coordinates={ this.state.coordinates }
            setModalVisible={ this.setModalVisible.bind(this) }
            screenProps={ this.props.screenProps }
            binsData={ this.props.screenProps.binsData }
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
  viewContainer: {
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
