import React, { Component } from 'react';
import firebase from 'firebase';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import { onSignIn } from "../../auth";
import { AWS_URL, LOCAL_HOST_URL } from '../../config';

import t from 'tcomb-form-native';

const Form = t.form.Form;

const User = t.struct({
  username: t.String,
  email: t.String,
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
    // style applied when a validation error occurs
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
      placeholder: 'password',
      error: 'Please create a password',
      secureTextEntry: true,
    },
  },
  stylesheet: formStyles,
};

class SignUpScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      //loading: false TODO: implement this spinner
    }

    this.onLoginSuccess = this.onLoginSuccess.bind(this);
    this.onLoginFail = this.onLoginFail.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    console.log("this.props: ", this.props);
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
    console.log('@@@@@@@@In SignUpScreen, handleSubmit @@@@@@@@@');

    const getFormData = this.refs.form.getValue();
    console.log('Form data: ', getFormData);

    if (getFormData) {

      this.setState({
        error: null,
        loading: true,
      });

      const email = getFormData.email;
      const password = getFormData.password;
      const username = getFormData.username;

      firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => {
        //console.log(user);
        //console.log(user.uid);
        let uid;
        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            console.log(user.uid);
            uid = user.uid;

            let input = {
              username: username,
              uid: uid,
            }

            console.log(input);

            const signUpURL = `${LOCAL_HOST_URL}/users`;

            fetch(signUpURL, {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(input),
            })
            .then((response) => {
              console.log('API response: ');
              console.log(response);

              if (response.status === 200) {
                console.log('API status 200:');

                const parsedResponse = JSON.parse(response._bodyText);

                console.log('parsedResponse:');
                console.log(parsedResponse);

                onSignIn(parsedResponse).then((res) => {
                if (res === true) {
                  console.log("this.props: ", this.props);

                  this.props.screenProps.setSignInState(true);
                  this.props.screenProps.updateAsyncStorage(parsedResponse)
                  this.props.screenProps.setWelcomeModal(true);
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

          } else {
            console.log("User not signed in");
          }
        });



      })
      .catch((error) => {
        //problem with firebase sign up
        let errorCode = error.code;
        let errorMessage = error.message;
        console.log(errorMessage);
        this.onLoginFail(error);
      })
    } else {
      console.log("getFormData is false; this should never happen though");
    }
  }

  render() {
    const { navigate } = this.props.navigation;

    let error = null;

    if (this.state.error) {
      let errorMessage = this.state.error;

      if (errorMessage.constructor === Object) {
        for(key in errorMessage) {
          errorMessage = `${key}: ${errorMessage[key]}`
        }
      }

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
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    paddingRight: 20,
    paddingLeft: 20,
    paddingTop: 13,
    paddingBottom: 13,
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
