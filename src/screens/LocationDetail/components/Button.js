import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import theme from '../../../themes/default';
import * as Scaled from '../../../utilities/scaled';

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
    marginLeft: Scaled.width(8),
    marginRight: Scaled.width(8),
  },
  activeButton: {
    borderBottomWidth: Scaled.width(2),
    borderBottomColor: theme.lightElementColor,
  },
  buttonText: {
    textAlign: 'center',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: Scaled.fontSize(14),
    lineHeight: Scaled.height(24),
    color: theme.fontButtonTabs,
  },
  activeButtonText: {
    color: theme.lightElementColor,
  },
});

export default Button;
