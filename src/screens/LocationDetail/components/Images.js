import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import theme from '../../../themes/default';

function Images(props) {
  return (
    <View style={styles.container}>
      <Text style={{color: theme.fontColor}}> Images </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.pageColor,
  },
});

export default Images;
