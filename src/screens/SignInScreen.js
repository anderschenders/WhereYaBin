import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, TouchableHighlight } from 'react-native';
// import SignUpScreen from './SignUpScreen';
import { onSignIn } from "../../auth";

import t from 'tcomb-form-native';

const Form = t.form.Form;

const User = t.struct({
  email: t.String,
  username: t.maybe(t.String),
  password: t.String,
  // rememberMe: t.Boolean,
});

const formStyles = {
  ...Form.stylesheet, //don't really know how this is working
  formGroup: {
    normal: {
      marginBottom: 10
    },
  },
  controlLabel: {
    normal: {
      color: 'blue',
      fontSize: 18,
      marginBottom: 7,
      fontWeight: '600'
    },
    //styles applied when a validation error occours
    error: {
      color: 'red',
      fontSize: 18,
      marginBottom: 7,
      fontWeight: '600'
    }
  }
}

const options = {
  fields: {
    email: {
      placeholder: 'your@email.com',
      error: 'Please enter your email address'
    },
    username: {
      placeholder: 'TomatoRose',
    },
    password: {
      placeholder: 'abc123',
      error: 'Please enter your password',
      secureTextEntry: true,
    },
  },
  stylesheet: formStyles,
};

class SignInScreen extends Component {

  constructor() {
    super();

    this.state = {
      //TODO: how to store these values in form until valid entry?
      // email: null,
      // username: null,
      // password: null,
      error: null,
    }
  }

  handleSubmit = () => {
    console.log('@@@@@@@@In SignInScreen, handleSubmit @@@@@@@@@');

    const getFormData = this.refs.form.getValue();
    console.log('Form data: ', getFormData);

    if (getFormData) {
      // GET to Rails API users#index
      fetch(`http://localhost:3000/users?email=${encodeURIComponent(getFormData.email)}&password=${encodeURIComponent(getFormData.password)}`, {
        method: 'GET',
      })
      .then((response) => {
        console.log('API response:');
        console.log(response);

        if (response.status === 200) {
          console.log('API status 200');

          const parsedResponse = JSON.parse(response._bodyText);

          console.log('parsedResponse:');
          console.log(parsedResponse);
          console.log('parsedResponse.id:');
          console.log(parsedResponse.id);

          onSignIn(parsedResponse).then((res) => {
          if (res === true) {
            this.props.screenProps.setSignInState(true);
            this.props.navigation.navigate("App");
          } else {
            console.log('sign in didnt work');
          }
        })

        } else {
          console.log('@@@@@ API status 400 response body text: @@@@@');
          console.log(response._bodyText);

          const parsedResponse = JSON.parse(response._bodyText);
          console.log(parsedResponse.email);

          // TODO: How to keep values in form until valid entry?
          this.setState({
            // email: this._form.getComponent('email').refs.input.focus(),
            // username: this._form.getComponent('username').refs.input.focus(),
            // password: null,
            error: parsedResponse,
          })
        }
      })
      .catch((error) => {
        console.log('error:', error);
      })
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    let error = null
    if (this.state.error) {
      const errorMessage = this.state.error.error;
      console.log('In render!');
      console.log(this.state.error.error);
      console.log(errorMessage);
      error = <Text
                style={{
                  alignSelf: 'center',
                  color:'rgb(249, 57, 92)',
                  paddingBottom: 5,
                }}>
                  {errorMessage}
                </Text>
    }

    return (
      <View style={styles.container}>

        {error}

        <Form
          ref='form'
          type={User}
          options={options}
        />
        <TouchableHighlight
          style={styles.signInButtonStyle}
          onPress={this.handleSubmit}

          underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Sign in</Text>
        </TouchableHighlight>

        <View style={styles.signUpContainer}>
          <Text style={styles.textStyle}>
          Not a user yet?:
          </Text>

          <Button
            buttonStyle={{ marginTop: 20 }}
            backgroundColor="transparent"
            textStyle={{ color: "#bcbec1" }}
            title="Sign up"
            onPress={() => navigate("SignUpScreen")} />
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 50,
    marginLeft: 20,
    marginRight: 20,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  textStyle: {
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  signInButtonStyle: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
  }
});

export default SignInScreen;
