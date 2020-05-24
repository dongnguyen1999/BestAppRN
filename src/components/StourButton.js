import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import theme from '../themes/default';

function StourButton(props) {
  const {title, onPress, style, titleStyle} = props;
  return (
    <TouchableOpacity
      style={[styles.button, style]}
      activeOpacity={0.5}
      onPress={onPress}>
      <Text style={[styles.text, titleStyle]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.lightBackground,
    borderWidth: RFValue(1),
    borderColor: theme.lightElementColor,
    borderRadius: RFValue(3),
    height: RFValue(40),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: RFValue(14),
    lineHeight: RFValue(24),
    color: '#F2F2F2',
  },
});

export default StourButton;
