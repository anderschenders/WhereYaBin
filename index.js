import React, { Component } from 'react';
import { AppRegistry, Text } from 'react-native';
import { MainNavigator, SignedIn } from './router';
import { isSignedIn, onSignOut } from "./auth";

class WhereYaBin extends Component {
  constructor(props) {
    super(props);
    onSignOut();
    this.state = {
      signedIn: false,
      userData: null,
    };
  }

  componentWillMount() {
    isSignedIn() //check if user is signed in
      .then(res => this.setState({ signedIn: res }))
      .catch(err => alert("An error occurred"));
  }

  // forceIndexComponentRender() {
  //   this.forceUpdate();
  // }

  setUserData(userData) {
    console.log("In Index.js, resetting user data:");
    this.setState({ userData: userData});
  }

  setSignInState(signedIn) {
    this.setState({ signedIn: signedIn });
  }

  render() {
    console.log('@@@@@@ In index.js, render @@@@@@');
    console.log(this.state.userData);

    const { signedIn } = this.state;

    const screenProps = {
      setSignInState: this.setSignInState.bind(this),
      setUserData: this.setUserData.bind(this),
      // forceIndexComponentRender: this.forceIndexComponentRender.bind(this),
      userData: this.state.userData,
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
