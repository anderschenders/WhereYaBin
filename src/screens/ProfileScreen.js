import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';

import Header from '../components/Header';
import Card from '../components/Card';
import CardSection from '../components/CardSection';

class ProfileScreen extends Component {

  constructor() {
    super();

    this.state = {
      username: null,
      memberSince: null,
      binCount: null,
    }
  }

  componentDidMount() {
    //TODO: Where to put this request to AsyncStorage?

    let username = null;
    let createdAt = null;
    let binCount = null;

    AsyncStorage.getItem("USER_KEY")
      .then(keyValue => {
        if ( Boolean(keyValue) ) {
          console.log('@@@@@@ In ProfileScreen, AsyncStorage call @@@@@@');
          console.log('There is a valid es/USER_KEY: ');
          console.log(keyValue);
          console.log('keyValue.id');
          console.log(JSON.parse(keyValue).id);

          console.log('keyValue.username');
          console.log(JSON.parse(keyValue).username);

          username = JSON.parse(keyValue).username;

          console.log('keyValue.created_at');
          console.log(JSON.parse(keyValue).created_at);

          createdAt = JSON.parse(keyValue).created_at;

          console.log('keyValue.bin_count');
          console.log(JSON.parse(keyValue).bin_count);

          binCount = JSON.parse(keyValue).bin_count;

          console.log('Initial this.state:');
          console.log(this.state);

          this.setState({
            username: username,
            memberSince: createdAt,
            binCount: binCount,
          })
          console.log('New state:');
          console.log(this.state);

        } else {
          console.log('There is not a valid res/USER_KEY: ');
          console.log(keyValue);
        }
      })
      .catch(err => reject(err));
  }

  render() {
    return (
      <View>
        <Header headerText={'Profile'} />
        <Card>
          <Text>
            {'Member since...'}
          </Text>
          <Text>
            {this.state.memberSince}
          </Text>
        </Card>
      </View>
    );
  }
}

export default ProfileScreen;
