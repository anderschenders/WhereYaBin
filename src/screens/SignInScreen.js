import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, TouchableHighlight } from 'react-native';
import SignUpScreen from './SignUpScreen';

import t from 'tcomb-form-native';

const Form = t.form.Form;

const User = t.struct({
  email: t.String,
  username: t.maybe(t.String),
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
      error: 'Please enter your email address'
    },
    password: {
      error: 'Please enter your password'
    },
  },
  stylesheet: formStyles,
};

class SignInScreen extends Component {

  handleSubmit = () => {
    const getFormData = this._form.getValue();
    console.log('Form data: ', getFormData);
    if (getFormData) {
      // POST to Rails API create use route
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Form
          ref={ c => this._form = c }
          type={User}
          options={options}
        />
        <TouchableHighlight style={styles.signInButtonStyle} onPress={this.handleSubmit} underlayColor='#99d9f4'>
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

export default SignInScreen;

// <Button style={styles.signInButtonStyle}
//   title="Sign in"
//   onPress={this.handleSubmit}
// />
