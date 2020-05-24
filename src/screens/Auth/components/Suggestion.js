import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import theme from '../../../themes/default';

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
    top: RFValue(600),
    display: 'flex',
    flexDirection: 'row',
  },
  text: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: RFValue(13),
    lineHeight: RFValue(24),
    color: 'white',
  },
  link: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: RFValue(13),
    lineHeight: RFValue(24),
    color: theme.lightElementColor,
  },
});

export default Suggestion;
