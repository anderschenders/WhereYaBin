import React, { Component } from 'react';
import { AppRegistry, StyleSheet, View, Text, Image } from 'react-native';
import MapView from 'react-native-maps';
import Card from './Card';
import CardSection from './CardSection';

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
                <Text>
                  {'Garbage'}
                </Text>
              </View>
            </CardSection>

            <CardSection>

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
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginLeft: 3,
    marginRight: 3,
  },
  imageStyle: {
    height: 10,
    width: 10,
    // flex: 1, //get image to stretch entire screen
    // width: null //get image to stretch entire screen
  }
};

export default Bin;
