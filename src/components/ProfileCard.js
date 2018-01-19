import React from 'react';
import { View, Image } from 'react-native';

const ProfileCard = (props) => {

  const earthIcon = require('../images/earth_icon.png');
  const starIcon = require('../images/star.png');

  return (
    <View style={styles.containerStyle}>
      {props.children}
    </View>
  );
};

const styles = {
  containerStyle: {
    // borderWidth: 1,
    // flexDirection: 'row',
    borderRadius: 2,
    borderColor: "#ebf0f0",
    borderBottomWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    backgroundColor: '#ebf0f0',
    // marginLeft: 1,
    // marginRight: 1,
    // marginTop: 1
  },
  // imageStyle: {
  //   marginTop: 5,
  //   marginBottom: 5,
  //   marginLeft: 10,
  //   marginRight: 10,
  //   height: 33,
  //   width: 33,
  // },
};

// <Image
//   style={ styles.imageStyle }
//   source={ starIcon }
// />

export default ProfileCard;
