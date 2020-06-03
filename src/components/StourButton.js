import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import theme from '../themes/default';
import * as Scaled from '../utilities/scaled';

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
    borderWidth: Scaled.width(1),
    borderColor: theme.lightElementColor,
    borderRadius: Scaled.fontSize(3),
    height: Scaled.height(40),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: theme.fontFamily,
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: Scaled.fontSize(14),
    lineHeight: Scaled.height(24),
    color: '#F2F2F2',
  },
});

export default StourButton;
