import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import theme from '../../../themes/default';
import FunctionOptionsBar from './FunctionOptionsBar';
import {RFValue} from 'react-native-responsive-fontsize';

function Information(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>
        Đang mở trong Google Map Vui lòng đợi...
      </Text>
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
    fontSize: RFValue(16),
    lineHeight: RFValue(19),
    color: theme.fontButtonTabs,
    width: RFValue(196),
    textAlign: 'center',
  },
});

export default Information;
