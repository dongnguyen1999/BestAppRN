/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import fetchLocationDetail from '../../api/fetchLocationDetail';
import {resolveDetail} from '../../utilities/resolveDetail';
import ImageSlideshow from './components/ImageSlideshow';
import getDirections from 'react-native-google-maps-directions';
import BasicInfo from './components/BasicInfo';
import ButtonsBar from './components/ButtonsBar';
import Information from './components/Information';
import Reviews from './components/Reviews';
import Images from './components/Images';
import FunctionOptionsBar from './components/FunctionOptionsBar';

class LocationDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 1,
      name: 'Địa điểm ăn uống',
      rating: 0,
      reviews: [],
      address: 'Địa chỉ',
      location: undefined,
      photos: [],
    };

    this.changeTab = this.changeTab.bind(this);
  }

  changeTab = index => this.setState({activeTab: index});

  handleGetDirections = () => {
    const {navigation} = this.props;
    const currentLocation = navigation.getParam('currentLocation');
    const location = this.state.location;
    if (!currentLocation || !location) {
      return;
    }
    const data = {
      source: {
        latitude: currentLocation.lat,
        longitude: currentLocation.lng,
      },
      destination: {
        latitude: location.lat,
        longitude: location.lng,
      },
      params: [
        {
          key: 'travelmode',
          value: 'driving', // may be "walking", "bicycling" or "transit" as well
        },
        {
          key: 'dir_action',
          value: 'navigate', // this instantly initializes navigation using the given travel mode
        },
      ],
    };
    getDirections(data);
  };

  componentDidMount() {
    const {navigation} = this.props;
    const placeId = navigation.getParam('placeId');
    let detail = navigation.getParam('detail');
    this.fetchDetail(placeId, detail);
  }

  fetchDetail = async (placeId, detail) => {
    if (!detail) {
      let response = await fetchLocationDetail(placeId);
      detail = resolveDetail(response);
    }
    this.setState({
      name: detail.name,
      rating: parseFloat(detail.rating),
      address: detail.formatted_address,
      reviews: detail.reviews || [],
      location: detail.geometry.location,
      photos: detail.photos
        ? detail.photos.map(photo => photo.photo_reference)
        : [],
    });
  };

  render() {
    let navTabs = [
      <Information />,
      <Reviews reviews={this.state.reviews} />,
      <Images photos={this.state.photos} />,
    ];
    return (
      <View style={styles.container}>
        <ImageSlideshow imgList={this.state.photos} />
        <BasicInfo
          name={this.state.name}
          rating={this.state.rating}
          nbReviews={this.state.reviews.length}
          address={this.state.address}
        />
        <FunctionOptionsBar
          onDirection={this.handleGetDirections}
          activeTab={this.state.activeTab}
          onChangeTab={this.changeTab}
        />
        {navTabs[this.state.activeTab]}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },

  navBarLabel: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  navBarLabelStyle: {
    fontSize: 16,
    textTransform: 'uppercase',
  },
});

export default LocationDetail;
