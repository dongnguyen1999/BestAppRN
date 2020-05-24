import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import theme from '../../../themes/default';

function CompanyInfo(props) {
  const {data} = props;
  return data ? (
    <View style={styles.container}>
      <Text style={styles.textName}>Contact us:</Text>
      <Text style={styles.textName} numberOfLines={1}>
        {data.name}
      </Text>
      <Text style={styles.address} numberOfLines={1}>
        {data.address}
      </Text>
      <Text style={styles.time}>{`* Email: ${data.mail}`}</Text>
      <Text style={styles.time}>{`* Sdt: ${data.phone}`}</Text>
    </View>
  ) : (
    []
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: RFValue(120),
    backgroundColor: theme.darkBackground,
    paddingTop: RFValue(12),
    paddingLeft: RFValue(24),
    paddingRight: RFValue(24),
  },
  textName: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: RFValue(15),
    lineHeight: RFValue(20),
    color: theme.fontColor,
  },
  time: {
    paddingLeft: RFValue(30),
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: RFValue(14),
    lineHeight: RFValue(20),
    color: theme.lightElementColor,
  },
  address: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: RFValue(12),
    lineHeight: RFValue(20),
    color: theme.fontColor,
  },
});

export default CompanyInfo;
