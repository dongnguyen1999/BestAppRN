import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {defaultFoodImg} from '../assets/images';
import fetchAllDetail from '../api/fetchAllDetail';
import fetchPhotosGgApi from '../api/fetchPhotosGgApi';
import RefImage from '../components/RefImage';

class TourImgsPane extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgRefs: undefined,
    };
  }

  componentDidMount() {
    const {placeIds} = this.props;
    const maxNbImgs = 3;
    if (placeIds) {
      let the3Ids = placeIds.filter((placeId, index) => index < 3);
      this.fetchImgs(the3Ids);
    }
  }

  fetchImgs = async placeIds => {
    let photos = await fetchAllDetail(placeIds).then(rps =>
      Promise.all(
        rps.map(rp => {
          if (rp.photos) {
            return rp.photos[0].photo_reference;
          }
          return undefined;
        }),
      ),
    );
    this.setState({imgRefs: photos});
    // let photos = [];
    // this.setState({imgRefs: photos});
    // let srcs = [];
    // Promise.all(photos.map(photo => fetchPhotosGgApi(photo, 400))).then(rps =>
    //   Promise.all(
    //     responses.map(rp => srcs.push({uri: rp.request.responseURL})),
    //   ),
    // );
    // this.setState({imgSrcs: srcs});
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.imgRefs ? (
          this.state.imgRefs.map((imgRef, index) => {
            let borderRadius = {};
            if (index == 0) {
              borderRadius = {
                ...borderRadius,
                borderTopLeftRadius: RFValue(3),
                borderBottomLeftRadius: RFValue(3),
              };
            }
            if (index == this.state.imgRefs.length - 1) {
              borderRadius = {
                ...borderRadius,
                borderTopRightRadius: RFValue(3),
                borderBottomRightRadius: RFValue(3),
              };
            }
            return (
              <RefImage
                imgRef={imgRef}
                wrapperStyle={styles.imgView}
                imgStyle={[styles.img, borderRadius]}
              />
            );
          })
        ) : (
          <RefImage
            wrapperStyle={styles.imgView}
            imgStyle={[styles.img, {borderRadius: RFValue(3)}]}
          />
        )}
        {console.log('end')}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: RFValue(8),
    width: '100%',
    height: RFValue(63),
    // backgroundColor: 'blue',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // flexWrap: 'wrap',
  },
  imgView: {
    flex: 1,
    alignItems: 'center',
  },
  img: {
    height: RFValue(63),
    width: '100%',
    aspectRatio: 10 / 6,
  },
});

export default TourImgsPane;
