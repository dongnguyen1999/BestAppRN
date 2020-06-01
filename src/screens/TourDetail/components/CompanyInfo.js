/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import theme from '../../../themes/default';
import {OutlinePhone, OutlineMail} from '../../../assets/images';
import AutoScrolling from 'react-native-auto-scrolling';
import * as Scaled from '../../../utilities/scaled';

function CompanyInfo(props) {
  const {name, address, mail, phone} = props;
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Công ty cung cấp</Text>
      <AutoScrolling style={styles.name}>
        <Text style={styles.name} numberOfLines={1}>
          {name}
        </Text>
      </AutoScrolling>

      <Text style={styles.address} numberOfLines={2}>
        {address}
      </Text>
      <View style={styles.contact}>
        <OutlinePhone width={Scaled.height(12)} height={Scaled.height(12)} />
        <Text style={styles.contactText}>{phone}</Text>
        <OutlineMail width={Scaled.height(12)} height={Scaled.height(12)} />
        <Text style={[styles.contactText, {marginRight: 0}]} numberOfLines={1}>
          {mail}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: Scaled.height(108),
    backgroundColor: theme.darkElementColor,
    borderRadius: Scaled.fontSize(12),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: Scaled.width(20),
    paddingRight: Scaled.width(20),
    marginTop: Scaled.height(9),
  },
  header: {
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: Scaled.fontSize(12),
    lineHeight: Scaled.height(20),
    // marginTop: -Scaled.height(15),
    color: theme.lightElementColor,
  },
  name: {
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: Scaled.fontSize(15),
    lineHeight: Scaled.height(20),
    textTransform: 'uppercase',
    color: theme.fontColor,
    marginTop: -Scaled.height(3),
  },
  address: {
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '300',
    fontSize: Scaled.fontSize(12),
    lineHeight: Scaled.height(14),
    color: theme.fontColor,
  },
  contact: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: Scaled.fontSize(12),
    lineHeight: Scaled.height(14),
    marginLeft: Scaled.width(8),
    marginRight: Scaled.width(29),
    color: theme.lightElementColor,
  },
});

export default CompanyInfo;
