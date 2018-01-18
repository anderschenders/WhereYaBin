import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

import ProfileCard from './ProfileCard';

const ProfileUserStatsCard = ({ userData }) => {
  console.log('ProfileUserStatsCard, userData');
  console.log(userData);
  return (

    <View style={ styles.containerViewStyle }>

      <View style={{ backgroundColor: 'yellow', }}>
        <View style={ styles.profileCardStyles }>
          <Text style={ styles.headerTextStyle }>
            Whatya binned
          </Text>
        </View>

        <Text>
          {userData.use_total}
          {userData.total_rec}
          {userData.total_gar}
          {userData.total_reports}
          {userData.missing_reports}
          {userData.full_reports}
          {userData.add_reports}
        </Text>
      </View>

      <View style={{ marginLeft: 20, }} />

      <View style={{ backgroundColor: 'yellow' }}>
        <View style={ styles.profileCardStyles }>
          <Text style={ styles.headerTextStyle }>
            Whatya found
          </Text>
        </View>

        <Text>
          STATS
        </Text>

      </View>

    </View>

  );

}

const styles = StyleSheet.create({
  containerViewStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    // backgroundColor: 'blue',
    // borderWidth: 1,
    // borderRadius: 2,
    // borderColor: "#ddd",
    // borderBottomWidth: 0,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 2,
    // elevation: 1,
    // marginLeft: 20,
    // marginRight:20,
    // marginTop: 20,
    // marginBottom: 20,
    height: 200,
  },
  profileCardStyles: {
    width: 160,
    // borderWidth: 1,
    borderRadius: 2,
    borderColor: "#ebf0f0",
    borderBottomWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    backgroundColor: '#ebf0f0',
    // marginLeft: 1,
    // marginRight: 1,
    // marginTop: 1
  },
  headerTextStyle: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  // scrollViewContainer: {
  //   backgroundColor: 'white',
  // },


});

export default ProfileUserStatsCard;
