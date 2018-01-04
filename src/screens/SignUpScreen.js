import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import { onSignIn } from "../../auth";

import t from 'tcomb-form-native';

const Form = t.form.Form;

const User = t.struct({
  email: t.String,
  username: t.String,
  password: t.String,
});

const formStyles = {
  ...Form.stylesheet,
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
    // the style applied when a validation error occours
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
      error: 'Please enter your email address',
    },
    username: {
      placeholder: 'TomatoRose',
      error: 'Please create a username',
    },
    password: {
      placeholder: 'abc123',
      error: 'Please create a password',
      // password: true,
      secureTextEntry: true,
    },
  },
  stylesheet: formStyles,
};

class SignUpScreen extends Component {
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
    console.log('@@@@@@@@In SignUpScreen, handleSubmit @@@@@@@@@');

    const getFormData = this.refs.form.getValue();
    console.log('Form data: ', getFormData);

    if (getFormData) {
      // POST to Rails API users#create
      fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(getFormData),
      })
      .then((response) => {
        console.log('API response: ');
        console.log(response);

        if (response.status === 200) {
          console.log('API status 200:');

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
          console.log(parsedResponse.errors);
          console.log('parsedResponse.errors.password');
          console.log(parsedResponse.errors.password);
          // TODO: How to keep values in form until valid entry?
          this.setState({
            error: parsedResponse.errors,
          })
        }
      })
      .catch((error) => {
        console.error(error);
      })
    }
  }

  render() {
    const { navigate } = this.props.navigation;

    let error = null

    if (this.state.error) {
      let errorMessage = this.state.error;

      console.log('In render error handling, errorMessage: ');
      console.log(errorMessage);

      for(key in errorMessage) {
        errorMessage = `${key}: ${errorMessage[key]}`
      }
      console.log('New errorMessage:');
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
        <TouchableHighlight style={styles.signInButtonStyle} onPress={this.handleSubmit} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Sign up</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 100,
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

export default SignUpScreen;
