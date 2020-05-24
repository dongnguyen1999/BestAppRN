import React, {Component} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import Swiper from 'react-native-swiper';
import {RFValue} from 'react-native-responsive-fontsize';
import theme from '../../../themes/default';
import {Dot, ActiveDot, defaultFoodImg} from '../../../assets/images';
import RefImage from '../../../components/RefImage';

function ImageSlideshow(props) {
  function renderImages() {
    const {imgList} = props;
    const MAX_NB_IMAGE = 5;
    return imgList.length !== 0 ? (
      imgList
        .filter((imgRef, index) => index < MAX_NB_IMAGE)
        .map(imgRef => {
          return <RefImage imgRef={imgRef} />;
        })
    ) : (
      <View style={styles.wrapper}>
        <Image source={defaultFoodImg} style={styles.imgSlide} />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Swiper
        style={styles.wrapper}
        paginationStyle={styles.paginationStyle}
        dot={
          <View style={styles.dot}>
            <Dot width={RFValue(5)} height={RFValue(5)} />
          </View>
        }
        activeDot={
          <View style={styles.dot}>
            <ActiveDot width={RFValue(7)} height={RFValue(7)} />
          </View>
        }>
        {renderImages()}
      </Swiper>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: RFValue(240),
    backgroundColor: theme.pageColor,
  },
  paginationStyle: {
    marginBottom: -RFValue(16),
  },
  dot: {
    marginLeft: RFValue(4),
    marginRight: RFValue(4),
  },
  wrapper: {
    alignItems: 'center',
  },
  imgSlide: {
    width: '100%',
    height: RFValue(240),
    aspectRatio: 1,
  },
});

export default ImageSlideshow;
