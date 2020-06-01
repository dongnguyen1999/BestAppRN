import React, {Component} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import Swiper from 'react-native-swiper';
import theme from '../../../themes/default';
import {Dot, ActiveDot, defaultFoodImg} from '../../../assets/images';
import RefImage from '../../../components/RefImage';
import * as Scaled from '../../../utilities/scaled';

function ImageSlideshow(props) {
  function renderImages() {
    const {imgList} = props;
    const MAX_NB_IMAGE = 5;
    return imgList.length !== 0 ? (
      imgList
        .filter((imgRef, index) => index < MAX_NB_IMAGE)
        .map(imgRef => {
          return (
            <RefImage
              imgRef={imgRef}
              wrapperStyle={styles.wrapper}
              imgStyle={styles.imgSlide}
            />
          );
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
            <Dot width={Scaled.height(5)} height={Scaled.height(5)} />
          </View>
        }
        activeDot={
          <View style={styles.dot}>
            <ActiveDot width={Scaled.height(7)} height={Scaled.height(7)} />
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
    height: Scaled.height(240),
    backgroundColor: theme.pageColor,
  },
  paginationStyle: {
    marginBottom: -Scaled.height(16),
  },
  dot: {
    marginLeft: Scaled.width(4),
    marginRight: Scaled.width(4),
  },
  wrapper: {
    // alignItems: 'center',
  },
  imgSlide: {
    width: '100%',
    height: Scaled.height(240),
    // aspectRatio: 8 / 6,
  },
});

export default ImageSlideshow;
