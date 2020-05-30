import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
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

class AdjustTour extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDetail: false,
      tourData: new Map(),
      addingLocation: false,
      searchText: 'cháo gà',
      filtersData: new Map(),
      recognized: '',
      started: '',
      results: [],
      locations: new Map(),
      currentLocation: undefined,
      nextPageToken: undefined,
    };
    this.updateTourData = this.updateTourData.bind(this);
    this.updateSearchText = this.updateSearchText.bind(this);
    this.locationsFetcher = new LocationsFetcher(this);
    this.voiceRecognition = new VoiceRecognition(this);
  }

  componentDidMount() {
    this.fetchTourInfo();
  }

  updateSearchText = text => this.setState({searchText: text});
  updateTourData = (key, value) =>
    this.setState({tourData: this.state.tourData.set(key, value)});

  fetchTourInfo = async () => {
    let tourId = 1;
    let tourInfo = await fetchDetailUseTourId(tourId);
    tourInfo = tourInfo.data;
    let comInfo = await fetchCompanyInfo(tourInfo.comId);
    comInfo = comInfo.data;
    let map = new Map();
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

  render() {
    console.log(`'${this.state.started}'`);
    return (
      <ScrollView style={styles.container} ref={ref => (this.mainScroll = ref)}>
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
            <ArrowDownIcon width={RFValue(14)} height={RFValue(7)} />
          ) : (
            <ArrowRightIcon width={RFValue(16)} height={RFValue(10)} />
          )}
        </View>
        {this.state.showDetail ? (
          <DetailInputs
            data={this.state.tourData}
            style={styles.detailInput}
            callbackValue={this.updateTourData}
            scrollViewCallback={() =>
              this.mainScroll.scrollTo({x: 0, y: RFValue(400), animated: true})
            }
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
          <View style={styles.placesView}>
            {this.state.addingLocation ? (
              <View>
                <SearchBar
                  value={this.state.searchText}
                  searchTextCallback={this.updateSearchText}
                  onRecognizeVoice={this.voiceRecognition.startRecognition}
                  onSearchText={this.locationsFetcher.searchLocations}
                />
                <PlaceItem
                  name="ABCJJjkfjdskfjksfj"
                  address="fdshfkajjkahfkjhajskhfjashfkjahsfkjhaskjhfakjfjdskjfkasjfkljaflkjakjdflasjlkdfsjahfkj"
                  checkable={true}
                />
              </View>
            ) : (
              undefined
            )}
          </View>
          <StourButton style={styles.saveButton} title="LƯU THAY ĐỔI" />
        </View>
        {this.state.started ? (
          <View style={{alignItems: 'center'}}>
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
    width: '100%',
    backgroundColor: theme.pageColor,
  },
  containerWrapper: {
    paddingLeft: RFValue(16),
    paddingRight: RFValue(16),
  },
  headerView: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: theme.commentDividers,
    borderBottomWidth: RFValue(1),
    padding: RFValue(16),
    marginBottom: RFValue(16),
  },
  showingDetailHeader: {
    borderBottomWidth: 0,
    paddingBottom: 0,
    marginBottom: 0,
  },
  headerText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: RFValue(14),
    lineHeight: RFValue(20),
    color: theme.fontColor,
  },
  placesView: {
    height: RFValue(460),
  },
  saveButton: {
    marginBottom: RFValue(32),
  },
  detailInput: {
    borderBottomColor: theme.commentDividers,
    borderBottomWidth: RFValue(1),
    padding: RFValue(16),
    paddingTop: 0,
    marginBottom: RFValue(16),
  },
});

export default AdjustTour;
