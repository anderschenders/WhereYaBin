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
    };
  }

  componentWillMount() {
    isSignedIn() //check if user is signed in
      .then(res => this.setState({ signedIn: res }))
      .catch(err => alert("An error occurred"));
  }

  setSignInState(signedIn) {
    this.setState({ signedIn: signedIn });
  }

  render() {
    console.log('@@@@@@ In index.js, render @@@@@@');
    const { signedIn } = this.state;

    if (signedIn) {
      console.log('User is signedIn');
      console.log(signedIn);
      return <SignedIn />;
    } else {
        console.log('User is NOT signedIn');

        const screenProps = {
          setSignInState: this.setSignInState.bind(this),
        };

      return <MainNavigator screenProps={ screenProps } />;
    }
  }
}

AppRegistry.registerComponent('WhereYaBin', () => WhereYaBin);
