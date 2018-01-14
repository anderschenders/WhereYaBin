import React from 'react';
import { Button } from 'react-native';
import { StackNavigator,  TabNavigator } from "react-navigation";
import { Icon } from 'react-native-elements';

import SignUpScreen from "./src/screens/SignUpScreen";
import SignInScreen from "./src/screens/SignInScreen";
import ProfileScreen from './src/screens/ProfileScreen';
import CommunityScreen from './src/screens/CommunityScreen';
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
});

export const SignedIn = TabNavigator({

  App: {
    screen: App,
    navigationOptions: {
      tabBarLabel: "Map",
      tabBarIcon: ({ tintColor }) => <Icon name="map" size={35} color={tintColor} />
    }
  },

  ProfileScreen: {
    screen: ProfileScreen,
    navigationOptions: {
      tabBarLabel: "Profile", //account-circle
      tabBarIcon: ({ tintColor }) => <Icon name="face" size={35} color={tintColor} />
    }
  },

  CommunityScreen: {
    screen: CommunityScreen,
    navigationOptions: {
      tabBarLabel: "Community",
      tabBarIcon: ({ tintColor }) => <Icon name="group-work" size={35} color={tintColor} />
    }
  },
});
