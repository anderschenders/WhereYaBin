import React, { Component } from 'react';
import { AppRegistry, StyleSheet, View, Text, Image } from 'react-native';
import MapView from 'react-native-maps';
import Card from './Card';
import CardSection from './CardSection';
import Button from './Button';

class Bin extends Component {

  //TODO: below doesn't work
  //pinColor= { this.checkBinType }
  checkBinType() {
    console.log('@@@@@@@@ in checkBinType @@@@@@@@@');
    console.log(this.props.bin.bin_type);
    if (this.props.bin.bin_type.includes('N SIDE')) {
      return '#000000';
    } else {
      return 'blue';
    }
  }

  checkBinTypeTest() {
    return 'blue'
  }

  render() {

    return (
      <MapView.Marker
        coordinate={{
          latitude: this.props.bin.latitude, longitude: this.props.bin.longitude}}
        pinColor= 'blue'
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
                onPress={() => console.log('Use this bin')}
                accessibilityLabel='Use this bin'
              >
                Use this bin
              </Button>
            </CardSection>

            <CardSection>
              <Button
                onPress={() => console.log('Vote to remove bin')}
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
  buttonStyle: {
    flex: 1, //button to expand as much content as it can
    alignSelf: 'stretch', //element position itself to fill the limits of the container
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#007aff',
    marginLeft: 5,
    marginRight: 5,
    fontSize: 8,
  }

};

export default Bin;
