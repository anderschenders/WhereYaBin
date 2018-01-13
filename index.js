import React, { Component } from 'react';
import { AppRegistry, Text, AsyncStorage } from 'react-native';
import { MainNavigator, SignedIn } from './router';
import { isSignedIn, onSignOut } from "./auth";

class WhereYaBin extends Component {
  constructor(props) {
    super(props);
    onSignOut();
    this.state = {
      signedIn: false,
      userData: null,
      welcomeModalVisible: false,
      communityData: null,
    };
  }

  componentWillMount() {
    this.getCommunityData();

    isSignedIn() //check if user is signed in
      .then(res => {
        return AsyncStorage.getItem("USER_KEY").then(keyValue => this.setState({
          userData: JSON.parse(keyValue),
          signedIn: res }))
      })
      .catch(err => console.log(err));
  }

  // TODO: use AsyncStorage to update userData instead of having other components set it and pass it back up to Index
  //updateUserData()

  updateAsyncStorage(newUserData) {
    console.log('In updateAsyncStorage()');

    AsyncStorage.removeItem('USER_KEY')
    .then(res => {
      console.log('AsyncStorage removeItem resolved')
      console.log('AsyncStorage setItem: ');

      // set USER_KEY with updated user data
      AsyncStorage.setItem("USER_KEY", JSON.stringify(newUserData))
      .then(res => {
        console.log("Successfully set new user data ");
        this.setState({ userData: newUserData});
        this.getCommunityData();
      })
      .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
  }

  // setUserData(userData) {
  //   console.log("In Index.js, setting/resetting user data:");
  //   this.setState({ userData: userData});
  //   this.getCommunityData();
  // }

  setSignInState(signedIn) {
    console.log('In setSignInState()');
    console.log(new Date().toTimeString());


    this.getCommunityData();
    this.setState({
      signedIn: signedIn,
    })
  }

  getCommunityData() {
    console.log('In getCommunityData(), fetching community data');
    console.log(new Date().toTimeString());

    const communityDataURL = 'https://whereyabin.herokuapp.com/user_bins/community_data';

    fetch(communityDataURL, {
      method: 'GET',
    })
    .then((response) => {
      console.log('API response');
      console.log(new Date().toTimeString());
      console.log(response);

      if (response.status === 200) {
        console.log('API status 200');

        communityDataParsedResponse = JSON.parse(response._bodyText);

        console.log('communityDataParsedResponse:');
        console.log(communityDataParsedResponse);

        this.setState({
          communityData: communityDataParsedResponse,
        })
      }
    })
    .catch(err => console.log(err))
  }

  setWelcomeModal(visible) {
    console.log("In Index.js, settingWelcomeModal");

    this.getCommunityData();
    this.setState({
      welcomeModalVisible: visible,
    })
  }

  render() {
    console.log('@@@@@@ In index.js, render @@@@@@');
    console.log(this.state.userData);
    console.log(this.state.communityData);
    console.log(new Date().toTimeString());

    const { signedIn } = this.state;

    const screenProps = {
      setSignInState: this.setSignInState.bind(this),
      setUserData: this.setUserData.bind(this),
      updateAsyncStorage: this.updateAsyncStorage.bind(this),
      userData: this.state.userData,
      setWelcomeModal: this.setWelcomeModal.bind(this),
      welcomeModalVisible: this.state.welcomeModalVisible,
      communityData: this.state.communityData,
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
