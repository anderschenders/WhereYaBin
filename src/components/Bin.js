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
      // Default values for ButtonStateHolders
      useButtonStateHolder: false,
      removeButtonStateHolder: false,
      useCount: 0,
      users: [],
    };
  }

  checkBinType() {
    console.log('@@@@@@@@ in checkBinType @@@@@@@@@');
    // console.log(this.props.bin.bin_type);
    if (this.props.bin.bin_type.includes('N SIDE')) {
      return '#000000';
    } else {
      return 'blue';
    }
  }


  disableButton() {
    console.log('@@@@@@@@ in disableButton @@@@@@@@@');
    this.setState({
      // once user clicks button, disable it
      useButtonStateHolder: true,
    })
   }

  useBin() {
    console.log('@@@@@@@@ In useBin function @@@@@@@@@');
    console.log('Getting binID:');
    console.log(this.props.bin.id);

    console.log('Getting USER_KEY: ');

    let userID = null;
    let binID = this.props.bin.id;

    AsyncStorage.getItem("USER_KEY")
      .then(keyValue => {
        if ( Boolean(keyValue) ) {
          console.log('There is a valid res/USER_KEY: ');
          console.log(keyValue);
          userID = keyValue
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
          console.log(keyValue);
          // resolve(false);
        }
      })
      .catch(err => reject(err));

      // this.setState ={
      //   useCount += 1,
      //   users << userID,
      // }
  }


  render() {

    return (
      <MapView.Marker
        coordinate={{
          latitude: this.props.bin.latitude, longitude: this.props.bin.longitude}}
        pinColor={this.checkBinType()}
      >

        <MapView.Callout>
          <Card>
            <CardSection>
              <View style={styles.thumbnailContainerStyle}>
                <Image
                  style={styles.imageStyle}
                  source={require('../images/med_black_dot.png')}
                  />
                <Text style={styles.textStyle}>
                  {'Garbage'}
                </Text>
              </View>
            </CardSection>

            <CardSection>
              <Button
                onPress={ this.useBin.bind(this) }
                disabled={this.state.useButtonStateHolder}
                accessibilityLabel='Use this bin'
              >
                Use this bin
              </Button>
            </CardSection>

            <CardSection>
              <Button
                onPress={() => console.log('Vote to remove bin')}
                disabled={this.state.removeButtonStateHolder}
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
