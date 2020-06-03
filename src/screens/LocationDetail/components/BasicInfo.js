import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import theme from '../../../themes/default';
import {Star, HalfStar} from '../../../assets/images';
import * as Scaled from '../../../utilities/scaled';

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
      <Text style={styles.textName} numberOfLines={1}>
        {name}
      </Text>
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
    height: Scaled.height(109),
    backgroundColor: theme.darkBackground,
    paddingTop: Scaled.height(12),
    paddingLeft: Scaled.width(24),
    paddingRight: Scaled.width(24),
  },
  textName: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: Scaled.fontSize(20),
    lineHeight: Scaled.height(32),
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
    fontSize: Scaled.fontSize(14),
    lineHeight: Scaled.height(32),
    color: theme.ratingColor,
  },
  ratingStars: {
    marginLeft: Scaled.width(10),
    marginRight: Scaled.width(10),
    display: 'flex',
    flexDirection: 'row',
  },
  textRating: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: Scaled.fontSize(14),
    lineHeight: Scaled.height(20),
    color: theme.fontColor,
  },
  address: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: Scaled.fontSize(12),
    lineHeight: Scaled.height(20),
    color: theme.fontColor,
  },
});

export default BasicInfo;
