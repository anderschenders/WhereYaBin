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

    // console.log('@@@@@@@ In Bin.js, constructor()');
    // console.log(new Date().toTimeString());
    // console.log(this.props);
  }

  componentDidMount() {
    this.checkBinType();
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

  checkBinType() {
    // console.log('@@@@@@@ In Bin.js, checkBinType() @@@@@@@');
    // console.log(new Date().toTimeString());

    if (this.props.binArray.length == 1) { //unique location
      if (this.props.binArray[0].bin_type === 'GPUBL') {
        this.setState({
          pinColor: 'black',
          binText: 'GARBAGE',
          bothTypes: false,
        })
      } else if (this.props.binArray[0].bin_type === 'RYPUBL') {
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
    fetch(
      'https://whereyabin.herokuapp.com/user_bins', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userID,
          bin_id: binID,
          userAction: action,
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
        }

        // set modal message
        let modalMessage = null;

        if (action === 'use') {
          modalMessage = 'BINNED!';
        } else {
          modalMessage = 'REPORTED!';
        }

        this.props.setModalVisible(modalMessage);

        console.log('binLocation: ');
        console.log(parsedResponse.bin_location);

        this.props.setBinLocation(parsedResponse.bin_location);

        //TODO: disableButton not working
        // this.disableButton();

        // remove USER_KEY from AsyncStorage
        AsyncStorage.removeItem('USER_KEY')
        .then(res => {
          console.log('AsyncStorage removeItem resolved')
          console.log('AsyncStorage setItem: ');

          // set USER_KEY with updated user data
          AsyncStorage.setItem("USER_KEY", JSON.stringify(newUserData))
          .then(res => {
            console.log("Successfully set new user data ");
            this.props.screenProps.setUserData(newUserData);
          })
          .catch(err => console.log(err))
        })
        .catch(err => console.log(err))

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

  useBin() {
    console.log('@@@@@@@@ In useBin function @@@@@@@@@');
    console.log('Getting binID:');
    console.log(this.props.binArray[0].id);

    let userID = null;
    let binID = this.props.binArray[0].id;
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

  useRecycleBin() {
    console.log('@@@@@@@@ In useRecycleBin function @@@@@@@@@');
    console.log('Getting binID:');
    console.log(this.props.binArray[1].id);

    let userID = null;
    let binID = this.props.binArray[1].id;
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

  reportBinFull() {
    console.log('In reportBinFull:');

    console.log('Getting binID:');
    console.log(this.props.binArray[0].id);

    let userID = null;
    let binID = this.props.binArray[0].id;
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

  reportRecyclingBinFull() {
    console.log('In reportRecyclingBinFull:');
    console.log(new Date().toTimeString());
    console.log('Getting binID:');
    console.log(this.props.binArray[1].id);

    let userID = null;
    let binID = this.props.binArray[1].id;
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
          console.log(keyValue); //TODO: display message to user?
        }
      })
      .catch(err => reject(err));
  }

  reportMissingBin() {
    console.log('In reportMissingBin:');
    console.log(new Date().toTimeString());
    console.log('Getting binID:');
    console.log(this.props.binArray[0].id);

    let userID = null;
    let binID = this.props.binArray[0].id;
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

  reportMissingRecyclingBin() {
    console.log('In reportMissingRecyclingBin:');
    console.log(new Date().toTimeString());
    console.log('Getting binID:');
    console.log(this.props.binArray[1].id);

    let userID = null;
    let binID = this.props.binArray[1].id;
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
          console.log(keyValue); //TODO: display message to user
        }
      })
      .catch(err => reject(err));
  }

  render() {

      { if (this.state.bothTypes == false ) {

        return (
          <MapView.Marker
            coordinate={{
              latitude: this.props.binArray[0].latitude, longitude: this.props.binArray[0].longitude}}
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
                  onPress={ this.useBin.bind(this) }
                  disabled={ this.state.useBinButtondisabled }
                  accessibilityLabel='Use this bin'
                >
                  USE THIS BIN
                </Button>
              </CardSection>

              <CardSection>
                <Button
                  onPress={ this.reportBinFull.bind(this) }
                  disabled={ this.state.reportMissingBinButtonDisabled }
                  accessibilityLabel='Report full bin'
                >
                  REPORT FULL BIN
                </Button>
              </CardSection>

              <CardSection>
                <Button
                  onPress={ this.reportMissingBin.bind(this) }
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
              latitude: this.props.binArray[0].latitude, longitude: this.props.binArray[0].longitude}}
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
                  onPress={ this.useBin.bind(this) }
                  disabled={ this.state.useBinButtondisabled }
                  accessibilityLabel='Use this bin'
                >
                  USE THIS BIN
                </Button>
              </CardSection>

              <CardSection>
                <Button
                  onPress={ this.reportBinFull.bind(this) }
                  disabled={ this.state.reportFullBinButtonDisabled }
                  accessibilityLabel='Report full bin'
                >
                  REPORT FULL BIN
                </Button>
              </CardSection>

              <CardSection>
                <Button
                  onPress={ this.reportMissingBin.bind(this) }
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
                  onPress={ this.useRecycleBin.bind(this) }
                  disabled={ this.state.useBinButtondisabled }
                  accessibilityLabel='Use this bin'
                >
                  USE THIS BIN
                </Button>
              </CardSection>

              <CardSection>
                <Button
                  onPress={ this.reportRecyclingBinFull.bind(this) }
                  disabled={ this.state.reportFullBinButtonDisabled }
                  accessibilityLabel='Report full bin'
                >
                  REPORT FULL BIN
                </Button>
              </CardSection>

              <CardSection>
                <Button
                  onPress={ this.reportMissingRecyclingBin.bind(this) }
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
