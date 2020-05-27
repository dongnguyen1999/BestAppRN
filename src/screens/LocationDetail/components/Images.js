/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import theme from '../../../themes/default';
import {Image} from 'react-native';
import {minhthuImg, minhthu1Img, minhthu2Img} from '../../../assets/images';
import {RFValue} from 'react-native-responsive-fontsize';
import RefImage from '../../../components/RefImage';

function Images(props) {
  const {photos} = props;
  function renderPhotos() {
    let views = [];
    for (let i = 0; i < photos.length; i += 3) {
      views.push(
        <View style={styles.rows}>
          <RefImage
            wrapperStyle={styles.imgWrapper}
            imgStyle={styles.img}
            imgRef={photos[i]}
          />
          {i + 1 < photos.length ? (
            <RefImage
              wrapperStyle={styles.imgWrapper}
              imgStyle={styles.img}
              imgRef={photos[i + 1]}
            />
          ) : (
            <View style={{flex: 1}} />
          )}
          {i + 2 < photos.length ? (
            <RefImage
              wrapperStyle={styles.imgWrapper}
              imgStyle={styles.img}
              imgRef={photos[i + 2]}
            />
          ) : (
            <View style={{flex: 1}} />
          )}
        </View>,
      );
    }
    return views;
  }
  return (
    <View style={styles.container}>
      <ScrollView>{renderPhotos()}</ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.pageColor,
  },
  rows: {
    display: 'flex',
    flexDirection: 'row',
  },
  imgWrapper: {
    flex: 1,
    height: RFValue(120),
    padding: RFValue(2),
  },
  img: {
    width: '100%',
    height: '100%',
  },
});

export default Images;
