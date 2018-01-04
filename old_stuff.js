//ProfileScreen getting user data via AsyncStorage?
    //QUESTION: Where to put this request to AsyncStorage?
  //
  //   let username = null;
  //   let createdAt = null;
  //   let binCount = null;
  //
  //   AsyncStorage.getItem("USER_KEY")
  //     .then(keyValue => {
  //       if ( Boolean(keyValue) ) {
  //         console.log('@@@@@@ In ProfileScreen, AsyncStorage call @@@@@@');
  //         console.log('There is a valid keyValue/USER_KEY: ');
  //         console.log(keyValue);
  //         console.log('keyValue.id');
  //         console.log(JSON.parse(keyValue).id);
  //
  //         console.log('keyValue.username');
  //         console.log(JSON.parse(keyValue).username);
  //
  //         username = JSON.parse(keyValue).username;
  //
  //         console.log('keyValue.created_at');
  //         console.log(JSON.parse(keyValue).created_at);
  //
  //         createdAt = JSON.parse(keyValue).created_at;
  //
  //         console.log('keyValue.bin_count');
  //         console.log(JSON.parse(keyValue).bin_count);
  //
  //         binCount = JSON.parse(keyValue).bin_count;
  //
  //         console.log('Initial this.state:');
  //         console.log(this.state);
  //
  //         this.setState({
  //           username: username,
  //           memberSince: createdAt,
  //           binCount: binCount,
  //         })
  //         console.log('New state:');
  //         console.log(this.state);
  //
  //       } else {
  //         console.log('There is not a valid res/USER_KEY: ');
  //         console.log(keyValue);
  //         // do something useful here -> "You don't seem to be signed in?"
  //       }
  //     })
  //     .catch(err => reject(err));
  // }


//
//   return new Promise((resolve, reject) => {
//     AsyncStorage.setItem("USER_KEY", JSON.stringify(userID), () => {
//       AsyncStorage.getItem('USER_KEY', (err, result) => {
//         console.log('$$$$$$$$$');
//         console.log(result);
//       });
//     })
//   })
//   .then(res => {
//     console.log("In onSignIn promise, res: ");
//     console.log(res);
//     resolve(true);
//   })
//   .catch(err => reject(err));
// }


import React, { Component } from 'react';
import { AppRegistry, StyleSheet, View, Dimensions } from 'react-native';
import MapView from 'react-native-maps';

// import App from './App';

let { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 0;
const LONGITUDE = 0;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class WhereYaBin extends Component {

  constructor(props) {
    super(props);

    this.state = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
        error: null,
      }
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
            error: null,
          }
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
      );

    this.watchID = navigator.geolocation.watchPosition(
      position => {
        this.setState({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
            error: null,
          }
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 10 },
    );
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  render() {
    return (
      <MapView
        style={ styles.container }
        showsUserLocation={ true }
        region={ this.state.region }
        onRegionChange={ region => this.setState({region}) }
        onRegionChangeComplete={ region => this.setState({region}) }
      >
        <MapView.Marker
          coordinate={ this.state.region }
        />
      </MapView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  }
});

AppRegistry.registerComponent('WhereYaBin', () => WhereYaBin);


////////////////
<MapView
  style ={ styles.container }
  initialRegion={{
    latitude: 47.6282408,
    longitude: -122.31348009999999,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }}
/>
);

////// in App.js, render
maxZoomLevel={10}
 onMapReady={() => {
this.setState({ regionSet: true });
