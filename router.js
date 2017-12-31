import { StackNavigator } from "react-navigation";

import SignUpScreen from "./src/screens/SignUpScreen";
import SignInScreen from "./src/screens/SignInScreen";

export const MainNavigator = StackNavigator({
  SignUpScreen: {
    screen: SignUpScreen,
    navigationOptions: {
      title: "Sign Up"
    }
  },
  SignUpScreen: {
    screen: SignUpScreen,
    navigationOptions: {
      title: "Sign In"
    }
  }
});
