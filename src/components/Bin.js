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
      //TODO: Below not working
      // Default values for disabled button property
      useBinButtondisabled: false,
      reportFullBinButtonDisabled: false,
      pinColor: null,
      binText: null,
      binText2: null,
      // image: null,
      // image2: null,
      bothTypes: null,
      useBinSuccessMessage: null,
      modalVisible: false,
      // userData: this.props.userData,
    };
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
    console.log('@@@@@@@ In Bin.js, checkBinType() @@@@@@@');
    // const recyclingIcon = require('../images/med_blue_dot.png');
    // const garbageIcon = require('../images/med_black_dot.png');

    if (this.props.binArray.length == 1) { //unique location
      if (this.props.binArray[0].bin_type === 'GPUBL') {
        this.setState({
          pinColor: 'black',
          binText: 'GARBAGE',
          // image: garbageIcon,
          bothTypes: false,
        })
      } else if (this.props.binArray[0].bin_type === 'RYPUBL') {
        this.setState({
          pinColor: 'blue',
          binText: 'RECYCLING',
          // image: recyclingIcon,
          bothTypes: false,
        })
      }
    } else { //not unique location
      this.setState({
        pinColor: 'purple',
        binText: 'GARBAGE',
        binText2: 'RECYCLING',
        // image: garbageIcon,
        // image2: recyclingIcon,
        bothTypes: true,
      })
    }
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
          console.log(JSON.parse(keyValue).id);

          userID = JSON.parse(keyValue).id;

          console.log('Making POST request to API to create user_bin');
          fetch(
            'http://localhost:3000/user_bins', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                user_id: userID,
                bin_id: binID,
                userAction: 'use',
              })
            }
          )
          .then((response) => {
            if (response.status === 200) {
              console.log('API status 200');

              const parsedResponse = JSON.parse(response._bodyText);

              console.log('parsedResponse:');
              console.log(parsedResponse);

              newUserData = parsedResponse.updated_user;

              const message = 'BINNED!'
              this.props.setModalVisible(message);

              this.props.setBinLocation('47.6240076601029,-122.31271869761');

              // remove USER_KEY from AsyncStorage
              AsyncStorage.removeItem('USER_KEY')
              .then(res => {
                console.log('AsyncStorage removeItem resolved')
                console.log('AsyncStorage setItem: ');

                // set USER_KEY with updated user data
                AsyncStorage.setItem("USER_KEY", JSON.stringify(newUserData))
                .then(res => {
                  console.log("Successfully set new user data, res: ");
                  console.log(res); //returns null
                  // resolve(true);
                  this.props.screenProps.setUserData(newUserData);

                  // this.props.screenProps.forceIndexComponentRender();
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

          //BUG: disableButton not working
          // this.disableButton();

        } else {
          console.log('There is not a valid res/USER_KEY: ');
          console.log(keyValue); //TODO: display message to user
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
          console.log(JSON.parse(keyValue).id);

          userID = JSON.parse(keyValue).id;

          console.log('Making POST request to API to create user_bin recycling');
          fetch(
            'http://localhost:3000/user_bins', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                user_id: userID,
                bin_id: binID,
                userAction: 'use',
              })
            }
          )
          .then((response) => {
            if (response.status === 200) {
              console.log('API status 200');

              const parsedResponse = JSON.parse(response._bodyText);

              console.log('parsedResponse:');
              console.log(parsedResponse);

              newUserData = parsedResponse.updated_user;

              const message = 'BINNED!'
              this.props.setModalVisible(message);

              // remove USER_KEY from AsyncStorage
              AsyncStorage.removeItem('USER_KEY')
              .then(res => {
                console.log('AsyncStorage removeItem resolved')
                console.log('AsyncStorage setItem: ');

                // set USER_KEY with updated user data
                AsyncStorage.setItem("USER_KEY", JSON.stringify(newUserData))
                .then(res => {
                  console.log("Successfully set new user data, res: ");
                  console.log(res); //returns null
                  // resolve(true);
                  this.props.screenProps.setUserData(newUserData);
                  // this.props.screenProps.forceIndexComponentRender();
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

          //BUG: disableButton not working
          // this.disableButton();

        } else {
          console.log('There is not a valid res/USER_KEY: ');
          console.log(keyValue); //TODO: display message to user
        }
      })
      .catch(err => reject(err));
  }

  reportBinFull() {
    console.log('In reportBillFull:');

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
          console.log(JSON.parse(keyValue).id);

          userID = JSON.parse(keyValue).id;

          console.log('Making POST request to API to create user_bin');
          fetch(
            'http://localhost:3000/user_bins', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                user_id: userID,
                bin_id: binID,
                userAction: 'full',
              })
            }
          )
          .then((response) => {
            if (response.status === 200) {
              console.log('API status 200');

              const parsedResponse = JSON.parse(response._bodyText);

              console.log('parsedResponse:');
              console.log(parsedResponse);

              newUserData = parsedResponse.updated_user;

              const message = 'REPORTED!'
              this.props.setModalVisible(message);

              // remove USER_KEY from AsyncStorage
              AsyncStorage.removeItem('USER_KEY')
              .then(res => {
                console.log('AsyncStorage removeItem resolved')
                console.log('AsyncStorage setItem: ');

                // set USER_KEY with updated user data
                AsyncStorage.setItem("USER_KEY", JSON.stringify(newUserData))
                .then(res => {
                  console.log("Successfully set new user data, res: ");
                  console.log(res); //returns null
                  // resolve(true);
                  this.props.screenProps.setUserData(newUserData);
                  // this.props.screenProps.forceIndexComponentRender();
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

          //BUG: disableButton not working
          // this.disableButton();

        } else {
          console.log('There is not a valid res/USER_KEY: ');
          console.log(keyValue); //TODO: display message to user
        }
      })
      .catch(err => reject(err));
  }


  reportRecyclingBinFull() {
    console.log('In reportRecyclingBinFull:');

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
          console.log(JSON.parse(keyValue).id);

          userID = JSON.parse(keyValue).id;

          console.log('Making POST request to API to create user_bin');
          fetch(
            'http://localhost:3000/user_bins', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                user_id: userID,
                bin_id: binID,
                userAction: 'full',
              })
            }
          )
          .then((response) => {
            if (response.status === 200) {
              console.log('API status 200');

              const parsedResponse = JSON.parse(response._bodyText);

              console.log('parsedResponse:');
              console.log(parsedResponse);

              newUserData = parsedResponse.updated_user;

              const message = 'REPORTED!'
              this.props.setModalVisible(message);

              // remove USER_KEY from AsyncStorage
              AsyncStorage.removeItem('USER_KEY')
              .then(res => {
                console.log('AsyncStorage removeItem resolved')
                console.log('AsyncStorage setItem: ');

                // set USER_KEY with updated user data
                AsyncStorage.setItem("USER_KEY", JSON.stringify(newUserData))
                .then(res => {
                  console.log("Successfully set new user data, res: ");
                  console.log(res); //returns null
                  // resolve(true);
                  this.props.screenProps.setUserData(newUserData);
                  // this.props.screenProps.forceIndexComponentRender();
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

          //BUG: disableButton not working
          // this.disableButton();

        } else {
          console.log('There is not a valid res/USER_KEY: ');
          console.log(keyValue); //TODO: display message to user
        }
      })
      .catch(err => reject(err));
  }

  reportMissingBin() {
    console.log('In reportMissingBin:');

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
          console.log(JSON.parse(keyValue).id);

          userID = JSON.parse(keyValue).id;

          console.log('Making POST request to API to create user_bin');
          fetch(
            'http://localhost:3000/user_bins', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                user_id: userID,
                bin_id: binID,
                userAction: 'missing',
              })
            }
          )
          .then((response) => {
            if (response.status === 200) {
              console.log('API status 200');

              const parsedResponse = JSON.parse(response._bodyText);

              console.log('parsedResponse:');
              console.log(parsedResponse);

              newUserData = parsedResponse.updated_user;

              const message = 'REPORTED!'
              this.props.setModalVisible(message);

              // remove USER_KEY from AsyncStorage
              AsyncStorage.removeItem('USER_KEY')
              .then(res => {
                console.log('AsyncStorage removeItem resolved')
                console.log('AsyncStorage setItem: ');

                // set USER_KEY with updated user data
                AsyncStorage.setItem("USER_KEY", JSON.stringify(newUserData))
                .then(res => {
                  console.log("Successfully set new user data, res: ");
                  console.log(res); //returns null
                  // resolve(true);
                  this.props.screenProps.setUserData(newUserData);
                  // this.props.screenProps.forceIndexComponentRender();
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

          //BUG: disableButton not working
          // this.disableButton();

        } else {
          console.log('There is not a valid res/USER_KEY: ');
          console.log(keyValue); //TODO: display message to user
        }
      })
      .catch(err => reject(err));
  }

  reportMissingRecyclingBin() {
    console.log('In reportMissingRecyclingBin:');

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
          console.log(JSON.parse(keyValue).id);

          userID = JSON.parse(keyValue).id;

          console.log('Making POST request to API to create user_bin');
          fetch(
            'http://localhost:3000/user_bins', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                user_id: userID,
                bin_id: binID,
                userAction: 'missing',
              })
            }
          )
          .then((response) => {
            if (response.status === 200) {
              console.log('API status 200');

              const parsedResponse = JSON.parse(response._bodyText);

              console.log('parsedResponse:');
              console.log(parsedResponse);

              newUserData = parsedResponse.updated_user;

              const message = 'REPORTED!'
              this.props.setModalVisible(message);

              // remove USER_KEY from AsyncStorage
              AsyncStorage.removeItem('USER_KEY')
              .then(res => {
                console.log('AsyncStorage removeItem resolved')
                console.log('AsyncStorage setItem: ');

                // set USER_KEY with updated user data
                AsyncStorage.setItem("USER_KEY", JSON.stringify(newUserData))
                .then(res => {
                  console.log("Successfully set new user data, res: ");
                  console.log(res); //returns null
                  // resolve(true);
                  this.props.screenProps.setUserData(newUserData);
                  // this.props.screenProps.forceIndexComponentRender();
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

          //BUG: disableButton not working
          // this.disableButton();

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
