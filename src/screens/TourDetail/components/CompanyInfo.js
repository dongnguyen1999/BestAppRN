/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import theme from '../../../themes/default';
import {OutlinePhone, OutlineMail} from '../../../assets/images';
import AutoScrolling from 'react-native-auto-scrolling';

class CompanyInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {name, address, mail, phone} = this.props;
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
          <OutlinePhone width={RFValue(12)} height={RFValue(12)} />
          <Text style={styles.contactText}>{phone}</Text>
          <OutlineMail width={RFValue(12)} height={RFValue(12)} />
          <Text
            style={[styles.contactText, {marginRight: 0}]}
            numberOfLines={1}>
            {mail}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: RFValue(108),
    backgroundColor: theme.darkElementColor,
    borderRadius: RFValue(12),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: RFValue(20),
    paddingRight: RFValue(20),
    marginTop: RFValue(9),
  },
  header: {
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: RFValue(12),
    lineHeight: RFValue(20),
    // marginTop: -RFValue(15),
    color: theme.lightElementColor,
  },
  name: {
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: RFValue(15),
    lineHeight: RFValue(20),
    textTransform: 'uppercase',
    color: theme.fontColor,
    marginTop: -RFValue(3),
  },
  address: {
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '300',
    fontSize: RFValue(12),
    lineHeight: RFValue(14),
    color: theme.fontColor,
    // marginTop: RFValue(5),
    // marginBottom: RFValue(5),
  },
  contact: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // marginBottom: -RFValue(10),
  },
  contactText: {
    flex: 1,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: RFValue(12),
    lineHeight: RFValue(14),
    marginLeft: RFValue(8),
    marginRight: RFValue(8),
    color: theme.lightElementColor,
  },
});

export default CompanyInfo;
