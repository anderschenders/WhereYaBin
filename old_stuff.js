// IDEAS for organizing user_bins
{
garbage: [{full: false}],
recycling: {full: true}
}

[
{full: false},
{full: true}
]

// let useGarbageBin = () => { this.useBin('garbage'); }
// let useRecyclingBin = () => { this.useBin('recycling'); }

//Bin render

render() {

  // let successMessage = null;
  // let modal = null;
  //
  // if (this.state.useBinSuccessMessage) {
  //   let successMessage =
  //     <View
  //       style={{marginLeft: 1, marginRight: 1, marginTop: 1}}
  //     >
  //       <Text style={styles.textStyle}>
  //         { this.state.useBinSuccessMessage }
  //       </Text>
  //     </View>
  //
  //   let modal =
  //     <View style={{height: 500, width: 300}}>
  //       <Modal
  //         animationType={ 'slide' }
  //         transparent={ false }
  //         visible={ this.state.modalVisible }
  //       >
  //         <Text>
  //           {'HI'}
  //         </Text>
  //       </Modal>
  //     </View>
  // }

  //
  // <View style={{height: 500, width: 300}}>
  //   <Modal
  //     animationType={ 'slide' }
  //     transparent={ false }
  //     visible={ this.state.modalVisible }
  //   >
  //     <Text>
  //       { successMessage }
  //     </Text>
  //   </Modal>
  // </View>

    { if (this.state.bothTypes == false ) {

      return (
        <MapView.Marker
          coordinate={{
            latitude: this.props.binArray[0].latitude, longitude: this.props.binArray[0].longitude}}
          pinColor={this.state.pinColor}
        >
          // { modal }

          <MapView.Callout>

          // { successMessage }

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

        // { modal }

        <MapView.Callout>

          // { successMessage }

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
                disabled={ this.state.reportFullBinButtonDisabled }
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


//UserBinnedHistory

<View
  key={ userBin.id }
  style={ styles.viewSectionStyle }
>
  <Image
    style={ styles.imageStyle }
    source={ require('../images/earth_icon2.png') }
  />
  <Text style={ styles.viewSectionTextStyle }>
    {'BINNED on'} { userBin.created_at.substring(0,10) }
  </Text>
</View>
)
}

//CallOut
//THEIR CARD THEIR BUTTON

        <Card
          title={ this.state.binText }
        >
        <Button
          raised
          title='USE THIS BIN'
          backgroundColor='#397af8'
          onPress={ this.useBin.bind(this) }
          buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
          disabled={ this.state.useBinButtondisabled }
          accessibilityLabel='Use this bin'
        >
        </Button>

        <View style={styles.addMargin}></View>

        <Button
          raised
          title='REPORT AS FULL'
          backgroundColor='#397af8'
          onPress={ () => console.log('Report full bin') }
          disabled={ this.state.reportFullBinButtonDisabled }
          accessibilityLabel='Report full bin'
        >
        </Button>
        </Card>


//MY CARD THEIR BUTTON


<Card>

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

    <Button
      raised
      Component=TouchableOpacity
      title='USE THIS BIN'
      backgroundColor='#397af8'
      onPress={ this.useBin.bind(this) }
      disabled={ this.state.useBinButtondisabled }
      accessibilityLabel='Use this bin'
    >
    </Button>

    <View style=(styles.addMargin)></View>

    <Button
      raised
      title='REPORT AS FULL'
      backgroundColor='#397af8'
      onPress={ () => console.log('Report full bin') }
      disabled={ this.state.reportFullBinButtonDisabled }
      accessibilityLabel='Report full bin'
    >
    </Button>
</Card>


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
