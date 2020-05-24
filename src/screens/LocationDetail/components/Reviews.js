import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import theme from '../../../themes/default';

function Reviews(props) {
  return (
    <View style={styles.container}>
      <Text style={{color: theme.fontColor}}> Reviews </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.pageColor,
  },
});

export default Reviews;
