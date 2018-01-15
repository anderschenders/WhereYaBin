import React from 'react';
import { Text, View } from 'react-native';

const Header = (props) => {
  const { viewStyle, headerTextStyle, textStyle } = styles;

  console.log('In Header, props');
  console.log(props);

  return (

    <View style={viewStyle}>
      <Text style={ headerTextStyle }>{ props.headerText }</Text>

      <View>
        <Text style={ textStyle }>
          {'Member since:'} { props.headerSummaryText.memberSince  }
        </Text>

        <Text style={ textStyle }>
          {'Total activity count:'} { props.headerSummaryText.activityCount }
        </Text>

        <Text style={ textStyle }>
          {'Travelled: '} { props.headerSummaryText.distanceTravelled } {'miles'}
        </Text>
      </View>

    </View>
  );
};

const styles = {
  viewStyle: {
    backgroundColor: '#ebf0f0',
    justifyContent: 'center',
    alignItems: 'center',
    height: 150,
    paddingTop: 15,
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
  textStyle: {
    marginTop: 1,
    marginBottom: 1,
    textAlign: 'center',
  },
};

export default Header;
