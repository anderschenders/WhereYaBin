import { AsyncStorage } from "react-native";

export const onSignIn = (userID) => {
  console.log('@@@@@@@@ In auth.js, onSignIn function @@@@@@@@@');

  return new Promise((resolve, reject) => {
    AsyncStorage.setItem("USER_KEY", JSON.stringify(userID))
      .then(res => {
        console.log("In onSignIn promise, res: ");
        console.log(res); //res = null?
        resolve(true);
      })
      .catch(err => reject(err));
    });
}

export const onSignOut = () => AsyncStorage.removeItem("USER_KEY");

export const isSignedIn = () => {
  console.log('@@@@@@ In auth.js, isSignedIn function @@@@@@@');

  return new Promise((resolve, reject) => {
    AsyncStorage.getItem("USER_KEY")
      .then(res => {
        if ( Boolean(res) ) {
          console.log('There is a valid res: ');
          console.log(res);
          resolve(true);
        } else {
          console.log('There is not a valid res: ');
          console.log(res);
          resolve(false);
        }
      })
      .catch(err => reject(err));
  });
};
