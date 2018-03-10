import React, { Component } from 'react';
import firebase from 'firebase';
import { View, Text, StyleSheet, Button, TouchableHighlight, KeyboardAvoidingView  } from 'react-native';
import { Spinner } from '../components/common';
// import SignUpScreen from './SignUpScreen';
import { onSignIn } from '../../auth';
import { AWS_URL, LOCAL_HOST_URL } from '../../config';

import t from 'tcomb-form-native';

const Form = t.form.Form;

const User = t.struct({
  email: t.String,
  // username: t.maybe(t.String),
  password: t.String,
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
    // username: {
    //   placeholder: 'TomatoRose',
    // },
    password: {
      placeholder: 'password',
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
      loading: false,

    }

    this.onLoginSuccess = this.onLoginSuccess.bind(this);
    this.onLoginFail = this.onLoginFail.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onLoginSuccess(user) {
    this.setState({
      loading: false,
      error: null,
    });
  }

  onLoginFail(error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    this.setState({
      error: errorMessage,
      loading: false,
    });
  }

  handleSubmit() {
    console.log('@@@@@@@@In SignInScreen, handleSubmit @@@@@@@@@');

    const getFormData = this.refs.form.getValue();
    console.log('Form data: ', getFormData);

    if (getFormData) {
      this.setState({
        error: null,
        loading: true,
      });

      console.log('BEFORE FETCH to get user data');
      console.log(new Date().toTimeString());

      const email = getFormData.email;
      const password = getFormData.password;

      firebase.auth().signInWithEmailAndPassword(email, password)
      .then((user) => {
        console.log(user);
        console.log(user.pa);
        // firebase.auth().currentUser.getIdToken(true)
        // .then((idToken) => {
        //   console.log(idToken);

        //TODO:send idToken to backend

        const signInURL = `${LOCAL_HOST_URL}/users/auth?token=${user.pa}`;

        console.log('BEFORE FETCH TO AUTH');

        fetch(signInURL, {
          method: 'GET',
        })
        .then((response) => {
          console.log('AFTER FETCH TO AUTH SUCCESS');
          console.log('Response: ', response);

          this.onLoginSuccess(user);

        })
          //   const signInURL = `${AWS_URL}/users?email=${encodeURIComponent(getFormData.email)}&password=${encodeURIComponent(getFormData.password)}`;
          //
          //   fetch(signInURL, {
          //     method: 'GET',
          //   })
          //   .then((response) => {
          //     console.log('AFTER FETCH, API response:');
          //     console.log(response);
          //     console.log(new Date().toTimeString());
          //
          //     if (response.status === 200) {
          //       console.log('API status 200');
          //
          //       const parsedResponse = JSON.parse(response._bodyText);
          //
          //       console.log('parsedResponse:');
          //       console.log(parsedResponse);
          //
          //       onSignIn(parsedResponse).then((res) => {
          //         if (res === true) {
          //           this.props.screenProps.setSignInState(true);
          //           this.props.screenProps.updateAsyncStorage(parsedResponse)
          //           this.props.navigation.navigate("App");
          //         } else {
          //           console.log('sign in didnt work');
          //         }
          //       })
          //
          //     } else {
          //       console.log('API status 400 response body text:');
          //       console.log(new Date().toTimeString());
          //       console.log(response._bodyText);
          //
          //       const parsedResponse = JSON.parse(response._bodyText);
          //       console.log(parsedResponse.email);
          //
          //       // TODO: How to keep values in form until valid entry?
          //       this.setState({
          //         // email: this._form.getComponent('email').refs.input.focus(),
          //         // username: this._form.getComponent('username').refs.input.focus(),
          //         // password: null,
          //         error: parsedResponse,
          //       })
          //     }
          //   })
          //   .catch((error) => {
          //     console.log('error:', error);
          //   })
          // }
      })
      .catch((error) => {
        console.log("CATCH");
        console.log("ERROR: ", error);
        this.onLoginFail(error);
      });
    } else {

    }

  }

  renderButton() {
    if (this.state.loading) {
      return <Spinner size="small" />
    }

    return (
      <TouchableHighlight
        style={styles.signInButtonStyle}
        onPress={this.handleSubmit}
        underlayColor='#99d9f4'>
        <Text style={styles.buttonText}>Sign in</Text>
      </TouchableHighlight>
    );
  }

  render() {
    const { navigate } = this.props.navigation;
    let error = null
    if (this.state.error) {
      const errorMessage = this.state.error;

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

        <View
          style={styles.container}>

          <Form
            ref='form'
            type={User}
            options={options}
          />

          {error}

          {this.renderButton()}

          <View style={styles.signUpContainer}>
            <Text style={styles.textStyle}>
            Not a user yet?:
            </Text>

            <Button
              buttonStyle={{ marginTop: 20 }}
              backgroundColor="transparent"
              textStyle={{ color: "#bcbec1" }}
              title="Sign up"
              onPress={() => navigate("SignUpScreen")}
            />
          </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    paddingRight: 20,
    paddingLeft: 20,
    paddingTop: 13,
    paddingBottom: 10,
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
