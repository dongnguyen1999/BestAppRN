import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Watch, TravelPlan} from '../assets/images';
import theme from '../themes/default';
import fetchPlacesUseTourId from '../api/fetchPlacesUseTourId';
import TourImgsPane from './TourImgsPane';
import PriceBox from './PriceBox';
import * as Scaled from '../utilities/scaled';

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
    const {navigation, id, onRefreshTours, currentLocation} = this.props;
    navigation.navigate('AdjustTour', {
      id: id,
      onRefreshTours: onRefreshTours,
      currentLocation: currentLocation,
    });
  };

  render() {
    const {name, price, nbDay, nbNight, nbPlaces, showImgs} = this.props;
    return !this.state.loading ? (
      <TouchableOpacity
        style={[
          styles.container,
          !showImgs
            ? {height: Scaled.height(87), marginBottom: Scaled.height(8)}
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
                <Watch width={Scaled.height(11)} height={Scaled.height(11)} />
                <Text style={styles.detailText}>
                  {nbDay} ngày {nbNight} đêm
                </Text>
              </View>
              <View style={styles.detailRow}>
                <TravelPlan
                  width={Scaled.height(11)}
                  height={Scaled.height(11)}
                />
                <Text style={styles.detailText}>{nbPlaces}+ địa điểm</Text>
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
    height: Scaled.height(159),
    borderRadius: Scaled.fontSize(5),
    backgroundColor: theme.darkElementColor,
    marginBottom: Scaled.height(15),
  },
  header: {
    width: '100%',
    height: Scaled.height(39),
    borderTopLeftRadius: Scaled.fontSize(5),
    borderTopRightRadius: Scaled.fontSize(5),
    backgroundColor: theme.lightElementColor,
    display: 'flex',
    justifyContent: 'center',
  },
  headerText: {
    marginLeft: Scaled.width(16),
    color: theme.fontColor,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: Scaled.fontSize(18),
    lineHeight: Scaled.height(24),
  },
  content: {
    flex: 1,
    margin: Scaled.width(7),
  },
  infoContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: Scaled.width(9),
    marginRight: Scaled.width(9),
  },
  // detailContainer: {
  //   // marginLeft: Scaled.width(9),
  //   // marginRight: Scaled.width(9),
  // },
  detailRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: Scaled.width(9),
  },
  detailText: {
    color: theme.fontColor,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: Scaled.fontSize(12),
    lineHeight: Scaled.height(20),
    marginLeft: Scaled.width(8),
  },
});

export default InfoItem;
