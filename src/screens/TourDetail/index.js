/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, FlatList, ActivityIndicator} from 'react-native';
import {StyleSheet} from 'react-native';
import theme from '../../themes/default';
import PlaceItem from '../../components/PlaceItem';
import CompanyInfo from './components/CompanyInfo';
import fetchPlacesUseTourId from '../../api/fetchPlacesUseTourId';
import fetchCompanyInfo from '../../api/fetchCompanyInfo';
import fetchAllDetail from '../../api/fetchAllDetail';
import {getDistanceFrom2Locations} from '../../utilities/computeDistance';
import ImgHeader from './components/ImgHeader';
import * as Scaled from '../../utilities/scaled';

class TourDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      locations: undefined,
      companyData: undefined,
    };
  }
  componentDidMount() {
    this.firstLoad();
  }

  fetchPlaces = async tourId => {
    const {navigation} = this.props;
    let placeIds = navigation.getParam('placeIds');
    if (placeIds.length == 0) {
      let response = await fetchPlacesUseTourId(tourId);
      let placeIds = response.data.map(object => object.id);
      if (!placeIds) {
        placeIds = [];
      }
    }
    return await fetchAllDetail(placeIds);
  };

  fetchCompanyData = async comId => {
    let response = await fetchCompanyInfo(comId);
    return response.data;
  };

  firstLoad = async () => {
    const {navigation} = this.props;
    const id = navigation.getParam('id');
    const comId = navigation.getParam('comId');
    let locations = await this.fetchPlaces(id);
    let companyData = await this.fetchCompanyData(comId);
    this.setState({
      loading: false,
      locations: locations,
      companyData: companyData,
    });
  };

  renderLocationItem(key, location) {
    const {navigation} = this.props;
    const currentLocation = navigation.getParam('currentLocation');
    return (
      <PlaceItem
        key={key}
        placeId={location.place_id}
        imgRef={
          location.photos ? location.photos[0].photo_reference : undefined
        }
        name={location.name}
        address={location.formatted_address}
        currentLocation={currentLocation}
        distance={getDistanceFrom2Locations(
          currentLocation,
          location.geometry.location,
        )}
        navigation={navigation}
        detail={location}
      />
    );
  }

  render() {
    const {navigation} = this.props;
    const tourDetail = navigation.getParam('tourDetail');
    return (
      <View style={styles.container}>
        <View style={styles.contentWrapper}>
          <ImgHeader
            name={tourDetail.name}
            nbDay={tourDetail.nbDay}
            nbNight={tourDetail.nbNight}
            price={tourDetail.price}
            nbPlaces={this.state.locations ? this.state.locations.length : 0}
          />
          {this.state.loading ? (
            <View style={styles.smallIndicator}>
              <ActivityIndicator color={theme.lightElementColor} />
            </View>
          ) : (
            <View>
              <CompanyInfo
                name={this.state.companyData.name}
                address={this.state.companyData.address}
                mail={this.state.companyData.mail}
                phone={this.state.companyData.phone}
              />
              <Text style={styles.resultCaption}>Các địa điểm tham quan</Text>
              {this.state.locations ? (
                <FlatList
                  showsVerticalScrollIndicator={false}
                  style={styles.flatList}
                  data={this.state.locations}
                  renderItem={({index, item}) =>
                    this.renderLocationItem(index, item)
                  }
                />
              ) : (
                undefined
              )}
            </View>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.pageColor,
    alignItems: 'center',
  },
  contentWrapper: {
    width: '100%',
    paddingLeft: Scaled.width(16),
    paddingRight: Scaled.width(16),
    marginBottom: Scaled.height(13),
  },
  flatList: {
    // flex: 1,
    height: '50%',
  },
  resultCaption: {
    marginTop: Scaled.height(11),
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: Scaled.fontSize(20),
    lineHeight: Scaled.height(32),
    color: theme.fontColor,
    marginBottom: Scaled.height(3),
  },
  smallIndicator: {
    width: '100%',
    height: Scaled.height(100),
    justifyContent: 'center',
  },
});

export default TourDetail;
