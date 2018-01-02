import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { MainNavigator, SignedIn } from './router';

import { isSignedIn, onSignOut } from "./auth";

class WhereYaBin extends Component {
  constructor(props) {
    super(props);
    onSignOut();
    this.state = {
      signedIn: false,
      checkedSignIn: false
    };
  }

  componentWillMount() {
    isSignedIn()
      .then(res => this.setState({ signedIn: res, checkedSignIn: true }))
      .catch(err => alert("An error occurred"));
  }

  // componentWillUpdate(nextProps, nextState) {
  //   isSignedIn()
  //     .then(res => {
  //      nextState = {
  //        signedIn: true,
  //        checkedSignIn: true,
  //     };})
  //     .catch(err => alert("An error occurred"));
  // }

  setSignInState(signedIn) {
    this.setState({ signedIn: signedIn, checkedSignIn: true});
  }

  render() {
    const { checkedSignIn, signedIn } = this.state;

    // If we haven't checked AsyncStorage yet, don't render anything (better ways to do this)
    if (!checkedSignIn) {
      return null;
    }

    if (signedIn) {
      console.log('@@@@ signedIn @@@@@');
      console.log(signedIn);
      return <SignedIn />;
    } else {
        console.log('@@@@ NOT signedIn @@@@@');

        const screenProps = {
          setSignInState: this.setSignInState.bind(this),
        };

      return <MainNavigator screenProps={ screenProps } />;
    }
  }
}

AppRegistry.registerComponent('WhereYaBin', () => WhereYaBin);
