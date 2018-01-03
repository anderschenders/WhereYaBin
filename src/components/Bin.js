import React, { Component } from 'react';
import { AppRegistry, StyleSheet, View, Text, Image } from 'react-native';
import MapView from 'react-native-maps';
import Card from './Card';
import CardSection from './CardSection';
import Button from './Button';

class Bin extends Component {
  constructor(){
    super();
    this.state = {
      // Default Value for ButtonStateHolder State. Now the button is Enabled.
      useButtonStateHolder: false,
      removeButtonStateHolder: false,
    };
  }

  //TODO: below doesn't work
  //pinColor= { this.checkBinType }
  checkBinType() {
    console.log('@@@@@@@@ in checkBinType @@@@@@@@@');
    // console.log(this.props.bin.bin_type);
    if (this.props.bin.bin_type.includes('N SIDE')) {
      return '#000000';
    } else {
      return 'blue';
    }
  }

  checkBinTypeTest() {
    return 'blue'
  }

  disableButton() {
    console.log('@@@@@@@@ in disableButton @@@@@@@@@');
    this.setState({
      // On State True it will Disable the button.
      useButtonStateHolder: true,
    })
   }

  useBin() {
    console.log('In useBin:');
    console.log('Making POST request to API');
    fetch(
      'http://localhost:3000/bins', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: 'some user_id'
        })
      }
    );
    this.disableButton();
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
