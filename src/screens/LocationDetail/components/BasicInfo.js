import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import theme from '../../../themes/default';
import {Star, HalfStar} from '../../../assets/images';

function BasicInfo(props) {
  function renderStars(nbStars) {
    let stars = Math.floor(parseFloat(nbStars));
    let views = [];
    for (let i = 0; i < stars; i++) {
      views.push(<Star />);
    }
    if (nbStars % stars) {
      views.push(<HalfStar />);
    }
    return views;
  }
  const {name, rating, nbReviews, address} = props;
  return (
    <View style={styles.container}>
      <Text style={styles.textName}>{name}</Text>
      <View style={styles.ratingContainer}>
        <Text style={styles.ratingNum}>{rating.toFixed(1)}</Text>
        <View style={styles.ratingStars}>{renderStars(rating)}</View>
        <Text style={styles.textRating}>{`${nbReviews} đánh giá`}</Text>
      </View>
      <Text style={styles.address} numberOfLines={1}>
        {address}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: RFValue(109),
    backgroundColor: theme.darkBackground,
    paddingTop: RFValue(12),
    paddingLeft: RFValue(24),
    paddingRight: RFValue(24),
  },
  textName: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: RFValue(20),
    lineHeight: RFValue(32),
    color: theme.fontColor,
  },
  ratingContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingNum: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: RFValue(14),
    lineHeight: RFValue(32),
    color: theme.ratingColor,
  },
  ratingStars: {
    marginLeft: RFValue(10),
    marginRight: RFValue(10),
    display: 'flex',
    flexDirection: 'row',
  },
  textRating: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: RFValue(14),
    lineHeight: RFValue(20),
    color: theme.fontColor,
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

export default BasicInfo;
