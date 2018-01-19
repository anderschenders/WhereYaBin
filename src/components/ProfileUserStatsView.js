import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

// import ProfileCard from './ProfileCard';
import ProfileUserStatsCard from './ProfileUserStatsCard';

const ProfileUserStatsView = ({ userData }) => {
  console.log('ProfileUserStatsView, userData');
  console.log(userData);
  return (
    <View style={ styles.containerViewStyle }>
      <ProfileUserStatsCard userData={ userData }>

      </ProfileUserStatsCard>

    </View>
  );

}

const styles = StyleSheet.create({
  containerViewStyle: {
    // flex: 1,
    // flexDirection: 'row',
    // justifyContent: 'center',
    // flex: 1,

    backgroundColor: '#468CBA', //'#468CBA'
    borderWidth: 1,
    borderRadius: 2,
    borderColor: "#468CBA",
    borderBottomWidth: 0,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 2,
    elevation: 1,
    marginLeft: 20,
    marginRight:20,
    marginTop: 20,
    // marginBottom: 20,
    height: 220,
  },
  // headerTextStyle: {
  //   fontSize: 20,
  //   textAlign: 'center',
  //   marginTop: 10,
  //   marginBottom: 10,
  //   fontWeight: 'bold',
  // },
  // scrollViewContainer: {
  //   backgroundColor: 'white',
  // }
});

export default ProfileUserStatsView;
