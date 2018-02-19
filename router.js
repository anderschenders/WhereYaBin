import React from 'react';
import { Button } from 'react-native';
import { StackNavigator,  TabNavigator } from "react-navigation";
import { Icon } from 'react-native-elements';

import LoginScreen from "./src/screens/LoginScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import SignInScreen from "./src/screens/SignInScreen";
import ProfileScreen from './src/screens/ProfileScreen';
import CommunityScreen from './src/screens/CommunityScreen';
import AddBinScreen from './src/screens/AddBinScreen';
import App from './src/screens/App';

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

export const MapNavigator = StackNavigator({

  App: {
    screen: App,
    navigationOptions: {
      // title: "Map",
      tabBarLabel: "Map",
      // header: null,
    }
  },

  AddBinScreen: {
    screen: AddBinScreen,
    navigationOptions: {
      // title: "Add Bin",
      tabBarLabel: "Add Bin",
      // header: null,
    }
  },
})

export const ProfileScreenNavigator = StackNavigator({
  ProfileScreen: {
    screen: ProfileScreen,
    navigationOptions: {
      header: null,
    },
  }
})

export const CommuniyScreenNavigator = StackNavigator({
  CommunityScreen: {
    screen: CommunityScreen,
    navigationOptions: {
      header: null,
    },
  }
})

export const SignedIn = TabNavigator({

  App: {
    screen: MapNavigator,
    navigationOptions: {
      // tabBarLabel: "Map",
      tabBarIcon: ({ tintColor }) => <Icon name="map" size={35} color={tintColor} />
    }
  },

  ProfileScreen: {
    screen: ProfileScreenNavigator,
    navigationOptions: {
      tabBarLabel: "Profile", //account-circle
      tabBarIcon: ({ tintColor }) => <Icon name="face" size={35} color={tintColor} />
    }
  },

  CommunityScreen: {
    screen: CommuniyScreenNavigator,
    navigationOptions: {
      tabBarLabel: "Community",
      tabBarIcon: ({ tintColor }) => <Icon name="group-work" size={35} color={tintColor} />
    }
  },
});
