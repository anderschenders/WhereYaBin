import React, { Component } from 'react';
import { AppRegistry, StyleSheet, View, Text, Image, AsyncStorage } from 'react-native';
import MapView from 'react-native-maps';

import Card from './Card';
import CardSection from './CardSection';
import Button from './Button';

class Bin extends Component {
  constructor(){
    super();
    this.state = {
      //TODO: Below not working
      // Default values for disabled button property
      useBinButtondisabled: false,
      removeBinButtonDisabled: false,
      pinColor: null,
      binText: null,
      image: null,
    };
    // console.log('@@@@@@@@@ In Bin.js, constructor, this.props @@@@@@@@@ ');
    // console.log(this.props);
  }

  componentDidMount() {
    // this.setState({
    //   pinColor: this.checkBinTypeForPinColor(),
    //   binText: this.checkBinTypeForText(),
    // })
    this.checkBinType();
  }

  componentWillUnmount() {

  }

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
    } else { //'RYPUBL'
    this.setState({
      pinColor: 'blue',
      binText: 'Recycling',
      image: recyclingIcon,
    })
    }
  }

  // checkBinTypeForPinColor() {
  //   console.log('@@@@@@@@ In Bin.js, checkBinTypeForPinColor() @@@@@@@@@');
  //   if (this.props.bin.bin_type === 'GPUBL') {
  //     return '#000000';
  //   } else { //'RYPUBL'
  //     return 'blue';
  //   }
  // }
  //
  // checkBinTypeForText() {
  //   console.log('@@@@@@@@ In Bin.js, checkBinTypeForText() @@@@@@@@@');
  //   if (this.props.bin.bin_type === 'GPUBL') {
  //     return 'Garbage';
  //   } else {
  //     return 'Recycling';
  //   }
  // }

  // disableButton() {
  //   console.log('@@@@@@@@ in disableButton @@@@@@@@@');
  //   this.setState({
  //     // once user clicks button, disable it
  //     useBinButtondisabled: true,
  //   })
  //   console.log('New state:');
  //   console.log(this.state);
  //  }

  useBin() {
    console.log('@@@@@@@@ In useBin function @@@@@@@@@');
    console.log('Getting binID:');
    console.log(this.props.bin.id);

    let userID = null;
    let binID = this.props.bin.id;

    console.log('Getting USER_KEY: ');
    AsyncStorage.getItem("USER_KEY")
      .then(keyValue => {
        if ( Boolean(keyValue) ) {
          console.log('There is a valid res/USER_KEY: ');
          console.log(keyValue);
          console.log('keyValue.id');
          console.log(JSON.parse(keyValue).id);

          userID = JSON.parse(keyValue).id;
          // resolve(true);

          console.log('Making POST request to API');
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
          );
          this.disableButton();

        } else {
          console.log('There is not a valid res/USER_KEY: ');
          console.log(keyValue); //QUESTION: What else can I do here?
          // resolve(false);
        }
      })
      .catch(err => reject(err));

      //Thank you modal!
    }

  render() {

    return (
      <MapView.Marker
        coordinate={{
          latitude: this.props.bin.latitude, longitude: this.props.bin.longitude}}
        pinColor={this.state.pinColor}
      >

        <MapView.Callout>
          <Card>
            <CardSection>
              <View style={ styles.thumbnailContainerStyle }>
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
                Use this bin
              </Button>
            </CardSection>

            <CardSection>
              <Button
                onPress={ () => console.log('Vote to remove bin') }
                disabled={ this.state.removeBinButtonDisabled }
                accessibilityLabel='Vote to remove bin'
              >
                Vote to remove this bin
              </Button>
            </CardSection>
          </Card>
        </MapView.Callout>

      </MapView.Marker>
    )
  }
}

const styles = {
  // headerContentStyle: {
  //   flexDirection: 'column',
  //   justifyContent: 'space-around'
  // },
  // headerTextStyle: {
  //   fontSize: 18
  // },
  // thumbnailStyle: {
  //   height: 50,
  //   width: 50
  // },
  thumbnailContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginLeft: 2,
    marginRight: 2,
    marginTop: 2,
  },
  imageStyle: {
    marginTop: 2,
    marginRight: 2,
    height: 8,
    width: 8,
    // flex: 1, //get image to stretch entire screen
    // width: null //get image to stretch entire screen
  },
  textStyle: {
    fontSize: 10,
  },

};

export default Bin;
