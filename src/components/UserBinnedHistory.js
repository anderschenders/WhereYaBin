import React, { Component } from 'react';
import { AppRegistry, StyleSheet, ScrollView, Text, View } from 'react-native';

import Card from './Card';

const UserBinnedHistory = ({ userBinnedHistory }) => {
  console.log("DPR: rendering a userbinnedhistory, parameter was:");
  console.log(userBinnedHistory);
  return (
    <ScrollView>
      { userBinnedHistory.map(userBin =>
        <View key={userBin.id}>
          <Text>{ userBin.created_at }</Text>
        </View>
        )
      }
    </ScrollView>

    );
  }

const styles = StyleSheet.create({

});

export default UserBinnedHistory;
