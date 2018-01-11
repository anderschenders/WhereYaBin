import React from 'react';
import { View } from 'react-native';

const ProfileCard = (props) => {
  return (
    <View style={styles.containerStyle}>
      {props.children}
    </View>
  );
};

const styles = {
  containerStyle: {
    // borderWidth: 1,
    borderRadius: 2,
    borderColor: "#e4ebeb",
    borderBottomWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    backgroundColor: '#e4ebeb',
    // marginLeft: 1,
    // marginRight: 1,
    // marginTop: 1
  }
};

export default ProfileCard;
