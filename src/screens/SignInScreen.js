import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, TouchableHighlight } from 'react-native';
import SignUpScreen from './SignUpScreen';

import t from 'tcomb-form-native';

const Form = t.form.Form;

const User = t.struct({
  email: t.String,
  username: t.maybe(t.String),
  password: t.String,
  rememberMe: t.Boolean,
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

let options = {
  fields: {
    email: {
      placeholder: 'your@email.com',
      error: 'Please enter your email address'
    },
    username: {
      placeholder: 'TomatoRose',
    },
    password: {
      placeholder: 'yourvalidpassword',
      error: 'Please enter your password'
    },
  },
  stylesheet: formStyles,
};

class SignInScreen extends Component {

  constructor() {
    super();

    this.state = {
      email: null,
      username: null,
      password: null,
      error: null,
    }
  }

  handleSubmit = () => {
    const getFormData = this._form.getValue();
    console.log('Form data: ', getFormData);
    if (getFormData) {
      // POST to Rails API create use route
      fetch(`http://localhost:3000/users?email=${encodeURIComponent(getFormData.email)}&password=${encodeURIComponent(getFormData.password)}`, {
        method: 'GET',
      })
      .then((response) => {
        console.log('@@@@@ API response: @@@@@');
        console.log(response);

        if (response.status === 200) {
          console.log('@@@@@ API status 200 response body text: @@@@@');
          console.log(response._bodyText);
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
          // if ('email' in parsedResponse) {
          //   console.log('Email in parsedResponse');
          //   let options = {
          //     fields: {
          //       email: {
          //         error: parsedResponse.email
          //       },
          //     }
          //   }
          //   console.log('Resetting options: ');
          //   console.log(options);
          //   // this._form.getValue();
          // } else if ('password' in parsedResponse) {
          //   let options = {
          //     fields: {
          //       password: {
          //         error: parsedResponse.password
          //       },
          //     }
          //   }
          // }
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
          ref={ c => this._form = c }
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
