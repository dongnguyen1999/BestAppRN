/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
  TourDetailHeader,
  Watch,
  TravelPlan,
  TourDetailDot,
  tourDetailHeader,
} from '../../../assets/images';
import theme from '../../../themes/default';
import {Image} from 'react-native';
import * as Scaled from '../../../utilities/scaled';

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
          <Watch width={Scaled.height(11)} height={Scaled.height(11)} />
          <Text style={styles.middleText}>
            {nbDay} ngày {nbNight} đêm
          </Text>
          <TourDetailDot width={Scaled.height(3)} height={Scaled.height(3)} />
          <View style={{height: '100%', width: Scaled.width(13)}} />
          <TravelPlan width={Scaled.height(11)} height={Scaled.height(11)} />
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
    height: Scaled.height(103),
    borderRadius: Scaled.fontSize(12),
    marginTop: Scaled.height(12),
  },
  contentView: {
    height: Scaled.height(103),
    position: 'absolute',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgHeader: {
    width: '100%',
    height: Scaled.height(103),
    borderRadius: Scaled.fontSize(12),
  },
  tourName: {
    flex: 1,
    textAlignVertical: 'center',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: Scaled.fontSize(22),
    lineHeight: Scaled.height(24),
    color: 'white',
    marginTop: Scaled.height(10),
  },
  price: {
    flex: 1,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: Scaled.fontSize(16),
    lineHeight: Scaled.height(20),
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
    fontSize: Scaled.fontSize(12),
    lineHeight: Scaled.height(20),
    color: theme.fontColor,
    marginLeft: Scaled.width(8),
    marginRight: Scaled.width(13),
  },
});

export default ImgHeader;
