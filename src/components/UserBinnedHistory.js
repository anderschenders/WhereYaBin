import React, { Component } from 'react';
import { AppRegistry, StyleSheet, ScrollView, Text, View, Image } from 'react-native';

import ProfileCard from './ProfileCard';
import UserHistorySection from './UserHistorySection';
// import ProfileCard from './ProfileCard';
// import ProfileHistoryCardSection from './ProfileHistoryCardSection'

const UserBinnedHistory = ({ userBinnedHistory }) => {

    if (userBinnedHistory.length === 0) {

      return (
        <View style={ styles.containerViewStyle }>
          <ProfileCard>
            <Text style={ styles.headerTextStyle }>
              Where YOU bin
            </Text>
          </ProfileCard>
          <Text style={{ fontSize: 16, textAlign: 'center', color: 'blue', marginTop: 10 }}>
            { 'No user activity yet' }
          </Text>
        </View>
      );

    } else {

      return (

      <View style={ styles.containerViewStyle }>
        <ProfileCard>
          <Text style={ styles.headerTextStyle }>
            Where YOU bin
          </Text>
        </ProfileCard>

          <ScrollView style={styles.scrollViewContainer}>

            { userBinnedHistory.map(userBin => <UserHistorySection userBin={ userBin } key={ userBin[0].id } />) }

          </ScrollView>

      </View>
      );
    }
  }

const styles = StyleSheet.create({
  containerViewStyle: {
    // flex: 1,
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
    height: 420,
  },
  headerTextStyle: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  // viewSectionTextStyle: {
  //   fontSize: 20,
  //   marginTop: 20,
  // },
  // imageStyle: {
  //   marginTop: 10,
  //   marginBottom: 10,
  //   marginLeft: 10,
  //   marginRight: 10,
  //   height: 50,
  //   width: 50,
  // },
  // viewSectionStyle: {
  //   borderTopWidth: 1,
  //   borderBottomWidth: 1,
  //   padding: 1,
  //   backgroundColor: '#fff',
  //   justifyContent: 'flex-start', //push items to the left
  //   flexDirection: 'row', //defaults to column(block)
  //   // flexWrap: 'wrap',
  //   // flex: 1,
  //   borderColor: '#ddd',
  //   position: 'relative'
  // },
});

export default UserBinnedHistory;
