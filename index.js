import React from 'react';
import { View, AppRegistry } from 'react-native';
import BinMap from './App';

const App = () => {
  return (
    <View>
      <BinMap />
    </View>
  );
};

AppRegistry.registerComponent('WhereYaBin', () => App);
