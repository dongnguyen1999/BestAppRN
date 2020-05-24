import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import theme from '../../../themes/default';
import {Star, HalfStar} from '../../../assets/images';

function TourInfo(props) {
  const {name, nbDay, nbNight, price} = props;
  return (
    <View style={styles.container}>
      <Text style={styles.textName} numberOfLines={2}>
        {name}
      </Text>
      <Text style={styles.price}>{`Giá tiền: ${price} vnđ`}</Text>
      <Text
        style={styles.time}>{`Thời gian: ${nbDay} ngày ${nbNight} đêm`}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: RFValue(115),
    backgroundColor: theme.darkBackground,
    paddingTop: RFValue(12),
    paddingLeft: RFValue(24),
    paddingRight: RFValue(24),
  },
  textName: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: RFValue(24),
    lineHeight: RFValue(32),
    color: theme.fontColor,
  },
  price: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: RFValue(14),
    lineHeight: RFValue(20),
    color: theme.ratingColor,
  },
  time: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: RFValue(14),
    lineHeight: RFValue(20),
    color: theme.lightElementColor,
  },
});

export default TourInfo;
