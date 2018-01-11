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
      // userData: this.props.screenProps.userData,
      // username: null,
      // memberSince: null,
      // activityCount: null,
      // distanceTravelled: null,
      userBinnedHistory: [],
    }
    console.log('@@@@@@@ In ProfileScreen constructor, this.state @@@@@@@');
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
      console.log('nextProps.screenProps.userData.user:');
      console.log(nextProps.screenProps.userData.user);

      console.log('Making GET request to API to get UserBin data for this particular User');

      // userID = this.props.screenProps.user_id;

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
            // userData: nextProps.screenProps.userData,
            username: nextProps.screenProps.userData.user.username,
            memberSince: nextProps.screenProps.userData.user.created_at.substring(0,10),
            activityCount: nextProps.screenProps.userData.user.bin_count,
            distanceTravelled: nextProps.screenProps.userData.total_dist,
            userBinnedHistory: userBinDataParsedResponse,
          })
        }
      })
      .catch(err => console.log(err))
    }
  }

  componentDidMount() {
    console.log('@@@@@@@@@ In ProfileScreen.js, componentDidMount @@@@@@@@@');

  //   this.setState({
  //     username: this.props.screenProps.userData.username,
  //     memberSince: this.props.screenProps.userData.created_at.substring(0,10),
  //     activityCount: this.props.screenProps.userData.bin_count,
  //     userBinnedHistory: userBinDataParsedResponse,
  //   });
  //
  //   console.log('Got all API data, setState');
  //   console.log(this.state);
  // }

    AsyncStorage.getItem("USER_KEY")
      .then(keyValue => {
        if ( Boolean(keyValue) ) {
          console.log('There is a valid res/USER_KEY: ');
          console.log(keyValue);
          console.log('keyValue.id');
          console.log(JSON.parse(keyValue).user.id);

          userID = JSON.parse(keyValue).user.id;

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
                username: userDataParsedResponse.user.username,
                memberSince: userDataParsedResponse.user.created_at.substring(0,10),
                activityCount: userDataParsedResponse.user.bin_count,
                distanceTravelled: userDataParsedResponse.total_dist,
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

    if (this.props.screenProps.userData == null) {
      return <View></View>
    }

    const { username, memberSince, activityCount, distanceTravelled } = this.props.screenProps.userData.user;

    console.log('In profile screen render()');
    console.log(this.props.screenProps.userData);
    console.log(memberSince);

    return (
      <View style={{backgroundColor: '#468CBA', height: '100%'}}>
        <Header headerText={ username } headerSummaryText={{
          memberSince: this.props.screenProps.userData.user.created_at.substring(0,10),
          activityCount: this.props.screenProps.userData.user.bin_count,
          distanceTravelled: this.props.screenProps.userData.total_dist,
        }}/>

        <UserBinnedHistory
          userBinnedHistory={ this.state.userBinnedHistory }>
        </UserBinnedHistory>

      </View>
    );
  }
}


const styles = StyleSheet.create({
  // containerViewStyle: {
  //   borderWidth: 1,
  //   borderRadius: 2,
  //   borderColor: "#ddd",
  //   borderBottomWidth: 0,
  //   shadowColor: '#000',
  //   shadowOffset: { width: 0, height: 2 },
  //   shadowOpacity: 0.1,
  //   shadowRadius: 2,
  //   elevation: 1,
  //   marginLeft: 20,
  //   marginRight:20,
  //   marginTop: 20,
  //   marginBottom: 20,
  //   height: 550,
  //   // flex: 1,
  // },
  // textStyle: {
  //   marginTop: 5,
  //   marginBottom: 5,
  //   textAlign: 'center',
  // },
});


export default ProfileScreen;
