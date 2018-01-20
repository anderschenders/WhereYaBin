import React, { Component } from 'react';
import { AppRegistry, Text, AsyncStorage } from 'react-native';
import { MainNavigator, SignedIn } from './router';
import { isSignedIn, onSignOut } from "./auth";
import { AWS_URL } from './config';

// const binDataURL = 'https://whereyabin.herokuapp.com/bins';
// const binDataURL = `${AWS_URL}/bins`;

// const communityDataURL = 'https://whereyabin.herokuapp.com/user_bins/community_data';
const communityDataURL = `${AWS_URL}/user_bins/community_data`;

console.disableYellowBox = true;

class WhereYaBin extends Component {
  constructor(props) {
    super(props);
    onSignOut();
    this.state = {
      signedIn: false,
      userData: null,
      welcomeModalVisible: false,
      communityData: null,
      binsData: null,
    };
  }

  componentWillMount() {
    isSignedIn() //check if user is signed in
      .then(res => {
        return AsyncStorage.getItem("USER_KEY").then(keyValue =>
            this.setState({
              userData: JSON.parse(keyValue),
              signedIn: res,
            })
          )
        })
      .catch(err => console.log(err));
  }

  getBins(region) {
    console.log('@@@@@@@@ In Index.js, getBins(region) @@@@@@@@@');
    console.log('BEFORE FETCH', new Date().toTimeString(), region);

    //TODO: fetch only bins in certain vicinity, need user location

    const binDataURL = `${AWS_URL}/bins?user_lat=${encodeURIComponent(region.latitude)}&user_lng=${encodeURIComponent(region.longitude)}`;

    fetch(binDataURL, {
      method: 'GET',
    })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log('AFTER getBins() FETCH, responseJSON', new Date().toTimeString());

      console.log(responseJson);

      this.setState({
        binsData: responseJson,
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }
  //   fetch(binDataURL)
  //   .then((response) => response.json())
  //   .then((responseJson) => {
  //     console.log('AFTER getBins() FETCH, responseJSON', new Date().toTimeString());
  //
  //     console.log(responseJson);
  //
  //     this.setState({
  //       binsData: responseJson,
  //     });
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
  // }

  updateAsyncStorage(newUserData) {
    console.log('In updateAsyncStorage()');
    console.log('Getting community data, this.getCommunityData()');
    this.getCommunityData();

    // remove current USER_KEY
    AsyncStorage.removeItem('USER_KEY')
    .then(res => {
      console.log('AsyncStorage removeItem resolved')
      console.log('AsyncStorage setItem: ');

      // set USER_KEY with updated user data
      AsyncStorage.setItem("USER_KEY", JSON.stringify(newUserData))
      .then(res => {
        console.log("Successfully set new user data ");
        this.setState({ userData: newUserData});
      })
      .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
  }

  setSignInState(signedIn) {
    console.log('In setSignInState()');
    console.log(new Date().toTimeString());

    this.setState({
      signedIn: signedIn,
    })
  }

  getCommunityData() {
    console.log('In getCommunityData(), BEFORE FETCH for community data');
    console.log(new Date().toTimeString());

    fetch(communityDataURL, {
      method: 'GET',
    })
    .then((response) => {
      console.log('AFTER FETCH getCommunityData() API response', new Date().toTimeString());
      // console.log(new Date().toTimeString());

      if (response.status === 200) {
        console.log('getCommunityData() API status 200');
        console.log(new Date().toTimeString());

        communityDataParsedResponse = JSON.parse(response._bodyText);

        console.log('communityDataParsedResponse:');
        console.log(communityDataParsedResponse);

        this.setState({
          communityData: communityDataParsedResponse,
        })
      } else {
        console.log('getCommunityData() NOT status 200', new Date().toTimeString(), response.status);
      }
    })
    .catch(err => console.log(err))
  }

  setWelcomeModal(visible) {
    console.log("In Index.js, settingWelcomeModal");

    this.setState({
      welcomeModalVisible: visible,
    });
  }

  render() {
    console.log('@@@@@@ In index.js, render @@@@@@');
    console.log('userData:');
    console.log(this.state.userData);
    console.log('communityData');
    console.log(this.state.communityData);
    console.log(new Date().toTimeString());

    const { signedIn } = this.state;

    const screenProps = {
      setSignInState: this.setSignInState.bind(this),
      updateAsyncStorage: this.updateAsyncStorage.bind(this),
      userData: this.state.userData,
      setWelcomeModal: this.setWelcomeModal.bind(this),
      welcomeModalVisible: this.state.welcomeModalVisible,
      communityData: this.state.communityData,
      userBinData: this.state.userBinData,
      getBins: this.getBins.bind(this),
      binsData: this.state.binsData,
    };

    if (signedIn) {
      console.log('User is signedIn');
      console.log(signedIn);

      return <SignedIn screenProps={ screenProps } />;

    } else {
        console.log('User is NOT signedIn');


      return <MainNavigator screenProps={ screenProps } />;
    }
  }
}

AppRegistry.registerComponent('WhereYaBin', () => WhereYaBin);
