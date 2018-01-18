import React, { Component } from 'react';
import { View } from 'react-native';

import Header from '../components/Header';
import ProfileCard from '../components/ProfileCard';
import UserBinnedHistory from '../components/UserBinnedHistory';
import ProfileUserStatsView from '../components/ProfileUserStatsView';

class ProfileScreen extends Component {

  constructor(props) {
    super(props);

    console.log('@@@@@@@ In ProfileScreen constructor, this.props @@@@@@@');
    console.log(this.props);
  }

  render() {

    console.log('ProfileScreen render, this.props.screenProps.userData');
    console.log(this.props.screenProps.userData);

    if (this.props.screenProps.userData === null) {
      return <View></View>
    }

    const { username, memberSince, activityCount, distanceTravelled } = this.props.screenProps.userData.user;

    console.log('In profile screen render()');
    console.log(new Date().toTimeString());
    console.log(this.props.screenProps.userData);

    return (
      <View style={{backgroundColor: '#468CBA', height: '100%'}}>
        <Header headerText={ username } headerSummaryText={{
          memberSince: this.props.screenProps.userData.user.created_at.substring(0,10),
          activityCount: this.props.screenProps.userData.user.bin_count,
          distanceTravelled: this.props.screenProps.userData.total_dist,
        }}/>

        <ProfileUserStatsView userData={ this.props.screenProps.userData }/>

        <UserBinnedHistory
          userBinnedHistory={ this.props.screenProps.userData.user_bins }>
        </UserBinnedHistory>

      </View>
    );
  }
}

export default ProfileScreen;
