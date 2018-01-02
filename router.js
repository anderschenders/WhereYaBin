import { StackNavigator } from "react-navigation";

import SignUpScreen from "./src/screens/SignUpScreen";
import SignInScreen from "./src/screens/SignInScreen";
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
    navigationOptions: {
      title: "Where Ya, Bin?"
    }
  },

});
