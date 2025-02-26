import React from 'react';
import PlaceItem from '../components/PlaceItem';
import TourItem from '../components/TourItem';
import {FlatList, ScrollView, Text, View} from 'react-native';
import * as Scaled from '../utilities/scaled';

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

function renderTourItem(
  key,
  tourData,
  navigation,
  currentLocation,
  showImgs,
  onRefreshTours,
) {
  return (
    <TourItem
      key={key}
      id={tourData.id}
      name={tourData.name}
      price={tourData.price}
      nbDay={tourData.nb_day}
      nbNight={tourData.nb_night}
      nbPlaces={tourData.nb_places}
      navigation={navigation}
      comId={tourData.com_id}
      currentLocation={currentLocation}
      onRefreshTours={onRefreshTours}
      showImgs={showImgs}
    />
  );
}

function isCloseToTop(nativeEvent) {
  return (
    nativeEvent.contentOffset.y === 0 && nativeEvent.contentSize.height != 0
  );
}

function isCloseToBottom({layoutMeasurement, contentOffset, contentSize}) {
  return (
    Math.floor(layoutMeasurement.height + contentOffset.y) ==
    Math.floor(contentSize.height)
  );
}

class FlatListRenderer {
  constructor(context, styles) {
    this.renderLocationsFlatList = this.renderLocationsFlatList.bind(context);
    this.renderToursFlatList = this.renderToursFlatList.bind(context);
  }

  renderLocationsFlatList(styles) {
    const {navigation} = this.props;
    let currentLocation = this.state.currentLocation;
    if (this.state.showPlaces) {
      return this.state.locations.size != 0 ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          style={styles.contentWrapper}
          onEndReached={this.locationsFetcher.getNextPageLocations}
          data={this.renderLocationList()}
          renderItem={({index, item}) =>
            renderLocationItem(index, item, navigation, currentLocation)
          }
        />
      ) : !this.state.fetchingLocations ? (
        <View style={[styles.contentWrapper, styles.notFoundTextView]}>
          <Text style={styles.notFoundText}>
            Hiện không có địa điểm phù hợp, mời bạn tìm kiếm với từ khóa khác
          </Text>
        </View>
      ) : (
        undefined
      );
    } else {
      return null;
    }
    // return this.state.locations.size != 0 && this.state.showPlaces ? (
    //   <FlatList
    //     showsVerticalScrollIndicator={false}
    //     style={styles.contentWrapper}
    //     onEndReached={this.locationsFetcher.getNextPageLocations}
    //     data={this.renderLocationList()}
    //     renderItem={({index, item}) =>
    //       renderLocationItem(index, item, navigation, currentLocation)
    //     }
    //   />
    // ) : (
    //   undefined
    // );
  }

  renderToursFlatList(styles) {
    const {navigation} = this.props;
    let currentLocation = this.state.currentLocation;
    // console.log(this.state.tours.length, this.state.currentToursIndex);
    if (!this.state.showPlaces) {
      return this.state.tours.length != 0 ? (
        <ScrollView
          style={styles.contentWrapper}
          showsVerticalScrollIndicator={false}
          ref={view => (this.toursList = view)}
          onScroll={event => {
            if (isCloseToTop(event.nativeEvent)) {
              this.toursList.scrollTo(Scaled.height(1), 0, false);
              this.updateToursIndex(-1);
            }
            if (isCloseToBottom(event.nativeEvent)) {
              if (this.state.currentToursIndex != this.state.maxToursIndex) {
                this.toursList.scrollTo(Scaled.height(1), 0, false);
              }
              this.updateToursIndex(1);
            }
          }}>
          {this.state.tours[this.state.currentToursIndex].map((item, index) =>
            renderTourItem(
              index,
              item,
              navigation,
              currentLocation,
              !this.isAdmin,
              this.fetchToursList,
            ),
          )}
        </ScrollView>
      ) : !this.state.fetchingLocations ? (
        <View style={[styles.contentWrapper, styles.notFoundTextView]}>
          <Text style={styles.notFoundText}>
            Hiện không có tour phù hợp, mời bạn tìm kiếm với từ khóa khác
          </Text>
        </View>
      ) : (
        undefined
      );
    } else {
      return null;
    }
  }
}

export default FlatListRenderer;
