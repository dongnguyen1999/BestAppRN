import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import theme from '../../../themes/default';
import FunctionOptionsBar from './FunctionOptionsBar';
import * as Scaled from '../../../utilities/scaled';

function Information(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>Đang mở trong Google Map</Text>
      <Text style={styles.message}>Vui lòng đợi...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.pageColor,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: Scaled.fontSize(16),
    lineHeight: Scaled.height(19),
    color: theme.fontButtonTabs,
    width: Scaled.width(196),
    textAlign: 'center',
  },
});

export default Information;
