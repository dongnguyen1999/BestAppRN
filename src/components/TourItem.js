import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {Watch, TravelPlan} from '../assets/images';
import theme from '../themes/default';
import fetchPlacesUseTourId from '../api/fetchPlacesUseTourId';
import TourImgsPane from './TourImgsPane';
import PriceBox from './PriceBox';

class InfoItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      placeIds: [],
      loading: true,
    };
    this.navigateToDetail = this.navigateToDetail.bind(this);
  }

  componentDidMount() {
    const {id} = this.props;
    this.fetchPlaces(id);
  }

  fetchPlaces = async tourId => {
    let response = await fetchPlacesUseTourId(tourId);
    let placeIds = response.data.map(object => object.id);
    this.setState({placeIds: placeIds ? placeIds : [], loading: false});
  };

  navigateToDetail = () => {
    const {
      id,
      name,
      price,
      nbDay,
      nbNight,
      navigation,
      comId,
      currentLocation,
    } = this.props;
    navigation.navigate('TourDetail', {
      id: id,
      placeIds: this.state.placeIds,
      comId: comId,
      tourDetail: {name, price, nbDay, nbNight},
      currentLocation: currentLocation,
    });
  };

  navigateAsAdmin = () => {
    const {navigation, id, onRefreshTours} = this.props;
    navigation.navigate('AdjustTour', {
      id: id,
      onRefreshTours: onRefreshTours,
    });
  };

  render() {
    const {
      name,
      price,
      nbDay,
      nbNight,

      showImgs,
    } = this.props;
    return !this.state.loading ? (
      <TouchableOpacity
        style={[
          styles.container,
          !showImgs
            ? {height: RFValue(87), marginBottom: RFValue(8)}
            : undefined,
        ]}
        onPress={showImgs ? this.navigateToDetail : this.navigateAsAdmin}>
        <View style={styles.header}>
          <Text style={styles.headerText}>{name}</Text>
        </View>
        <View style={styles.content}>
          <View style={styles.infoContainer}>
            <View style={styles.detailContainer}>
              <View style={styles.detailRow}>
                <Watch width={RFValue(11)} height={RFValue(11)} />
                <Text style={styles.detailText}>
                  {nbDay} ngày {nbNight} đêm
                </Text>
              </View>
              <View style={styles.detailRow}>
                <TravelPlan width={RFValue(11)} height={RFValue(11)} />
                <Text style={styles.detailText}>
                  {this.state.placeIds.length}+ ngày
                </Text>
              </View>
            </View>
            <PriceBox price={price} />
          </View>
          {showImgs ? (
            <TourImgsPane placeIds={this.state.placeIds} />
          ) : (
            undefined
          )}
        </View>
      </TouchableOpacity>
    ) : (
      []
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: RFValue(159),
    borderRadius: RFValue(5),
    backgroundColor: theme.darkElementColor,
    marginBottom: RFValue(15),
  },
  header: {
    width: '100%',
    height: RFValue(39),
    borderTopLeftRadius: RFValue(5),
    borderTopRightRadius: RFValue(5),
    backgroundColor: theme.lightElementColor,
    display: 'flex',
    justifyContent: 'center',
  },
  headerText: {
    marginLeft: RFValue(16),
    color: theme.fontColor,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: RFValue(18),
    lineHeight: RFValue(24),
  },
  content: {
    flex: 1,
    margin: RFValue(7),
  },
  infoContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  // detailContainer: {

  // },
  detailRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: RFValue(9),
  },
  detailText: {
    color: theme.fontColor,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: RFValue(12),
    lineHeight: RFValue(20),
    marginLeft: RFValue(8),
  },
});

export default InfoItem;
