import React, {Component} from 'react';
import {View, Text, FlatList, ActivityIndicator} from 'react-native';
import {StyleSheet} from 'react-native';
import theme from '../../themes/default';
import {RFValue} from 'react-native-responsive-fontsize';
import PlaceItem from '../../components/PlaceItem';
import TourInfo from './components/TourInfo';
import CompanyInfo from './components/CompanyInfo';
import fetchPlacesUseTourId from '../../api/fetchPlacesUseTourId';
import fetchCompanyInfo from '../../api/fetchCompanyInfo';
import fetchAllDetail from '../../api/fetchAllDetail';
import {getDistanceFrom2Locations} from '../../utilities/computeDistance';

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
    let response = await fetchPlacesUseTourId(tourId);
    let placeIds = response.data.map(object => object.id);
    if (!placeIds) {
      placeIds = [];
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
    const locations = navigation.getParam('locations');
    return (
      <View style={styles.container}>
        <View style={styles.contentWrapper}>
          <TourInfo
            name={tourDetail.name}
            price={tourDetail.price}
            nbDay={tourDetail.nbDay}
            nbNight={tourDetail.nbNight}
          />
          {this.state.loading ? (
            <View style={styles.smallIndicator}>
              <ActivityIndicator color={theme.lightElementColor} />
            </View>
          ) : (
            <View>
              <CompanyInfo data={this.state.companyData} />
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
    paddingLeft: RFValue(16),
    paddingRight: RFValue(16),
    marginBottom: RFValue(13),
  },
  flatList: {
    height: RFValue(320),
  },
  resultCaption: {
    marginTop: RFValue(13),
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: RFValue(20),
    lineHeight: RFValue(24),
    color: theme.fontColor,
    marginBottom: RFValue(15),
  },
  smallIndicator: {
    width: '100%',
    height: RFValue(100),
    justifyContent: 'center',
  },
});

export default TourDetail;
