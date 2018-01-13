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
    console.log('In WhereYaBin constructor, communityData');
    console.log(this.state.communityData);
  }

  componentWillMount() {
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

  setUserData(userData) {
    console.log("In Index.js, setting/resetting user data:");
    this.setState({ userData: userData});
  }

  setSignInState(signedIn) {
    console.log('In setSignInState()');

    // this.getCommunityData()
    // .then((communityDataParsedResponse) => console.log(communityDataParsedResponse))
    //
    // this.setState({
    //   signedIn: signedIn,
    //   communityData: communityData,
    // });
    this.getCommunityData();
    this.setState({
      signedIn: signedIn,
    })
    //
    // const communityDataURL = 'http://localhost:3000/user_bins/community_data'
    //
    //   fetch(communityDataURL, {
    //     method: 'GET',
    //   })
    //   .then((response) => {
    //     console.log('API response');
    //     console.log(new Date().toTimeString());
    //     console.log(response);
    //
    //     if (response.status === 200) {
    //       console.log('API status 200');
    //
    //       communityDataParsedResponse = JSON.parse(response._bodyText);
    //
    //       console.log('communityDataParsedResponse:');
    //       console.log(communityDataParsedResponse);
    //
    //       this.setState({
    //         signedIn: signedIn,
    //         communityData: communityDataParsedResponse,
    //       })
    //     }
    //   })
    //   .catch(err => console.log(err))
  }

  getCommunityData() {
    console.log('In getCommunityData(), fetching community data');

    const communityDataURL = 'http://localhost:3000/user_bins/community_data'

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

    // this.getCommunityData()
    // .then(communityDataParsedResponse => {
    //   console.log('communityDataParsedResponse');
    //   console.log(communityDataParsedResponse);
    // })

    this.getCommunityData();
    this.setState({
      welcomeModalVisible: visible,
    })

    // const communityDataURL = 'http://localhost:3000/user_bins/community_data'
    //
    //   fetch(communityDataURL, {
    //     method: 'GET',
    //   })
    //   .then((response) => {
    //     console.log('API response');
    //     console.log(new Date().toTimeString());
    //     console.log(response);
    //
    //     if (response.status === 200) {
    //       console.log('API status 200');
    //
    //       communityDataParsedResponse = JSON.parse(response._bodyText);
    //
    //       console.log('communityDataParsedResponse:');
    //       console.log(communityDataParsedResponse);
    //
    //       this.setState({
    //         welcomeModalVisible: visible,
    //         communityData: communityDataParsedResponse,
    //       })
    //     }
    //   })
    //   .catch(err => console.log(err))

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
