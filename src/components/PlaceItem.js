import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {defaultFoodImg} from '../assets/images';
import theme from '../themes/default';
import fetchPhotosGgApi from '../api/fetchPhotosGgApi';
import {convertMeter} from '../utilities/computeDistance';
import CheckBox from '@react-native-community/checkbox';
import * as Scaled from '../utilities/scaled';

class PlaceItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgSrc: defaultFoodImg,
      checked: props.checked,
    };
  }

  componentDidMount() {
    this.firstLoadItem();
  }

  firstLoadItem = async () => {
    const {imgRef} = this.props;
    let imgResponse;
    if (imgRef) {
      imgResponse = await fetchPhotosGgApi(imgRef, 100);
      this.setState({imgSrc: {uri: imgResponse.request.responseURL}});
    }
  };

  render() {
    const {
      imgRef,
      name,
      address,
      distance,
      navigation,
      placeId,
      currentLocation,
      detail,
      checkable,
      checkItemCallback,
    } = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.touchableView}
          onPress={() =>
            navigation.navigate('LocationDetail', {
              placeId: placeId,
              detail: detail,
              currentLocation: currentLocation,
            })
          }>
          <View style={styles.leftContainer}>
            <Image style={styles.img} source={this.state.imgSrc} />
          </View>
          <View style={styles.rightContainer}>
            <Text style={styles.nameText} numberOfLines={1}>
              {name}
            </Text>
            <Text numberOfLines={1} style={styles.addressText}>
              {address}
            </Text>
            <Text style={styles.distanceText}>{`Cách bạn ${
              distance < 1
                ? `${Math.round(convertMeter(distance))} m`
                : `${Math.round(distance)} km`
            }`}</Text>
          </View>
        </TouchableOpacity>
        {checkable ? (
          <View style={styles.checkView}>
            <CheckBox
              value={this.state.checked}
              tintColors={{
                true: theme.lightElementColor,
                false: theme.placeholderColor,
              }}
              onValueChange={value => {
                checkItemCallback(placeId, value);
                this.setState({checked: !this.state.checked});
              }}
            />
          </View>
        ) : (
          undefined
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: Scaled.height(69),
    backgroundColor: theme.darkElementColor,
    borderRadius: Scaled.fontSize(5),
    marginBottom: Scaled.height(4),
    display: 'flex',
    flexDirection: 'row',
  },
  touchableView: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
  },
  leftContainer: {
    height: Scaled.height(69),
    width: Scaled.height(69),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightContainer: {
    flex: 1,
    // backgroundColor: 'pink',
    paddingLeft: Scaled.width(6),
    paddingRight: Scaled.width(6),
  },
  img: {
    width: Scaled.height(63),
    height: Scaled.height(63),
    borderRadius: Scaled.fontSize(3),
  },
  nameText: {
    marginTop: Scaled.height(2),
    fontFamily: theme.fontFamily,
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: Scaled.fontSize(14),
    lineHeight: Scaled.height(24),
    color: theme.lightElementColor,
  },
  addressText: {
    // flex: 3,
    marginTop: -Scaled.height(3),
    fontFamily: theme.fontFamily,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: Scaled.fontSize(12),
    lineHeight: Scaled.height(20),
    color: theme.fontColor,
  },
  distanceText: {
    // flex: 2,
    fontFamily: theme.fontFamily,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: Scaled.fontSize(10),
    lineHeight: Scaled.height(20),
    color: theme.lightElementColor,
    marginTop: Scaled.height(6),
    marginBottom: Scaled.height(2),
  },
  checkView: {
    width: Scaled.width(40),
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default PlaceItem;
