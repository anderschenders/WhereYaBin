import React from 'react';
import { Button } from 'react-native';
import { StackNavigator,  TabNavigator } from "react-navigation";

import SignUpScreen from "./src/screens/SignUpScreen";
import SignInScreen from "./src/screens/SignInScreen";
import ProfileScreen from './src/screens/ProfileScreen';
import App from './App';

export const MainNavigator = StackNavigator({

  SignInScreen: {
    screen: SignInScreen,
    navigationOptions: {
      title: "Sign In"
    }
  },

  SignUpScreen: {
    screen: SignUpScreen,
    navigationOptions: {
      title: "Sign Up"
    }
  },

  App: {
    screen: App,
    navigationOptions: ({ navigation }) => {
      return {
        title: "Where Ya, Bin?",
        headerLeft: <Button title="Profile" onPress={() => navigation.navigate('ProfileScreen')}/>,
      }
    }
  },

  ProfileScreen: {
    screen: ProfileScreen,
    navigationOptions: ({ navigation }) => {
      return {
        title: 'My Profile',
        headerLeft: <Button title="Map" onPress={() => navigation.navigate('App')}/>,
      }
    }
  },
});

//TODO: below doesn't work... how to navigate to this TabNavigator from SignInScreen?
export const SignedIn = TabNavigator({

  App: {
    screen: App,
    navigationOptions: {
      tabBarLabel: "Map",
      // tabBarIcon: ({ tintColor }) =>
      //   <FontAwesome name="home" size={30} color={tintColor} />
    }
  },

  ProfileScreen: {
    screen: ProfileScreen,
    navigationOptions: {
      tabBarLabel: "My Profile",
      // tabBarIcon: ({ tintColor }) =>
      //   <FontAwesome name="user" size={30} color={tintColor} />
      // tabBarIcon: ({ tintColor }) => <Icon name="account-circle" size={35} color={tintColor} />
    }
  },
});
