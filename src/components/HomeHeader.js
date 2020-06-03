import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {SmallPalm, HeaderLogo, WhiteBestTour} from '../assets/images';
import * as Scaled from '../utilities/scaled';

function HomeHeader(props) {
  return (
    <View style={styles.container}>
      <WhiteBestTour />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    left: Scaled.width(103),
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default HomeHeader;
