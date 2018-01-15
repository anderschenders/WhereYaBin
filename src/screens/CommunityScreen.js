import React, { Component } from 'react';
import { View, Text, AsyncStorage, StyleSheet, ScrollView} from 'react-native';

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

              <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', color: '#284F80', marginTop: 15 }}>
                Total # of users:
              </Text>
              <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center', color: '#468CBA', marginTop: 10 }}>
                { user_count }
              </Text>

              <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', color: '#284F80', marginTop: 15 }}>
                Total garbage&recycling binned:
              </Text>
              <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center', color: '#468CBA', marginTop: 10 }}>
                { action_use_count }
              </Text>

              <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', color: '#284F80', marginTop: 15 }}>
                Total distanced travelled:
              </Text>
              <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center', color: '#468CBA', marginTop: 10 }}>
                { total_dist_travelled } miles
              </Text>
            </View>

            <View style={ styles.containerViewStyle }>
              <ProfileCard>
                <Text style={ styles.headerTextStyle }>
                  USER SPOTLIGHT
                </Text>
              </ProfileCard>

              <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', color: '#284F80', marginTop: 15 }}>
                Most active:
              </Text>
              <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center', color: '#468CBA', marginTop: 10 }}>
                { top_user_activity_username }
              </Text>
              <Text style={{ fontSize: 18, textAlign: 'center', marginTop: 10 }}>
                (with { top_user_activity } total activities)
              </Text>

              <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', color: '#284F80', marginTop: 15 }}>
                Most travelled:
              </Text>
              <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center', color: '#468CBA', marginTop: 10 }}>
                { top_dist_username }
              </Text>
              <Text style={{ fontSize: 18, textAlign: 'center', marginTop: 10 }}>
                (at { top_dist } miles)
              </Text>

            </View>

          </ScrollView>
          </View>
        </View>


    );
  }
}


const styles = StyleSheet.create({

  containerViewStyle1: {
    // flex: 1,
    backgroundColor: '#65B783',
    borderWidth: 1,
    borderRadius: 2,
    borderColor: "#65B783",
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 20,
    marginRight:20,
    marginTop: 25,
    // marginBottom: 20,
    // height: 420,
  },
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
    // marginBottom: 20,
    height: 300,
  },
  headerTextStyle: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  textStyle: {
    fontSize: 20,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 5,
    marginRight: 5,
    textAlign: 'center',
  },
});


export default CommunityScreen;
