import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { MainNavigator } from './router';
// import App from './App';

const WhereYaBin = () => {
  return (<MainNavigator />);
};

AppRegistry.registerComponent('WhereYaBin', () => WhereYaBin);

// return (<App />);
