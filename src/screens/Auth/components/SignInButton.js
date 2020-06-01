import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import theme from '../../../themes/default';
import * as Scaled from '../../../utilities/scaled';

function SignInButton(props) {
  const {title, onPress} = props;
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={styles.container}
      onPress={onPress}>
      <View style={styles.buttonContent}>
        {props.children}
        <Text style={styles.text}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContent: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: Scaled.width(160),
    height: Scaled.height(44),
    backgroundColor: theme.darkElementColor,
  },
  text: {
    paddingLeft: Scaled.width(5),
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: Scaled.fontSize(13),
    lineHeight: Scaled.height(24),
    color: theme.lightElementColor,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
});

export default SignInButton;
