import React, { Component } from 'react';
import { View, Text } from 'react-native';

import Header from '../components/Header';

class ProfileScreen extends Component {
  render() {
    return (
      <View>
        <Header headerText={'Profile'} />
      </View>
    );
  }
}

export default ProfileScreen;
