import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {SmallPalm, HeaderLogo} from '../assets/images';
import * as Scaled from '../utilities/scaled';

function HomeHeader(props) {
  return (
    <View style={styles.container}>
      <View style={{marginBottom: Scaled.height(4)}}>
        <SmallPalm width={Scaled.width(25)} height={Scaled.width(25)} />
      </View>
      <View style={{marginLeft: Scaled.width(5)}}>
        <HeaderLogo width={Scaled.width(103)} height={Scaled.width(18)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    left: Scaled.width(110),
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default HomeHeader;
