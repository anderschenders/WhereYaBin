import React, { Component } from 'react';
import { AppRegistry, StyleSheet, View, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import BinMap from './src/components/BinMap';


let { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
// const LATITUDE = 0;
// const LONGITUDE = 0;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const RAILSAPI = 'http://localhost:3000/bins';

export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      mapRegion: null,
      error: null,
      bins: [],
    }

    this.watchID = null;
  }

  componentDidMount() {
    this.watchID = navigator.geolocation.watchPosition(
      position => {
        let region = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
          error: null,
        }

        this.onRegionChange(region);
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 0, distanceFilter: 1 }
    );
  }

  onRegionChange(region) {
    this.fetchBins(region);

    this.setState({
      mapRegion: region,
      error: null,
    });
  }

  fetchBins(region) {
    fetch(RAILSAPI)
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
      return responseJson;
    })
    .catch((error) => {
      console.error(error);
    });
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  render() {
    return (
      <View>
        <BinMap
          mapRegion={this.state.mapRegion} onRegionChange={this.onRegionChange.bind(this)}
            />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  }
});

AppRegistry.registerComponent('App', () => WhereYaBin);
