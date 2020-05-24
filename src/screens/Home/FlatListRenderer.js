import React from 'react';
import PlaceItem from '../../components/PlaceItem';
import TourItem from './components/TourItem';
import {FlatList} from 'react-native';

function renderLocationItem(key, location, navigation, currentLocation) {
  return (
    <PlaceItem
      key={key}
      placeId={location.place_id}
      imgRef={location.photo_reference}
      name={location.name}
      address={location.formatted_address}
      currentLocation={currentLocation}
      distance={location.distance}
      navigation={navigation}
      detail={location.detail}
    />
  );
}

function renderTourItem(key, tourData, navigation, currentLocation) {
  if (key <= 20 || key >= 40) {
    return;
  }
  return (
    <TourItem
      key={key}
      id={tourData.id}
      name={tourData.name}
      price={tourData.price}
      nbDay={tourData.nb_day}
      nbNight={tourData.nb_night}
      navigation={navigation}
      comId={tourData.com_id}
      currentLocation={currentLocation}
    />
  );
}

function isCloseToTop(distanceFromTop, callback) {
  return distanceFromTop === 0;
}

function isCloseToBottom({layoutMeasurement, contentOffset, contentSize}) {
  return layoutMeasurement.height + contentOffset.y == contentSize.height;
}

class FlatListRenderer {
  constructor(context, styles) {
    this.renderLocationsFlatList = this.renderLocationsFlatList.bind(context);
    this.renderToursFlatList = this.renderToursFlatList.bind(context);
  }

  renderLocationsFlatList(styles) {
    const {navigation, currentLocation} = this.props;
    return this.state.locations.size != 0 && this.state.showPlaces ? (
      <FlatList
        showsVerticalScrollIndicator={false}
        style={styles.contentWrapper}
        onEndReached={this.locationsFetcher.getNextPageLocations}
        data={this.renderLocationList()}
        renderItem={({index, item}) =>
          renderLocationItem(index, item, navigation, currentLocation)
        }
      />
    ) : (
      undefined
    );
  }

  renderToursFlatList(styles) {
    const {navigation} = this.props;
    let currentLocation = this.state.currentLocation;
    return this.state.tours.length != 0 && !this.state.showPlaces ? (
      <FlatList
        style={styles.contentWrapper}
        showsVerticalScrollIndicator={false}
        onScroll={event => {
          if (isCloseToTop(event.nativeEvent.contentOffset.y)) {
            console.log('top');
          }
          if (isCloseToBottom(event.nativeEvent)) {
            console.log('end');
          }
        }}
        data={this.state.tours}
        renderItem={({index, item}) =>
          renderTourItem(index, item, navigation, currentLocation)
        }
      />
    ) : (
      undefined
    );
  }
}

export default FlatListRenderer;
