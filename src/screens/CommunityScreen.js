import React, { Component } from 'react';
import { View, Text, AsyncStorage, StyleSheet, ScrollView, Image, } from 'react-native';

import CommunityHeader from '../components/CommunityHeader';
import ProfileCard from '../components/ProfileCard';

class CommunityScreen extends Component {

  constructor(props) {
    super(props);

    console.log('@@@@@@@ In CommunityScreen constructor, screenProps.communityData @@@@@@@');
    console.log(this.props.screenProps.communityData);
  }

  // componentDidMount() {
  //   console.log('@@@@@@@@@ In CommunityScreen.js, componentDidMount @@@@@@@@@');
  //   console.log(new Date().toTimeString());
  // }

  render() {

    if (this.props.screenProps.communityData == null) {
      return <View></View>
    }

    const { action_use_count, top_dist, top_user_activity, top_dist_username, top_user_activity_username, total_dist_travelled, user_count } = this.props.screenProps.communityData;

    console.log('In communityScreen render()');
    console.log(new Date().toTimeString());
    console.log(this.props.screenProps.communityData);

    return (
      <View style={{backgroundColor: '#468CBA', height: '100%'}}>
        <CommunityHeader headerText={ 'Community Stats' } />

        <View style={{height: 500}}>
          <ScrollView>

            <View style={ styles.containerViewStyle }>

              <ProfileCard>
                <Text style={ styles.headerTextStyle }>
                  ALL USERS
                </Text>
              </ProfileCard>

              <View
                style={ styles.viewSectionStyle }
              >

              <Text style={ styles.titleTextStyle }>
                Total # of users:
              </Text>
              <Text style={ styles.contentTextStyle }>
                { user_count }
              </Text>

              </View>


              <View
                style={ styles.viewSectionStyle }
              >

              <Text style={ styles.titleTextStyle }>
                Total garbage&recycling binned:
              </Text>
              <Text style={ styles.contentTextStyle }>
                { action_use_count }
              </Text>

              </View>

              <View
                style={ styles.viewSectionStyle }
              >

              <Text style={ styles.titleTextStyle }>
                Total distanced travelled:
              </Text>
              <Text style={ styles.contentTextStyle }>
                { total_dist_travelled } miles
              </Text>

              </View>
            </View>

            <View style={ styles.containerViewStyle }>
              <ProfileCard>
                <Text style={ styles.headerTextStyle }>
                  USER SPOTLIGHT
                </Text>
              </ProfileCard>

              <View
                style={ styles.viewSectionStyle }
              >

              <Text style={ styles.titleTextStyle }>
                Most active:
              </Text>
              <Text style={ styles.contentTextStyle }>
                { top_user_activity_username }
              </Text>
              <Text style={ styles.inBracketsTextStyle }>
                (with { top_user_activity } total activities)
              </Text>

              </View>

              <View
                style={ styles.viewSectionStyle }
              >

              <Text style={ styles.titleTextStyle }>
                Most travelled:
              </Text>
              <Text style={ styles.contentTextStyle }>
                { top_dist_username }
              </Text>
              <Text style={ styles.inBracketsTextStyle }>
                (at { top_dist } miles)
              </Text>

              </View>

            </View>

          </ScrollView>
        </View>
      </View>

    );
  }
}


const styles = StyleSheet.create({
  containerViewStyle: {
    // flex: 1,
    backgroundColor: 'white',
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
    height: 330,
  },
  viewSectionStyle: {
    borderTopWidth: 1,
    // borderBottomWidth: 1,
    padding: 1,
    backgroundColor: '#fff',
    // justifyContent: 'flex-start', //push items to the left
    // flexDirection: 'row', //defaults to column(block)
    borderColor: '#ddd',
    // position: 'relative'
  },
  headerTextStyle: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  titleTextStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#284F80',
    marginTop: 15,
  },
  contentTextStyle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#468CBA',
    marginTop: 10,
    marginBottom: 10,
  },
  inBracketsTextStyle: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 3,
    marginBottom: 10,
  }
});


export default CommunityScreen;
