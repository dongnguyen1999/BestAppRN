import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';
import fetchPhotosGgApi from '../api/fetchPhotosGgApi';
import {defaultFoodImg} from '../assets/images';
import {StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';

class RefImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgSrc: defaultFoodImg,
    };
  }

  componentDidMount() {
    const {imgRef} = this.props;
    if (imgRef) {
      fetchPhotosGgApi(imgRef, 400)
        .then(response =>
          this.setState({imgSrc: {uri: response.request.responseURL}}),
        )
        .catch(error => {});
    }
  }

  render() {
    const {wrapperStyle, imgStyle} = this.props;
    return (
      <View style={[styles.wrapper, wrapperStyle]}>
        <Image source={this.state.imgSrc} style={[styles.imgSlide, imgStyle]} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
  },
  imgSlide: {
    width: '100%',
    height: RFValue(240),
    aspectRatio: 1,
  },
});

export default RefImage;
