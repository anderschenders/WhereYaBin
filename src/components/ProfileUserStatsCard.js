import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

import ProfileCard from './ProfileCard';

const ProfileUserStatsCard = ({ userData }) => {
  console.log('ProfileUserStatsCard, userData');
  // console.log(userData);

  const garbageIcon = require('../images/garbage_icon.png');
  const recyclingIcon = require('../images/recycling_icon.jpg');
  const reportFullBinImage = require('../images/bin_full.png');
  const reportMissingBinImage = require('../images/yellow_question_mark.png');
  const addBinImage = require('../images/add_plus3.png');

  return (

    <View style={ styles.containerViewStyle }>

      <View style={{ backgroundColor: 'white', width: 130}}>
        <View style={ styles.profileCardStyles }>
          <Text style={ styles.headerTextStyle }>
            Whatya binned
          </Text>
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'flex-start', }}>
          <Text style={{ fontSize: 18, marginTop: 13, marginLeft: 31, }}>Total: </Text>
          <Text style={ styles.contentTotalTextStyle }>{userData.use_total}</Text>
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'flex-start', marginTop: 10, }}>
          <Image
            style={ styles.imageStyle }
            source={ recyclingIcon }
          />
          <Text style={ styles.contentTextStyle }>
            {userData.total_rec}
          </Text>
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'flex-start', marginTop: 10, }}>
          <Image
            style={ styles.imageStyle }
            source={ garbageIcon }
          />

          <Text style={ styles.contentTextStyle }>
            {userData.total_gar}
          </Text>
        </View>

      </View>

      <View style={{ marginLeft: 20, }} />

      <View style={{ backgroundColor: 'white', width: 130 }}>
        <View style={ styles.profileCardStyles }>
          <Text style={ styles.headerTextStyle }>
            Whatya found
          </Text>
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'flex-start', }}>
          <Text style={{ fontSize: 18, marginTop: 13, marginLeft: 34, }}>Total: </Text>
          <Text style={ styles.contentTotalTextStyle }>
            { userData.total_reports }
          </Text>
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'flex-start', }}>
          <Image
            style={ styles.imageStyle }
            source={ addBinImage }
          />
          <Text style={ styles.contentTextStyle }>
            {userData.add_reports}
          </Text>
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'flex-start', }}>
          <Image
            style={ styles.imageStyle }
            source={ reportFullBinImage }
          />

          <Text style={ styles.contentTextStyle }>
            {userData.full_reports}
          </Text>
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'flex-start', }}>
          <Image
            style={ styles.imageStyle }
            source={ reportMissingBinImage }
          />

          <Text style={ styles.contentTextStyle }>
            {userData.missing_reports}
          </Text>
        </View>

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
    marginLeft: 20,
    marginRight:20,
    // marginTop: 20,
    // marginBottom: 20,
    height: 180,
  },
  profileCardStyles: {
    // width: 140,
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
    fontSize: 17,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  imageStyle: {
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 39,
    marginRight: 10,
    height: 33,
    width: 33,
  },
  contentTextStyle: {
    fontSize: 24,
    color: '#37a5b0',
    fontWeight: 'bold',
    marginTop: 7,
    marginRight: 10,
  },
  contentTotalTextStyle: {
    fontSize: 24,
    color: '#284F80',
    fontWeight: 'bold',
    marginTop: 10,
    marginRight: 10,
  },

});

export default ProfileUserStatsCard;
