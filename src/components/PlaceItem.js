import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {defaultFoodImg} from '../assets/images';
import theme from '../themes/default';
import fetchPhotosGgApi from '../api/fetchPhotosGgApi';
import {convertMeter} from '../utilities/computeDistance';

class PlaceItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgSrc: defaultFoodImg,
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
    } = this.props;
    return (
      <TouchableOpacity
        style={styles.container}
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
          <Text style={styles.nameText}>{name}</Text>
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
    );
  }
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

export default PlaceItem;
