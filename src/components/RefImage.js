import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';
import fetchPhotosGgApi from '../api/fetchPhotosGgApi';
import {defaultFoodImg} from '../assets/images';
import {StyleSheet} from 'react-native';
import * as Scaled from '../utilities/scaled';

class RefImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgSrc: defaultFoodImg,
    };
  }

  componentDidMount() {
    const {imgRef} = this.props;
    // console.log(imgRef);
    if (imgRef) {
      fetchPhotosGgApi(imgRef, 400)
        .then(response =>
          this.setState({imgSrc: {uri: response.request.responseURL}}),
        )
        .catch(error => {});
    }
  }

  render() {
    // console.log(this.state.imgSrc);
    const {wrapperStyle, imgStyle} = this.props;
    return (
      <View style={wrapperStyle ? wrapperStyle : styles.wrapper}>
        <Image
          source={this.state.imgSrc}
          style={imgStyle ? imgStyle : styles.imgSlide}
        />
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
    height: Scaled.height(240),
    aspectRatio: 1,
  },
});

export default RefImage;
