import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import theme from '../../themes/default';
import {ArrowDownIcon, ArrowRightIcon} from '../../assets/images';
import Input from '../../components/Input';
import Filter from '../../components/Filter';
import DetailInputs from './components/DetailInputs';
import StourButton from '../../components/StourButton';
import SearchBar from '../../components/SearchBar';
import PlaceItem from '../../components/PlaceItem';
import fetchTours from '../../api/fetchTours';
import fetchDetailUseTourId from '../../api/fetchDetailUseTourId';
import fetchCompanyInfo from '../../api/fetchCompanyInfo';
import VoiceRecognition from '../../utilities/VoiceRecognition';
import LocationsFetcher from '../../utilities/LocationsFetcher';
import RecordingAminated from '../../components/RecordingAminated';
import fetchPlacesUseTourId from '../../api/fetchPlacesUseTourId';
import {FlatList} from 'react-native-gesture-handler';
import fetchAllDetail from '../../api/fetchAllDetail';
import {getDistanceFrom2Locations} from '../../utilities/computeDistance';
import updateTourInfo from '../../api/updateTourInfo';
import * as Scaled from '../../utilities/scaled';
import Dialog from '../../components/Dialog';
import deleteTourFromServer from '../../api/deleteTourFromServer';
import nameFields from '../../constants/fieldName';

class AdjustTour extends Component {
  constructor(props) {
    super(props);
    const {navigation} = props;
    let currentLocation = navigation.getParam('currentLocation');
    let tourId = navigation.getParam('id');
    let initMap = new Map();
    initMap.set('comId', undefined);
    initMap.set('name', undefined);
    initMap.set('price', undefined);
    initMap.set('nbDay', undefined);
    initMap.set('nbNight', undefined);
    this.state = {
      showDetail: false,
      tourData: initMap,
      addingLocation: false,
      searchText: '',
      filtersData: new Map(),
      recognized: '',
      started: '',
      results: [],
      locations: new Map(),
      currentLocation: currentLocation,
      nextPageToken: undefined,
      selectedLocations: new Map(),
      fetchingLocations: false,
      showFilter: false,
      showDeleteConfirm: false,
      showNullInputAlert: undefined,
      insertMode: tourId == undefined,
    };
    this.updateTourData = this.updateTourData.bind(this);
    this.updateSearchText = this.updateSearchText.bind(this);
    this.checkItem = this.checkItem.bind(this);
    this.saveChange = this.saveChange.bind(this);
    this.saveChange = this.saveChange.bind(this);
    this.locationsFetcher = new LocationsFetcher(this);
    this.voiceRecognition = new VoiceRecognition(this);
  }

  componentDidMount() {
    if (!this.state.insertMode) {
      this.firstLoadScreen();
    }
  }

  firstLoadScreen = async () => {
    this.setState({isLoading: true});
    await this.fetchTourInfo();
    await this.fetchPlacesFromTour();
    this.setState({isLoading: false});
  };

  updateSearchText = text => this.setState({searchText: text});
  checkItem = (placeId, checked) => {
    let placeData;
    if (this.state.selectedLocations.has(placeId)) {
      placeData = this.state.selectedLocations.get(placeId);
    } else {
      placeData = this.state.locations.get(placeId);
    }
    placeData.checked = checked;
    this.setState({
      selectedLocations: this.state.selectedLocations.set(placeId, placeData),
    });
  };
  updateTourData = (key, value) =>
    this.setState({tourData: this.state.tourData.set(key, value)});

  fetchTourInfo = async () => {
    const {navigation} = this.props;
    const tourId = navigation.getParam('id');
    let tourInfo = await fetchDetailUseTourId(tourId);
    tourInfo = tourInfo.data;
    let comInfo = await fetchCompanyInfo(tourInfo.comId);
    comInfo = comInfo.data;
    let map = new Map();
    map.set('id', tourInfo.id);
    map.set('comId', tourInfo.comId);
    map.set('name', tourInfo.name);
    map.set('price', tourInfo.price);
    map.set('comName', comInfo.name);
    map.set('comAddress', comInfo.address);
    map.set('comPhone', comInfo.phone);
    map.set('comEmail', comInfo.mail);
    map.set('nbDay', tourInfo.nbDay);
    map.set('nbNight', tourInfo.nbNight);
    this.setState({tourData: map});
  };

  fetchPlacesFromTour = async () => {
    this.setState({fetchingLocations: true});
    const {navigation} = this.props;
    const tourId = navigation.getParam('id');
    let response = await fetchPlacesUseTourId(tourId);
    let data = response.data;
    let map = new Map();
    let detail = await fetchAllDetail(data.map(({id}) => id));
    detail.forEach(place => {
      map.set(place.place_id, {...place, checked: true});
    });
    this.setState({selectedLocations: map, fetchingLocations: false});
  };

  renderLocationItem(key, location) {
    const {navigation} = this.props;
    let distance, imgRef;
    if (location.distance) {
      distance = location.distance;
    } else {
      distance = this.state.currentLocation
        ? getDistanceFrom2Locations(
            this.state.currentLocation,
            location.geometry.location,
          )
        : undefined;
    }
    if (location.photo_reference) {
      imgRef = location.photo_reference;
    } else {
      imgRef = location.photos ? location.photos[0].photo_reference : undefined;
    }
    return (
      <PlaceItem
        key={key}
        placeId={location.place_id}
        imgRef={imgRef}
        name={location.name}
        address={location.formatted_address}
        currentLocation={this.state.currentLocation}
        distance={distance}
        navigation={navigation}
        detail={location.detail}
        checkable={true}
        checked={location.checked}
        checkItemCallback={this.checkItem}
      />
    );
  }

  renderLocationList() {
    let data = [...this.state.locations.values()].map(locationData => {
      let placeId = locationData.place_id;
      if (this.state.selectedLocations.has(placeId)) {
        locationData = {
          ...locationData,
          checked: this.state.selectedLocations.get(placeId).checked,
        };
      } else {
        locationData = {
          ...locationData,
          checked: false,
        };
      }
      return locationData;
    });
    return data.sort((a, b) => a.distance > b.distance);
  }

  saveChange = async () => {
    const {navigation} = this.props;
    let data = {};
    for (let [key, value] of this.state.tourData.entries()) {
      data[key] = value;
      if (value === undefined || `${value}`.trim() === '') {
        this.setState({showNullInputAlert: nameFields[key].toLowerCase()});
        return;
      }
    }
    let placeIds = [];
    for (let [placeId, {checked}] of this.state.selectedLocations.entries()) {
      if (checked) {
        placeIds.push(placeId);
      }
    }
    data.placeIds = placeIds;
    await updateTourInfo(data).then(r => console.log(r.data));
    let refreshTours = navigation.getParam('onRefreshTours');
    if (refreshTours) {
      refreshTours();
    }
    navigation.navigate('AdminHome');
  };

  deleteTour = async () => {
    const {navigation} = this.props;
    let tourId = this.state.tourData.get('id');
    await deleteTourFromServer(tourId);
    let refreshTours = navigation.getParam('onRefreshTours');
    if (refreshTours) {
      refreshTours();
    }
    navigation.navigate('AdminHome');
  };

  render() {
    // console.log(this.state.showFilter);
    const UPDATE_MODE_SCROLL_DISTANCE = 390;
    const INSERT_MODE_SCROLL_DISTANCE = 200;
    return this.state.isLoading ? (
      <View style={styles.indicatorContainer}>
        <ActivityIndicator size="large" color={theme.lightElementColor} />
      </View>
    ) : (
      <ScrollView
        style={styles.container}
        ref={ref => (this.mainScroll = ref)}
        onScroll={event => {
          const {contentOffset} = event.nativeEvent;
          const {y} = contentOffset;
          this.setState({
            showFilter:
              y >
              Scaled.height(
                this.state.insertMode
                  ? INSERT_MODE_SCROLL_DISTANCE - 20
                  : UPDATE_MODE_SCROLL_DISTANCE - 20,
              ),
          });
        }}>
        {this.state.showNullInputAlert ? (
          <Dialog
            title="Lỗi nhập liệu"
            description={`Thông tin về ${
              this.state.showNullInputAlert
            } không được bỏ trống. Vui lòng nhập hoặc chọn giá trị cho ${
              this.state.showNullInputAlert
            }`}
            onAccept={() => this.setState({showNullInputAlert: undefined})}
          />
        ) : (
          undefined
        )}
        <View
          style={[
            styles.headerView,
            this.state.showDetail ? styles.showingDetailHeader : undefined,
          ]}
          onTouchEnd={() =>
            this.setState({showDetail: !this.state.showDetail})
          }>
          <Text style={[styles.headerText]}>Thông tin chi tiết tour</Text>
          {this.state.showDetail ? (
            <ArrowDownIcon width={Scaled.width(14)} height={Scaled.height(7)} />
          ) : (
            <ArrowRightIcon
              width={Scaled.width(16)}
              height={Scaled.height(10)}
            />
          )}
        </View>
        {this.state.showDetail ? (
          <DetailInputs
            data={this.state.tourData}
            style={styles.detailInput}
            callbackValue={this.updateTourData}
            insertMode={this.state.insertMode}
            scrollViewCallback={() => {
              if (!this.state.showFilter) {
                this.mainScroll.scrollTo({
                  x: 0,
                  y: Scaled.height(
                    this.state.insertMode
                      ? INSERT_MODE_SCROLL_DISTANCE
                      : UPDATE_MODE_SCROLL_DISTANCE,
                  ),
                  animated: true,
                });
              }
            }}
            showFilter={this.state.showFilter}
          />
        ) : (
          []
        )}
        <View style={styles.containerWrapper}>
          <StourButton
            title={this.state.addingLocation ? 'XONG' : 'THÊM ĐỊA ĐIỂM'}
            onPress={() =>
              this.setState({addingLocation: !this.state.addingLocation})
            }
          />
          <View
            style={[
              styles.placesView,
              this.state.insertMode ? {height: Scaled.height(400)} : undefined,
            ]}>
            {this.state.selectedLocations.size != 0 &&
            !this.state.addingLocation ? (
              <FlatList
                showsVerticalScrollIndicator={false}
                style={[styles.flatList, {marginTop: Scaled.height(12)}]}
                data={[...this.state.selectedLocations.values()]}
                renderItem={({index, item}) =>
                  this.renderLocationItem(index, item)
                }
              />
            ) : (
              undefined
            )}
            {this.state.addingLocation ? (
              <View>
                <SearchBar
                  value={this.state.searchText}
                  searchTextCallback={this.updateSearchText}
                  onRecognizeVoice={this.voiceRecognition.startRecognition}
                  onSearchText={this.locationsFetcher.searchLocations}
                />

                {this.state.locations.size != 0 && this.state.addingLocation ? (
                  <FlatList
                    showsVerticalScrollIndicator={false}
                    style={styles.flatList}
                    onEndReached={this.locationsFetcher.getNextPageLocations}
                    data={this.renderLocationList()}
                    renderItem={({index, item}) =>
                      this.renderLocationItem(index, item)
                    }
                  />
                ) : (
                  undefined
                )}
              </View>
            ) : (
              undefined
            )}
            {this.state.fetchingLocations ? (
              <View style={styles.smallIndicator}>
                <ActivityIndicator color={theme.lightElementColor} />
              </View>
            ) : (
              undefined
            )}
          </View>
          {this.state.insertMode ? (
            <View style={styles.bottomButtons}>
              <StourButton
                style={[styles.saveButton, {marginBottom: Scaled.height(15)}]}
                title="HOÀN TẤT"
                onPress={this.saveChange}
              />
            </View>
          ) : (
            <View style={styles.bottomButtons}>
              <StourButton
                style={styles.saveButton}
                title="LƯU THAY ĐỔI"
                onPress={this.saveChange}
              />
              <StourButton
                style={styles.deleteButton}
                titleStyle={styles.deleteButtonText}
                title="XOÁ TOUR"
                onPress={() => this.setState({showDeleteConfirm: true})}
              />
            </View>
          )}

          {this.state.showDeleteConfirm ? (
            <Dialog
              title="Xác nhận xóa"
              description="Thao tác này sẽ xóa hoàn toàn thông tin về tour du lịch này trên hệ thống. Bạn có chắc muốn xóa"
              type="prompt"
              onAccept={() => this.deleteTour()}
              onCancel={() => this.setState({showDeleteConfirm: false})}
              acceptLabel="Xóa luôn"
              cancelLabel="Xem lại đã"
            />
          ) : (
            undefined
          )}
        </View>
        {this.state.started ? (
          <View style={styles.recognitionView}>
            <RecordingAminated
              onDestroyVoice={this.voiceRecognition.destroyRecognition}
            />
          </View>
        ) : null}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: theme.pageColor,
  },
  containerWrapper: {
    paddingLeft: Scaled.width(16),
    paddingRight: Scaled.width(16),
  },
  headerView: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: theme.commentDividers,
    borderBottomWidth: Scaled.width(1),
    padding: Scaled.width(16),
    marginBottom: Scaled.height(16),
  },
  showingDetailHeader: {
    borderBottomWidth: 0,
    paddingBottom: 0,
    marginBottom: 0,
  },
  headerText: {
    fontFamily: theme.fontFamily,
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: Scaled.fontSize(14),
    lineHeight: Scaled.height(20),
    color: theme.fontColor,
  },
  placesView: {
    height: Scaled.height(343),
  },
  saveButton: {
    marginBottom: Scaled.height(12),
  },
  detailInput: {
    borderBottomColor: theme.commentDividers,
    borderBottomWidth: Scaled.width(1),
    padding: Scaled.width(16),
    paddingTop: 0,
    marginBottom: Scaled.height(16),
  },
  recognitionView: {
    alignItems: 'center',
    width: '100%',
    position: 'relative',
    top: Scaled.height(-700),
  },
  flatList: {
    width: '100%',
    height: Scaled.height(375),
  },
  smallIndicator: {
    width: '100%',
    height: Scaled.height(30),
    marginTop: Scaled.height(10),
    marginBottom: Scaled.height(10),
  },
  indicatorContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.pageColor,
  },
  deleteButton: {
    marginBottom: Scaled.height(15),
    backgroundColor: theme.pageColor,
    borderWidth: Scaled.width(1),
    borderRadius: Scaled.fontSize(2),
    borderColor: theme.errorColor,
  },
  deleteButtonText: {
    color: theme.errorColor,
    fontFamily: theme.fontFamily,
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: Scaled.fontSize(14),
    lineHeight: Scaled.height(24),
  },
  bottomButtons: {
    backgroundColor: theme.pageColor,
    paddingTop: Scaled.height(10),
  },
});

export default AdjustTour;
