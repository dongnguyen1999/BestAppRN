import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import FunctionOption from './FunctionOption';
import {Direction, PhoneCall, BlueStar, BlueLink} from '../../../assets/images';
import theme from '../../../themes/default';

function FunctionOptionsBar(props) {
  const {onDirection} = props;
  return (
    <View style={styles.container}>
      <FunctionOption
        icon={<Direction width={RFValue(20)} height={RFValue(20)} />}
        title="DẪN ĐƯỜNG"
        onPress={onDirection}
      />
      <FunctionOption
        icon={<PhoneCall width={RFValue(17)} height={RFValue(17)} />}
        title="GỌI"
      />
      <FunctionOption
        icon={<BlueStar width={RFValue(20)} height={RFValue(20)} />}
        title="LƯU"
      />
      <FunctionOption
        icon={<BlueLink width={RFValue(20)} height={RFValue(20)} />}
        title="WEBSITE"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.pageColor,
    width: '100%',
    height: RFValue(75),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: theme.borderTabs,
    borderWidth: RFValue(1.5),
  },
});

export default FunctionOptionsBar;
