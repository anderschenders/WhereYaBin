import React, { Component } from 'react';
import { AppRegistry, StyleSheet, ScrollView, Text, View, Image } from 'react-native';

import Card from './Card';
import ProfileHistoryCardSection from './ProfileHistoryCardSection'

const UserBinnedHistory = ({ userBinnedHistory }) => {

  return (
    <View style={ styles.containerViewStyle }>
      <Text style={ styles.headerTextStyle }>
        Where Ya Bin
      </Text>
      <ScrollView>

        { userBinnedHistory.map(userBin =>

          <View
            key={ userBin.id }
            style={ styles.viewSectionStyle }
          >
            <Image
              style={ styles.imageStyle }
              source={ require('../images/earth_icon.png') }
            />
            <Text style={ styles.viewSectionTextStyle }>
              {'BINNED on'} { userBin.created_at }
            </Text>
          </View>
          )
        }
      </ScrollView>
    </View>
    );
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
  },
  headerTextStyle: {
    fontSize: 20,
    textAlign: 'center',
  },
  viewSectionTextStyle: {
    fontSize: 14,
  },
  imageStyle: {
    marginLeft: 10,
    height: 30,
    width: 30,
  },
  viewSectionStyle: {
    borderBottomWidth: 1,
    padding: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start', //push items to the left
    flexDirection: 'row', //defaults to column(block)
    borderColor: '#ddd',
    position: 'relative'
  },
});

export default UserBinnedHistory;
