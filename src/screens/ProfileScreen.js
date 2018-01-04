import React, { Component } from 'react';
import { View, Text } from 'react-native';

import Header from '../components/Header';
import Card from '../components/Card';
import CardSection from '../components/CardSection';

class ProfileScreen extends Component {
  render() {
    return (
      <View>
        <Header headerText={'Profile'} />
        <Card>
          <Text>
            {'Member since...'}
          </Text>
        </Card>
      </View>
    );
  }
}

export default ProfileScreen;
