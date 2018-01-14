import React, { Component } from 'react';
import { AppRegistry, StyleSheet, View, Text, Image, AsyncStorage, Modal } from 'react-native';
import MapView from 'react-native-maps';
// import { Card, Button } from 'react-native-elements';
// import { Button } from 'react-native-elements'

import CallOutCard from './CallOutCard';
import CardSection from './CardSection';
import Button from './Button';

class Bin extends Component {
  constructor(props){
    super(props);
    this.state = {
      useBinButtondisabled: false, // TODO: not working
      reportFullBinButtonDisabled: false, // TODO: not working
      pinColor: null,
      binText: null,
      binText2: null,
      bothTypes: null,
      useBinSuccessMessage: null,
      modalVisible: false,
    };
  }

  // disableButton() {
  //   console.log('@@@@@@@@ in disableButton @@@@@@@@@');
  //   this.setState({
  //     // once user clicks button, disable it
  //     useBinButtondisabled: true,
  //   })
  //   console.log('New state:');
  //   console.log(this.state);
  //  }

  componentDidMount() {
    this.checkBinType();
  }

  checkBinType() {
    if (Object.keys(this.props.binsHash).length == 1) { //unique location
      if ('GPUBL' in this.props.binsHash) {
        this.setState({
          pinColor: 'black',
          binText: 'GARBAGE',
          bothTypes: false,
        })
      } else if ('RYPUBL' in this.props.binsHash) {
        this.setState({
          pinColor: 'blue',
          binText: 'RECYCLING',
          bothTypes: false,
        })
      }
    } else { //not unique location
      this.setState({
        pinColor: 'purple',
        binText: 'GARBAGE',
        binText2: 'RECYCLING',
        bothTypes: true,
      })
    }
  }

  postRequest(userID, binID, action) {
    console.log('In postRequest, to create user_bin');
    console.log(new Date().toTimeString());

    const userBinURL = 'https://whereyabin.herokuapp.com/user_bins';

    fetch(userBinURL, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userID,
          bin_id: binID,
          user_action: action,
          user_lat: this.props.userLocation.user_lat,
          user_lng: this.props.userLocation.user_lng,
        })
      }
    )
    .then((response) => {
      if (response.status === 200) {
        console.log('API status 200');
        console.log(new Date().toTimeString());

        const parsedResponse = JSON.parse(response._bodyText);

        console.log('parsedResponse:');
        console.log(parsedResponse);

        newUserData = {
          user: parsedResponse.updated_user,
          total_dist: parsedResponse.total_dist,
          user_bins: parsedResponse.user_bins,
        }

        // set modal message
        let modalMessage = null;

        if (action === 'use') {
          this.props.setBinLocation(parsedResponse.bin_location);
          modalMessage = 'BINNED!';
        } else {
          modalMessage = 'REPORTED!';
        }

        this.props.setModalVisible(modalMessage);

        console.log('binLocation: ');
        console.log(parsedResponse.bin_location);

        //TODO: disableButton not working
        // this.disableButton();

        this.props.screenProps.updateAsyncStorage(newUserData);

      } else {
        console.log('@@@@@ API status 400 response body text: @@@@@');
        console.log(response._bodyText);

        const parsedResponse = JSON.parse(response._bodyText);
        console.log('parsedResponse:');
        console.log(parsedResponse);
      }
    })
    .catch((error) => {
      console.log('error:', error);
    })
  }

  useBin(binType) {
    console.log('@@@@@@@@ In useBin function @@@@@@@@@');
    console.log('Getting binID:');

    if (binType === 'UNKNOWN') {
      binType = Object.keys(this.props.binsHash)[0]
    }

    console.log(this.props.binsHash[binType].id);

    let userID = null;
    let binID = this.props.binsHash[binType].id;
    let newUserData = null;

    console.log('Getting USER_KEY: ');
    AsyncStorage.getItem("USER_KEY")
      .then(keyValue => {
        if ( Boolean(keyValue) ) {
          console.log('There is a valid keyValue/USER_KEY: ');
          console.log(JSON.parse(keyValue).user.id);

          userID = JSON.parse(keyValue).user.id;

          this.postRequest(userID, binID, 'use');
        } else {
          console.log('There is not a valid res/USER_KEY: ');
          console.log(keyValue); //TODO: display message to user?
        }
      })
      .catch(err => reject(err));
  }

  reportFullBin(binType) {
    console.log('In reportBinFull:');

    console.log('Getting binID:');

    if (binType === 'UNKNOWN') {
      binType = Object.keys(this.props.binsHash)[0]
    }

    console.log(this.props.binsHash[binType].id);

    let userID = null;
    let binID = this.props.binsHash[binType].id;
    let newUserData = null;


    console.log('Getting USER_KEY: ');
    AsyncStorage.getItem("USER_KEY")
      .then(keyValue => {
        if ( Boolean(keyValue) ) {
          console.log('There is a valid keyValue/USER_KEY: ');
          console.log(JSON.parse(keyValue).user.id);

          userID = JSON.parse(keyValue).user.id;

          this.postRequest(userID, binID, 'full');
        } else {
          console.log('There is not a valid res/USER_KEY: ');
          console.log(keyValue); //TODO: display message to user
        }
      })
      .catch(err => reject(err));
  }

  reportMissingBin(binType) {
    console.log('In reportMissingBin:');
    console.log(new Date().toTimeString());
    console.log('Getting binID:');

    if (binType === 'UNKNOWN') {
      binType = Object.keys(this.props.binsHash)[0]
    }

    console.log(this.props.binsHash[binType].id);

    let userID = null;
    let binID = this.props.binsHash[binType].id;
    let newUserData = null;


    console.log('Getting USER_KEY: ');
    AsyncStorage.getItem("USER_KEY")
      .then(keyValue => {
        if ( Boolean(keyValue) ) {
          console.log('There is a valid keyValue/USER_KEY: ');
          console.log(JSON.parse(keyValue).user.id);

          userID = JSON.parse(keyValue).user.id;

          this.postRequest(userID, binID, 'missing');
        } else {
          console.log('There is not a valid res/USER_KEY: ');
          console.log(keyValue); //TODO: display message to user?
        }
      })
      .catch(err => reject(err));
  }

  render() {

    const useGarbageBin = () => { this.useBin('GPUBL'); }
    const useRecyclingBin = () => { this.useBin('RYPUBL'); }
    const useUnknownBin = () => { this.useBin('UNKNOWN'); }

    const reportFullGarbageBin = () => { this.reportFullBin('GPUBL'); }
    const reportFullRecyclingBin = () => { this.reportFullBin('RYPUBL'); }
    const reportFullUnknownBin = () => { this.reportFullBin('UNKNOWN'); }

    const reportMissingGarbageBin = () => { this.reportMissingBin('GPUBL'); }
    const reportMissingRecyclingBin = () => { this.reportMissingBin('RYPUBL'); }
    const reportMissingUnknownBin = () => { this.reportMissingBin('UNKNOWN'); }


      { if (this.state.bothTypes == false ) {

        return (
          <MapView.Marker
            coordinate={{
              latitude: Object.values(this.props.binsHash)[0].latitude,
              longitude: Object.values(this.props.binsHash)[0].longitude }}
            pinColor={this.state.pinColor}
          >

            <MapView.Callout>

            <CallOutCard>
              <CardSection>
                <View style={ styles.binTypeContainerStyle }>
                  <Image
                    style={ styles.imageStyle }
                    source={ this.state.image }
                    />
                  <Text style={ styles.textStyle }>
                    { this.state.binText }
                  </Text>
                </View>
              </CardSection>

              <CardSection>
                <Button
                  onPress={ useUnknownBin }
                  disabled={ this.state.useBinButtondisabled }
                  accessibilityLabel='Use this bin'
                >
                  USE THIS BIN
                </Button>
              </CardSection>

              <CardSection>
                <Button
                  onPress={ reportFullUnknownBin }
                  disabled={ this.state.reportMissingBinButtonDisabled }
                  accessibilityLabel='Report full bin'
                >
                  REPORT FULL BIN
                </Button>
              </CardSection>

              <CardSection>
                <Button
                  onPress={ reportMissingUnknownBin }
                  disabled={ this.state.reportFullBinButtonDisabled }
                  accessibilityLabel='Report missing bin'
                >
                  REPORT MISSING BIN
                </Button>
              </CardSection>
            </CallOutCard>

            </MapView.Callout>

          </MapView.Marker>

        );

      } else {

        return (
          <MapView.Marker
            coordinate={{
              latitude: Object.values(this.props.binsHash)[0].latitude,
              longitude: Object.values(this.props.binsHash)[0].longitude }}
            pinColor={this.state.pinColor}
          >

          <MapView.Callout>

            <CallOutCard>
              <CardSection>
                <View style={ styles.binTypeContainerStyle }>
                  <Text style={ styles.textStyle }>
                    { this.state.binText }
                  </Text>
                </View>
              </CardSection>

              <CardSection>
                <Button
                  onPress={ useGarbageBin }
                  disabled={ this.state.useBinButtondisabled }
                  accessibilityLabel='Use this bin'
                >
                  USE THIS BIN
                </Button>
              </CardSection>

              <CardSection>
                <Button
                  onPress={ reportFullGarbageBin }
                  disabled={ this.state.reportFullBinButtonDisabled }
                  accessibilityLabel='Report full bin'
                >
                  REPORT FULL BIN
                </Button>
              </CardSection>

              <CardSection>
                <Button
                  onPress={ reportMissingGarbageBin }
                  disabled={ this.state.reportMissingBinButtonDisabled }
                  accessibilityLabel='Report missing bin'
                >
                  REPORT MISSING BIN
                </Button>
              </CardSection>
            </CallOutCard>

            <View style={ styles.addMargin } />

            <CallOutCard>
              <CardSection>
                <View style={ styles.binTypeContainerStyle }>
                  <Text style={ styles.textStyle }>
                    { this.state.binText2 }
                  </Text>
                </View>
              </CardSection>

              <CardSection>
                <Button
                  onPress={ useRecyclingBin }
                  disabled={ this.state.useBinButtondisabled }
                  accessibilityLabel='Use this bin'
                >
                  USE THIS BIN
                </Button>
              </CardSection>

              <CardSection>
                <Button
                  onPress={ reportFullRecyclingBin }
                  disabled={ this.state.reportFullBinButtonDisabled }
                  accessibilityLabel='Report full bin'
                >
                  REPORT FULL BIN
                </Button>
              </CardSection>

              <CardSection>
                <Button
                  onPress={ reportMissingRecyclingBin }
                  disabled={ this.state.reportFullBinButtonDisabled }
                  accessibilityLabel='Report missing bin'
                >
                  REPORT MISSING BIN
                </Button>
              </CardSection>
            </CallOutCard>

            </MapView.Callout>

          </MapView.Marker>

        );
      }
    }
  }
}

const styles = {
  binTypeContainerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
    marginBottom: 2,
  },
  textStyle: {
    fontSize: 14,
    textAlign: 'center',
  },
  addMargin: {
    marginTop: 10,
  }
};

export default Bin;
