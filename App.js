'use strict'; //improved error handling, disables some less-than-ideal JS features

import React, { Component } from 'react';
import { AppRegistry, StyleSheet, View, ActivityIndicator, Dimensions, Text, TouchableOpacity, Picker, Alert } from 'react-native';
import MapView from 'react-native-maps';
import BinMap from './src/components/BinMap';
import Modal from 'react-native-modal';
import Polyline from '@mapbox/polyline';
// import { Icon } from 'react-native-elements';
import ActionButton from 'react-native-action-button';

import { AWS_URL } from './config';


let { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = .01;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
// const RAILSAPI = 'http://localhost:3000/bins';
// const RAILSAPI = 'https://whereyabin.herokuapp.com/bins';
const RAILSAPI = `${AWS_URL}/bins`;

// const addBinURL = 'https://whereyabin.herokuapp.com/bins';
const addBinURL = `${AWS_URL}/bins`;


export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mapRegion: null,
      error: null,
      bins: [],
      coordinates: [],
      binLocation: null,
      userLocation: null,
      welcomeModalVisible: false,
      binsLoaded: false,
      modalVisible: false,
      modalMessage: null,
      addBinModalVisible: false,
      pickerValue: "SELECT",
      userErrorMessage: null,
      userSuccessMessage: null,
    };

    // this.watchID = null;
  }

  componentDidMount() {
    console.log('@@@@@@@@@ In App.js, componentDidMount @@@@@@@@@');
    console.log(new Date().toTimeString());
    this.watchID = navigator.geolocation.watchPosition(
      position => {

        if (this.state.binsLoaded) {
          return;
        }

        let region = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
          error: null,
        };

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
        this.setState({
          binsLoaded: true,
        });
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

  // setModalVisible(message) {
  //   console.log('In setModalVisible');
  //   this.setState({ modalVisible: true, modalMessage: message }, () => {
  //     setTimeout(() => {
  //       this.setState({ modalVisible: false });
  //     }
  //     , 300);
  //   })
  // }

  setModalVisible(message) {
    console.log('In setModalVisible ALERT');
    console.log(message);
    Alert.alert(
      message,
      // [
      //   { text: 'OK', onPress: () => console.log('OK pressed') },
      // ]
    )
    console.log('After ALERT');
  }

  goToAddBinScreen() {
    console.log('In goToAddBinScreen');
    this.props.navigation.navigate('AddBinScreen', {
      userLocation: this.state.userLocation,
      userID: this.props.screenProps.userData.user.id,
    });
  }

  // postAddBin() {
  //   console.log('In postAddBin');
  //   console.log('BEFORE POST request to add bin');
  //   console.log(new Date().toTimeString());
  //
  //   if (this.state.pickerValue === "SELECT" || this.state.pickerValue === null) {
  //     console.log('Invalid pickerValue');
  //     this.setState({
  //       pickerMessage: 'Please select a bin type',
  //     })
  //   } else {
  //     const userID = this.props.screenProps.userData.user.id;
  //     let newUserData = null;
  //
  //     fetch(addBinURL, {
  //         method: 'POST',
  //         headers: {
  //           'Accept': 'application/json',
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({
  //           user_id: userID,
  //           bin_type: this.state.pickerValue,
  //           latitude: this.state.userLocation.user_lat,
  //           longitude: this.state.userLocation.user_lng,
  //         })
  //       }
  //     )
  //     .then((response) => {
  //       if (response.status === 200) {
  //         console.log('AFTER POST to add bin, API status 200');
  //         console.log(new Date().toTimeString());
  //
  //         const parsedResponse = JSON.parse(response._bodyText);
  //
  //         console.log('parsedResponse:');
  //         console.log(parsedResponse);
  //
  //         // newUserData = {
  //         //   user: parsedResponse.updated_user,
  //         //   total_dist: parsedResponse.total_dist,
  //         //   user_bins: parsedResponse.user_bins,
  //         // }
  //
  //         // set response message
  //         let userSuccessMessage = null;
  //         if (parsedResponse.user_message) {
  //           modalMessage = `ADDED! ${parsedResponse.user_message} (refresh app to see!)`;
  //
  //           this.setState({
  //             userErrorMessage: null,
  //             userSuccessMessage: userSuccessMessage,
  //           });
  //
  //         } else {
  //           userSuccessMessage = 'ADDED! (refresh app to see!)';
  //             console.log('In modal setState');
  //
  //           this.setState({
  //             userErrorMessage: null,
  //             userSuccessMessage: userSuccessMessage,
  //           });
  //         }
  //
  //         this.props.screenProps.updateAsyncStorage(parsedResponse);
  //
  //       } else {
  //         console.log('@@@@@ API status 400 response body text: @@@@@');
  //         console.log(response._bodyText);
  //
  //         const parsedResponse = JSON.parse(response._bodyText);
  //         console.log('parsedResponse:');
  //         console.log(parsedResponse);
  //
  //         this.setState({
  //           userSuccessMessage: null,
  //           userErrorMessage: parsedResponse.errors,
  //         })
  //       }
  //     })
  //     .catch((error) => {
  //       console.log('error:', error);
  //     })
  //   }
  // }

  render() {

    const postAddBin = () => { this.postAddBin(); }

    console.log('In App.js, render()');

    const { mapRegion, bins } = this.state;

    if (mapRegion &&  this.props.screenProps.communityData && this.props.screenProps.binsData) {

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

                <Text style={{ fontWeight: 'bold', marginTop: 10, marginRight: 20, marginLeft: 20, textAlign: 'center', fontSize: 16, color: 'rgb(226, 95, 122)' }}>
                  Click on red '+' button to add a bin to the map.
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

          <ActionButton
            buttonColor="rgba(231,76,60,1)"
            onPress={() => this.goToAddBinScreen() }
            activeOpacity={0.70}
          >
          </ActionButton>


          <Modal
            isVisible={this.state.addBinModalVisible}
            style={{ justifyContent: 'center', margin: 0 }}
          >

            <View style={{ flex: 1, height: '100%', width: '100%', backgroundColor: '#ebf0f0', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',}}>

              <View style={{justifyContent: 'center', width: '50%'}}>
              <Text style={{ fontSize: 16, color: 'rgb(55, 110, 233)', fontWeight: 'bold', textAlign: 'center',  }}>{this.state.userSuccessMessage}</Text>
                <Text style={{ fontSize: 16, color: 'rgb(200, 41, 51)', fontWeight: 'bold', textAlign: 'center',  }}>{this.state.userErrorMessage}</Text>
              </View>

              <Picker
                style={{height: 200, width: 300, marginBottom: 10,}}
                selectedValue={this.state.pickerValue}
                onValueChange={(itemValue, itemIndex) => this.setState({pickerValue: itemValue})}>
                <Picker.Item label="Select bin type" value="SELECT" />
                <Picker.Item label="Recycling" value="RYPUBL" />
                <Picker.Item label="Garbage" value="GPUBL" />
                <Picker.Item label="Both" value="BOTH" />
              </Picker>

              <TouchableOpacity
                onPress={ postAddBin }>
                <View
                  style={{
                    backgroundColor: 'lightblue',
                    padding: 8,
                    marginTop: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 4,
                    borderColor: 'rgba(0, 0, 0, 0.1)',}}>
                  <Text style={{fontSize: 16, fontWeight: 'bold'}}>ADD BIN</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={ () => { this.setState({
                    addBinModalVisible: false,
                  });
              }}>
                <View
                  style={{
                    backgroundColor: 'rgb(227, 134, 134)',
                    padding: 8,
                    marginTop: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 4,
                    borderColor: 'rgba(0, 0, 0, 0.1)',}}>
                  <Text style={{fontSize: 16, fontWeight: 'bold'}}>CLOSE</Text>
                </View>
              </TouchableOpacity>

            </View>
          </Modal>

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
