import React, { Component } from 'react';
import { AppRegistry, Text, AsyncStorage } from 'react-native';
import { MainNavigator, SignedIn } from './router';
import { isSignedIn, onSignOut } from "./auth";

class WhereYaBin extends Component {
  constructor(props) {
    super(props);
    // SignOut();
    this.state = {
      signedIn: false,
      userData: null,
    };
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
  // TODO: use AsyncStorage to set userData

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
