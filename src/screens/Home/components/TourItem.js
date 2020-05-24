import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {minhthuImg, defaultFoodImg} from '../../../assets/images';
import theme from '../../../themes/default';
import fetchPhotosGgApi from '../../../api/fetchPhotosGgApi';
import {googleApiKey} from '../../../constants/apiKey';
import {
  getDistanceFrom2Locations,
  convertMeter,
} from '../../../utilities/computeDistance';
import fetchLocationDetail from '../../../api/fetchLocationDetail';
import {resolveDetail} from '../../../utilities/resolveDetail';
import fetchPlacesUseTourId from '../../../api/fetchPlacesUseTourId';
import fetchCompanyInfo from '../../../api/fetchCompanyInfo';

function InfoItem(props) {
  const {
    imgRef,
    id,
    name,
    price,
    nbDay,
    nbNight,
    navigation,
    comId,
    locations,
    currentLocation,
  } = props;
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigation.navigate('TourDetail', {
          id: id,
          comId: comId,
          locations: locations,
          tourDetail: {name, price, nbDay, nbNight},
          currentLocation: currentLocation,
        })
      }>
      <View style={styles.leftContainer}>
        <Text style={styles.stLogo}>ST</Text>
      </View>
      <View style={styles.rightContainer}>
        <Text style={styles.nameText}>{name}</Text>
        <Text numberOfLines={1} style={styles.addressText}>
          {`Giá ${price} vnđ`}
        </Text>
        <Text
          style={styles.distanceText}>{`${nbDay} ngày ${nbNight} đêm`}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: RFValue(69),
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: theme.darkElementColor,
    borderRadius: RFValue(5),
    marginBottom: RFValue(4),
  },
  leftContainer: {
    height: RFValue(69),
    width: RFValue(69),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightContainer: {
    flex: 1,
    display: 'flex',
    paddingLeft: RFValue(6),
    paddingRight: RFValue(6),
  },
  img: {
    width: RFValue(63),
    height: RFValue(63),
    borderRadius: RFValue(3),
  },
  stLogo: {
    width: RFValue(63),
    height: RFValue(63),
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: RFValue(40),
    color: theme.lightElementColor,
    fontWeight: '800',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: RFValue(3),
  },
  nameText: {
    flex: 2,
    // marginTop: RFValue(2),
    // marginBottom: 3,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: RFValue(14),
    lineHeight: RFValue(24),
    color: theme.lightElementColor,
  },
  addressText: {
    flex: 3,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: RFValue(12),
    lineHeight: RFValue(20),
    color: theme.fontColor,
  },
  distanceText: {
    flex: 2,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: RFValue(10),
    lineHeight: RFValue(20),
    color: theme.lightElementColor,
    marginBottom: RFValue(2),
  },
});

export default InfoItem;
