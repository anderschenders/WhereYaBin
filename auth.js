import { AsyncStorage } from "react-native";

// export const USER_KEY = "Signed_in";

export const onSignIn = () => {
  // console.log('In onSignIn function:');
  // AsyncStorage.setItem("USER_KEY", "true");
  // console.log('Check USER_KEY value (should be true): ');

  return new Promise((resolve, reject) => {
    AsyncStorage.setItem("USER_KEY", "true")
      .then(res => {
        console.log("onSignIn promise: ");
        console.log(res);
        resolve(true);
      })
      //   if ( Boolean(res) ) {
      //     console.log('res !== null, in auth.js:');
      //     console.log(res);
      //     resolve(true);
      //   } else {
      //     console.log('RES in auth.js:');
      //     console.log(res);
      //     resolve(false);
      //   }
      // })
      .catch(err => reject(err));
    });
  // AsyncStorage.getItem("USER_KEY").then((value) => {
  //   if (value === "true") {
  //     resolve(true);
  //   } else {
  //     resolve(false);
  //   }
  // });
}

export const onSignOut = () => AsyncStorage.removeItem("USER_KEY");

export const isSignedIn = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem("USER_KEY")

    // console.log('@@@@@@@ Res value? @@@@@@@');
    // AsyncStorage.getItem("USER_KEY").then((value) => console.log(value))

      .then(res => {
        if ( Boolean(res) ) {
          console.log('res !== null, in auth.js:');
          console.log(res);
          resolve(true);
        } else {
          console.log('RES in auth.js:');
          console.log(res);
          resolve(false);
        }
      })
      .catch(err => reject(err));
  });
};
