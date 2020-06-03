import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import theme from '../../../themes/default';
import * as Scaled from '../../../utilities/scaled';

function Suggestion(props) {
  const {message, action, onAction} = props;
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message + ' '}</Text>
      <TouchableOpacity activeOpacity={0.5} onPress={onAction}>
        <Text style={styles.link}>{action}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: Scaled.height(567),
    display: 'flex',
    flexDirection: 'row',
  },
  text: {
    fontFamily: theme.fontFamily,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: Scaled.fontSize(13),
    lineHeight: Scaled.height(24),
    color: 'white',
  },
  link: {
    fontFamily: theme.fontFamily,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: Scaled.fontSize(13),
    lineHeight: Scaled.height(24),
    color: theme.lightElementColor,
  },
});

export default Suggestion;
