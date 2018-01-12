import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Image } from 'react-native';

class UserHistorySection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      image: null,
      text: null,
      binID: null,
      createdAt: null,
      binType: null,
      binTypeText: null,
    };
  }

  componentDidMount() {
    // console.log('@@@@@@ In UserHistorySection.js, componentDidMount @@@@@@ ');
    // console.log(new Date().toTimeString());
    // console.log('this.props');
    // console.log(this.props);

    const garbageIcon = require('../images/garbage_icon.png');
    const recyclingIcon = require('../images/recycling_icon.jpg');
    // const useBinImage = require('../images/earth_icon2.png');
    const reportFullBinImage = require('../images/bin_full.png');
    const reportMissingBinImage = require('../images/yellow_question_mark.png');

    if (this.props.userBin[0].action === 'use') {
      if (this.props.userBin[1].bin_type === "GARBAGE") {
        this.setState({
          image: garbageIcon,
          text: `BINNED`,
          createdAt: this.props.userBin[0].created_at.substring(0,10),
          binID: this.props.userBin[0].bin_id,
          binTypeText: this.props.userBin[1].bin_type,
        });
        // console.log('New state');
        // console.log(this.state);
      } else if (this.props.userBin[1].bin_type === "RECYCLING") {
        this.setState({
          image: recyclingIcon,
          text: `BINNED`,
          createdAt: this.props.userBin[0].created_at.substring(0,10),
          binID: this.props.userBin[0].bin_id,
          binTypeText: this.props.userBin[1].bin_type,
        });
        // console.log('New state');
        // console.log(this.state);
      }
    } else if (this.props.userBin[0].action === 'full') {
      if (this.props.userBin[1].bin_type === "GARBAGE") {
        this.setState({
          image: reportFullBinImage,
          text: `REPORTED FULL`,
          createdAt: this.props.userBin[0].created_at.substring(0,10),
          binID: this.props.userBin[0].bin_id,
          binTypeText: this.props.userBin[1].bin_type,
        });
        // console.log('New state');
        // console.log(this.state);
      } else if (this.props.userBin[1].bin_type === "RECYCLING") {
        this.setState({
          image: reportFullBinImage,
          text: 'REPORTED FULL',
          createdAt: this.props.userBin[0].created_at.substring(0,10),
          binID: this.props.userBin[0].bin_id,
          binTypeText: this.props.userBin[1].bin_type,
        });
        // console.log('New state');
        // console.log(this.state);
      }
    } else if (this.props.userBin[0].action === 'missing') {
      if (this.props.userBin[1].bin_type === "GARBAGE") {
        // console.log('In this.props.userBin[0].action is missing');
        this.setState({
          image: reportMissingBinImage,
          text: `REPORTED MISSING`,
          createdAt: this.props.userBin[0].created_at.substring(0,10),
          binID: this.props.userBin[0].bin_id,
          binTypeText: this.props.userBin[1].bin_type,
        });
        // console.log('New state');
        // console.log(this.state);
      } else if (this.props.userBin[1].bin_type === "RECYCLING") {
        // console.log('In this.props.userBin[0].action is missing');
        this.setState({
          image: reportMissingBinImage,
          text: 'REPORTED MISSING',
          createdAt: this.props.userBin[0].created_at.substring(0,10),
          binID: this.props.userBin[0].bin_id,
          binTypeText: this.props.userBin[1].bin_type,
        });
        // console.log('New state');
        // console.log(this.state);
      }
    }
  }

  render() {

    return (
      <View
        style={ styles.viewSectionStyle }
      >
        <Image
          style={ styles.imageStyle }
          source={ this.state.image }
        />

        <View>
          <Text style={ styles.binIDTextStyle }>
            { this.state.binTypeText } {'bin #'}{ this.state.binID }
          </Text>
          <Text style={ styles.actionTextStyle }>
            { this.state.text }
          </Text>
          <Text style={ styles.createdAtTextStyle }>
            { this.state.createdAt }
          </Text>

        </View>

      </View>
    )
  }

}

const styles = StyleSheet.create({
  // scrollViewContainer: {
  //   backgroundColor: 'transparent',
    // paddingLeft:20,
    // paddingRight:20
  // },
  // containerViewStyle: {
    // flex: 1,
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
  //   height: 400,
  // },
  // headerTextStyle: {
  //   fontSize: 20,
  //   textAlign: 'center',
  //   marginTop: 10,
  //   marginBottom: 10,
  // },
  binIDTextStyle: {
    fontSize: 14,
    marginTop: 8,
  },
  actionTextStyle: {
    fontSize: 20,
    // marginTop: 20,
  },
  createdAtTextStyle: {
    fontSize: 14,
  },
  imageStyle: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    height: 50,
    width: 50,
  },
  viewSectionStyle: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    padding: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start', //push items to the left
    flexDirection: 'row', //defaults to column(block)
    // flexWrap: 'wrap',
    // flex: 1,
    borderColor: '#ddd',
    position: 'relative'
  },
});

export default UserHistorySection;
