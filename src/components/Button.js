import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Button = ({ onPress, children }) => {
  const { buttonStyle, textStyle } = styles;

  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle}>
      <Text style={textStyle}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const styles = {
  textStyle: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10,
  },
  buttonStyle: {
    flex: 1, //button to expand as much content as it can
    alignSelf: 'stretch', //element position itself to fill the limits of the container
    backgroundColor: '#397af8',
    // borderRadius: 5,
    // borderWidth: 1,
    // borderColor: '#007aff',
    // marginLeft: 5,
    // marginRight: 5,
    // fontSize: 8,
  }
}

export default Button;
