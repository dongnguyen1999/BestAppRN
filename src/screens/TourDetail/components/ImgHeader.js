/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {
  TourDetailHeader,
  Watch,
  TravelPlan,
  TourDetailDot,
  tourDetailHeader,
} from '../../../assets/images';
import theme from '../../../themes/default';
import {Image} from 'react-native';

function ImgHeader(props) {
  function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
  }
  const {name, nbDay, nbNight, nbPlaces, price} = props;
  return (
    <View style={styles.container}>
      <Image source={tourDetailHeader} style={styles.imgHeader} />
      <View style={styles.contentView}>
        <Text style={styles.tourName}>{name}</Text>
        <View style={styles.infoContainer}>
          <Watch width={RFValue(11)} height={RFValue(11)} />
          <Text style={styles.middleText}>
            {nbDay} ngày {nbNight} đêm
          </Text>
          <TourDetailDot width={RFValue(3)} height={RFValue(3)} />
          <View style={{height: '100%', width: RFValue(13)}} />
          <TravelPlan width={RFValue(11)} height={RFValue(11)} />
          <Text style={styles.middleText}>{nbPlaces} địa điểm</Text>
        </View>
        <Text style={styles.price}>Giá {formatNumber(price)} vnđ</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: RFValue(103),
    borderRadius: RFValue(12),
    marginTop: RFValue(12),
  },
  contentView: {
    height: RFValue(103),
    position: 'absolute',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgHeader: {
    width: '100%',
    height: RFValue(103),
    borderRadius: RFValue(12),
  },
  tourName: {
    flex: 1,
    textAlignVertical: 'center',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: RFValue(22),
    lineHeight: RFValue(24),
    color: 'white',
    marginTop: RFValue(10),
  },
  price: {
    flex: 1,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: RFValue(16),
    lineHeight: RFValue(20),
    color: theme.fontColor,
  },
  infoContainer: {
    flex: 1,
    textAlignVertical: 'center',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  middleText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: RFValue(12),
    lineHeight: RFValue(20),
    color: theme.fontColor,
    marginLeft: RFValue(8),
    marginRight: RFValue(13),
  },
});

export default ImgHeader;
