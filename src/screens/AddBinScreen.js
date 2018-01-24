import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, TouchableHighlight, TouchableOpacity, Picker } from 'react-native';

import { AWS_URL } from '../../config';

const addBinURL = `${AWS_URL}/bins`;

class AddBinScreen extends Component {

  constructor(props){
    super(props);

    this.state = {
      userErrorMessage: null,
      userSuccessMessage: null,
      pickerValue: "SELECT",
    };
  }

  postAddBin() {
    console.log('In postAddBin');
    console.log('BEFORE POST request to add bin', new Date().toTimeString());
    console.log('this.state.pickerValue');
    console.log(this.state.pickerValue);

    console.log('this.props');
    console.log(this.props.navigation.state.params);

    if (this.state.pickerValue === "SELECT" || this.state.pickerValue === null) {
      console.log('Invalid pickerValue');
      this.setState({
        userErrorMessage: 'Please select a bin type',
      })
    } else {
      const userID = this.props.navigation.state.params.userID;
      let newUserData = null;

      fetch(addBinURL, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_id: userID,
            bin_type: this.state.pickerValue,
            latitude: this.props.navigation.state.params.userLocation.user_lat,
            longitude: this.props.navigation.state.params.userLocation.user_lng,
          })
        }
      )
      .then((response) => {
        if (response.status === 200) {
          console.log('AFTER POST to add bin, API status 200');
          console.log(new Date().toTimeString());

          const parsedResponse = JSON.parse(response._bodyText);

          console.log('parsedResponse:');
          console.log(parsedResponse);

          // newUserData = {
          //   user: parsedResponse.updated_user,
          //   total_dist: parsedResponse.total_dist,
          //   user_bins: parsedResponse.user_bins,
          // }

          // set response message
          let userSuccessMessage = null;
          if (parsedResponse.user_message) {
            modalMessage = `ADDED! ${parsedResponse.user_message}`;

            this.setState({
              userErrorMessage: null,
              userSuccessMessage: userSuccessMessage,
            });

          } else {
            userSuccessMessage = 'ADDED!';
              console.log('In modal setState');

            this.setState({
              userErrorMessage: null,
              userSuccessMessage: userSuccessMessage,
            });
          }

          this.props.screenProps.updateAsyncStorage(parsedResponse);

        } else {
          console.log('@@@@@ API status 400 response body text: @@@@@');
          console.log(response._bodyText);

          const parsedResponse = JSON.parse(response._bodyText);
          console.log('parsedResponse:');
          console.log(parsedResponse);

          this.setState({
            userSuccessMessage: null,
            userErrorMessage: parsedResponse.errors,
          })
        }
      })
      .catch((error) => {
        console.log('error:', error);
      })
    }
  }

  render() {

    return (

      <View style={{ flex: 1, height: '100%', width: '100%', backgroundColor: '#ebf0f0', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',}}>

        <View style={{justifyContent: 'center', width: '50%'}}>
        <Text style={{ fontSize: 16, color: 'rgb(55, 110, 233)', fontWeight: 'bold', textAlign: 'center',  }}>{this.state.userSuccessMessage}</Text>
          <Text style={{ fontSize: 16, color: 'rgb(200, 41, 51)', fontWeight: 'bold', textAlign: 'center',  }}>{this.state.userErrorMessage}</Text>
        </View>

        <Picker
          style={{height: 200, width: 300, marginBottom: 10,}}
          selectedValue={this.state.pickerValue}
          onValueChange={(itemValue, itemIndex) => this.setState({pickerValue: itemValue})}>
          <Picker.Item label="Select bin type" value="SELECT" />
          <Picker.Item label="Recycling" value="RYPUBL" />
          <Picker.Item label="Garbage" value="GPUBL" />
          <Picker.Item label="Both" value="BOTH" />
        </Picker>

        <TouchableOpacity
          onPress={ this.postAddBin.bind(this) }>
          <View
            style={{
              backgroundColor: 'lightblue',
              padding: 8,
              marginTop: 10,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 4,
              borderColor: 'rgba(0, 0, 0, 0.1)',}}>
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>ADD BIN</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}


export default AddBinScreen;

// <TouchableOpacity
//   onPress={ () => { this.setState({
//       addBinModalVisible: false,
//     });
// }}>
//   <View
//     style={{
//       backgroundColor: 'rgb(227, 134, 134)',
//       padding: 8,
//       marginTop: 10,
//       justifyContent: 'center',
//       alignItems: 'center',
//       borderRadius: 4,
//       borderColor: 'rgba(0, 0, 0, 0.1)',}}>
//     <Text style={{fontSize: 16, fontWeight: 'bold'}}>CLOSE</Text>
//   </View>
// </TouchableOpacity>
