import React, { Component } from 'react';
import { AppRegistry, StyleSheet, View, Text, Image, AsyncStorage } from 'react-native';
import MapView from 'react-native-maps';
// import { Card, Button } from 'react-native-elements';
// import { Button } from 'react-native-elements'

import CallOutCard from './CallOutCard';
import CardSection from './CardSection';
import Button from './Button';

class Bin extends Component {
  constructor(){
    super();
    this.state = {
      //TODO: Below not working
      // Default values for disabled button property
      useBinButtondisabled: false,
      reportFullBinButtonDisabled: false,
      pinColor: null,
      binText: null,
      image: null,
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
    const recyclingIcon = require('../images/med_blue_dot.png');
    const garbageIcon = require('../images/med_black_dot.png');

    if (this.props.bin.bin_type === 'GPUBL') {
      this.setState({
        pinColor: 'black',
        binText: 'Garbage',
        image: garbageIcon,
      })
    } else if (this.props.bin.bin_type === 'RYPUBL') {
      this.setState({
        pinColor: 'blue',
        binText: 'Recycling',
        image: recyclingIcon,
      })
    }
  }

  useBin() {
    console.log('@@@@@@@@ In useBin function @@@@@@@@@');
    console.log('Getting binID:');
    console.log(this.props.bin.id);

    let userID = null;
    let binID = this.props.bin.id;
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

    return (
      <MapView.Marker
        coordinate={{
          latitude: this.props.bin.latitude, longitude: this.props.bin.longitude}}
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
              onPress={ () => console.log('Report full bin') }
              disabled={ this.state.reportFullBinButtonDisabled }
              accessibilityLabel='Report full bin'
            >
              REPORT FULL BIN
            </Button>
          </CardSection>
        </CallOutCard>
        </MapView.Callout>

      </MapView.Marker>
    )
  }
}

const styles = {
  binTypeContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginLeft: 5,
    marginRight: 2,
    marginTop: 2,
  },
  imageStyle: {
    marginTop: 2,
    marginRight: 2,
    height: 12,
    width: 12,
  },
  textStyle: {
    fontSize: 14,
  },
  addMargin: {
    marginTop: 10,
  }

};

export default Bin;
