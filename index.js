import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { MainNavigator, SignedIn } from './router';
// import App from './App';

const WhereYaBin = () => {
  return (<SignedIn />);
};

AppRegistry.registerComponent('WhereYaBin', () => WhereYaBin);

// return (<App />);
