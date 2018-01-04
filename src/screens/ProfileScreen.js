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
      userBinnedHistory: [],
    }
  }

  componentDidMount() {
    console.log('@@@@@@@@@ In ProfileScreen.js, componenetDidMount @@@@@@@@@');

    AsyncStorage.getItem("USER_KEY")
      .then(keyValue => {
        if ( Boolean(keyValue) ) {
          console.log('There is a valid res/USER_KEY: ');
          console.log(keyValue);
          console.log('keyValue.id');
          console.log(JSON.parse(keyValue).id);

          userID = JSON.parse(keyValue).id;
          // resolve(true);

          // request to API for User data
          console.log('Making GET request to API to get User data');

          let userDataParsedResponse = null;
          let userBinDataParsedResponse = null;

          fetch(
            `http://localhost:3000/users?id=${encodeURIComponent(userID)}`, {
              method: 'GET',
          })
          .then((response) => {
            console.log('API response:');
            console.log(response);

            if (response.status === 200) {
              console.log('API status 200');

              userDataParsedResponse = JSON.parse(response._bodyText);

              console.log('userDataParsedResponse:');
              console.log(userDataParsedResponse);
              //setState here?
              //this.setState = {
              //   username: userDataParsedResponse.username,
              //   memberSince: userDataParsedResponse.created_at,
              //   binCount: userDataParsedResponse.bin_count,
              //   userBinnedHistory: [],
              // }
            }
          })

          // request to API for UserBin data for this User
          console.log('Making GET request to API to get UserBin data for this particular User');
          fetch(
            `http://localhost:3000/user_bins?user_id=${encodeURIComponent(userID)}`, {
              method: 'GET',
          })
          .then((response) => {
            console.log('API response:');
            console.log(response);

            if (response.status === 200) {
              console.log('API status 200');

              userBinDataParsedResponse = JSON.parse(response._bodyText);

              console.log('userBinDataParsedResponse:');
              console.log(userBinDataParsedResponse);
              //setState here?
              this.setState({
                username: userDataParsedResponse.username,
                memberSince: userDataParsedResponse.created_at,
                binCount: userDataParsedResponse.bin_count,
                userBinnedHistory: userBinDataParsedResponse,
              })

              console.log('Got all API data, setState');
              console.log(this.state);
            }
          })
        }})
      }

  render() {
    return (
      <View>
        <Header headerText={this.state.username} />
        <Card>
          <Text>
            {'Member since...'}
          </Text>
          <Text>
            {this.state.memberSince}
          </Text>
          <Text>
            {'You\'ve binned'} {this.state.binCount} {''}
          </Text>
        </Card>
      </View>
    );
  }
}

export default ProfileScreen;
