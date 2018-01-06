import React, { Component } from 'react';
import { View, Text, AsyncStorage, ScrollView, StyleSheet } from 'react-native';

import Header from '../components/Header';
import ProfileCard from '../components/ProfileCard';
// import CardSection from '../components/CardSection';
import UserBinnedHistory from '../components/UserBinnedHistory'
// import ProfileHistoryCard from '../components/ProfileHistoryCard'

class ProfileScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      userData: this.props.screenProps.userData,
      username: null,
      memberSince: null,
      binCount: null,
      userBinnedHistory: [],
    }
    console.log('@@@@@@@ In ProfileScreen, this.state @@@@@@@');
    console.log(this.state);
    console.log('this.props');
    console.log(this.props);

    let userID = null;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.screenProps.userData !== this.props.screenProps.userData) {
      console.log('In Profile.js, componentWillReceiveProps, props changed!');
      console.log('this.props.screenProps.userData:');
      console.log(this.props.screenProps.userData);
      console.log('nextProps.screenProps.userData:');
      console.log(nextProps.screenProps.userData);
      console.log('Making GET request to API to get UserBin data for this particular User');

      fetch(
        `http://localhost:3000/user_bins?user_id=${encodeURIComponent(userID)}`, {
          method: 'GET',
      })
      .then((response) => {
        console.log('Getting UserBins API response:');
        console.log(response);

        if (response.status === 200) {
          console.log('API status 200');

          userBinDataParsedResponse = JSON.parse(response._bodyText);

          console.log('userBinDataParsedResponse:');
          console.log(userBinDataParsedResponse);

          //setState here?
          this.setState({
            userData: nextProps.screenProps.userData,
            username: nextProps.screenProps.userData.username,
            memberSince: nextProps.screenProps.userData.created_at.substring(0,10),
            binCount: nextProps.screenProps.userData.bin_count,
            userBinnedHistory: userBinDataParsedResponse,
          })
        }
      })
      .catch(err => console.log(err))
    }
  }

  componentDidMount() {
    console.log('@@@@@@@@@ In ProfileScreen.js, componentDidMount @@@@@@@@@');

    AsyncStorage.getItem("USER_KEY")
      .then(keyValue => {
        if ( Boolean(keyValue) ) {
          console.log('There is a valid res/USER_KEY: ');
          console.log(keyValue);
          console.log('keyValue.id');
          console.log(JSON.parse(keyValue).id);

          userID = JSON.parse(keyValue).id;

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
            }
          })
          .then(() => {
            // request to API for UserBin data for this User
            console.log('Making GET request to API to get UserBin data for this particular User');
            return fetch(
              `http://localhost:3000/user_bins?user_id=${encodeURIComponent(userID)}`, {
                method: 'GET',
            })
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
                memberSince: userDataParsedResponse.created_at.substring(0,10),
                binCount: userDataParsedResponse.bin_count,
                userBinnedHistory: userBinDataParsedResponse,
              })

              console.log('Got all API data, setState');
              console.log(this.state);
            }
          })
          .catch(err => console.log(err))

        }})
      }

  render() {

    // this.getData();

    return (
      <View>
        <Header headerText={ this.state.username } />

        <View style={ styles.containerViewStyle }>
          <ProfileCard>
            <Text style={ styles.textStyle }>
              {'Member since:'} { this.state.memberSince  }
            </Text>

            <Text style={ styles.textStyle }>
              {'Total times binned:'} { this.state.binCount } {''}
            </Text>
          </ProfileCard>

          <UserBinnedHistory
            userBinnedHistory={ this.state.userBinnedHistory }>
          </UserBinnedHistory>
        </View>

      </View>
    );
  }
}


const styles = StyleSheet.create({
  containerViewStyle: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: "#ddd",
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 20,
    marginRight:20,
    marginTop: 20,
    marginBottom: 20,
    height: 500,
    // flex: 1,
  },
  textStyle: {
    marginTop: 5,
    marginBottom: 5,
    textAlign: 'center',
  },
});


export default ProfileScreen;
