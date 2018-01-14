import React from 'react';
import { Text, View } from 'react-native';

const CommunityHeader = (props) => {
  const { viewStyle, headerTextStyle, textStyle } = styles;

  console.log('In CommunityHeader, return()');
  console.log(props);

  return (

    <View style={viewStyle}>
      <Text style={ headerTextStyle }>{ props.headerText }</Text>
    </View>
  );
};

const styles = {
  viewStyle: {
    backgroundColor: '#ebf0f0',
    justifyContent: 'center',
    alignItems: 'center',
    height:100,
    paddingTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
    position: 'relative'
  },
  headerTextStyle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 8,
  },
};

export default CommunityHeader;
