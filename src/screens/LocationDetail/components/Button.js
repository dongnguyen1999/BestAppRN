import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import theme from '../../../themes/default';

function Button(props) {
  const {title, isActive, onPress, id} = props;
  return (
    <TouchableOpacity
      onPress={() => onPress(id)}
      style={[styles.button, isActive ? styles.activeButton : undefined]}>
      <Text
        style={[
          styles.buttonText,
          isActive ? styles.activeButtonText : undefined,
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: RFValue(8),
    marginRight: RFValue(8),
  },
  activeButton: {
    borderBottomWidth: RFValue(2),
    borderBottomColor: theme.lightElementColor,
  },
  buttonText: {
    textAlign: 'center',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: RFValue(14),
    lineHeight: RFValue(24),
    color: theme.fontButtonTabs,
  },
  activeButtonText: {
    color: theme.lightElementColor,
  },
});

export default Button;
