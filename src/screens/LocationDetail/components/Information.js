import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import theme from '../../../themes/default';
import FunctionOptionsBar from './FunctionOptionsBar';

function Information(props) {
  return (
    <View style={styles.container}>
      <Text style={{color: theme.fontColor}}> Information </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.pageColor,
  },
});

export default Information;
