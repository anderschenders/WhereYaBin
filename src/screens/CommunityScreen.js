import React, { Component } from 'react';
import { View, Text, AsyncStorage, StyleSheet } from 'react-native';

import CommunityHeader from '../components/CommunityHeader';
import ProfileCard from '../components/ProfileCard';
// import CardSection from '../components/CardSection';
// import UserBinnedHistory from '../components/UserBinnedHistory'
// import ProfileHistoryCard from '../components/ProfileHistoryCard'

class CommunityScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {

    }
    console.log('@@@@@@@ In CommunityScreen constructor, screenProps.communityData @@@@@@@');
    console.log(this.props.screenProps.communityData);

  }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.screenProps.communityData !== this.props.screenProps.communityData) {
  //     console.log('In CommunityScreen.js, componentWillReceiveProps, props changed!');
  //     console.log('this.props.screenProps.communityData:');
  //     console.log(this.props.screenProps.communityData);
  //     console.log('nextProps.screenProps.communityData:');
  //     console.log(nextProps.screenProps.communityData);
  // }

  componentDidMount() {
    console.log('@@@@@@@@@ In CommunityScreen.js, componentDidMount @@@@@@@@@');
    console.log(new Date().toTimeString());
  }

  render() {

    if (this.props.screenProps.communityData == null) {
      return <View></View>
    }

    const { userCount, topUser, allActivity, distanceTravelled } = this.props.screenProps.communityData;

    console.log('In communityScreen render()');
    console.log(new Date().toTimeString());
    console.log(this.props.screenProps.communityData);

    return (
      <View style={{backgroundColor: '#468CBA', height: '100%'}}>
        <CommunityHeader headerText={ 'Community Stats' } />

        <View style={ styles.containerViewStyle }>
          <Text style={ styles.textStyle }>
          adfadfadf
          </Text>
        </View>

        <View style={ styles.containerViewStyle }>
          <Text style={ styles.textStyle }>
          adfadfadf
          </Text>
        </View>

        <View style={ styles.containerViewStyle }>
          <Text style={ styles.textStyle }>
          adfadfadf
          </Text>
        </View>

        <View style={ styles.containerViewStyle }>
          <Text style={ styles.textStyle }>
          adfadfadf
          </Text>
        </View>

        <View style={ styles.containerViewStyle }>
          <Text style={ styles.textStyle }>
          adfadfadf
          </Text>
        </View>
      </View>

    );
  }
}


const styles = StyleSheet.create({

  containerViewStyle: {
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
