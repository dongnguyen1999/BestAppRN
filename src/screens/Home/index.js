import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  FlatList,
  Switch,
} from 'react-native';
import theme from '../../themes/default';
import Dialog from '../../components/Dialog';
import SearchBar from '../../components/SearchBar';
import {RFValue} from 'react-native-responsive-fontsize';
import FiltersButton from './components/FiltersButton';
import RecordingAminated from '../../components/RecordingAminated';
import getCurrentPosition from '../../api/getCurrentLocation';
import VoiceRecognition from '../../utilities/VoiceRecognition';
import LocationsFetcher from '../../utilities/LocationsFetcher';
import * as ClientFilter from '../../utilities/ClientFilter';
import fetchTours from '../../api/fetchTours';
import FlatListRenderer from '../../utilities/FlatListRenderer';
import firebaseApp from '../../utilities/firebaseApp';
import {GoogleSignin} from '@react-native-community/google-signin';
import Scaled from '../../utilities/Scaled';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: 'Gà',
      filtersData: new Map(),
      recognized: '',
      started: '',
      results: [],
      locations: new Map(),
      tours: [],
      currentLocation: undefined,
      nextPageToken: undefined,
      currentToursIndex: 0,
      fetchingLocations: false,
      showPlaces: true,
    };

    this.maxNbToursShown = 15;
    this.updateSearchText = this.updateSearchText.bind(this);
    this.updateFiltersData = this.updateFiltersData.bind(this);
    this.clearFiltersData = this.clearFiltersData.bind(this);
    this.updateShowFilters = this.updateShowFilters.bind(this);
    this.setShowFilters = this.setShowFilters.bind(this);
    this.updateToursIndex = this.updateToursIndex.bind(this);
    this.voiceRecognition = new VoiceRecognition(this);
    this.locationsFetcher = new LocationsFetcher(this);
    this.flatListRenderer = new FlatListRenderer(this);
  }

  componentDidMount() {
    this.firstLoadHomeScreen();
  }

  getLoggedInEmail = async () => {
    const {navigation} = this.props;
    const loggedInBy = navigation.getParam('loggedInBy');
    let user;
    if (loggedInBy === 'GOOGLE') {
      user = await this.isLoggedInWithGoogle();
    }
    if (loggedInBy === 'EMAIL') {
      user = await this.isLoggedInWithAccount();
    }
    return user.email;
  };

  isLoggedInWithAccount() {
    return new Promise(resolve => {
      firebaseApp.auth().onAuthStateChanged(user => {
        resolve(user);
      });
    });
  }
  isLoggedInWithGoogle = async () => {
    let profile = await GoogleSignin.getCurrentUser();
    return profile.user;
  };

  checkIsAdmin(email) {
    //...temp
    return email === 'nvdkg1999@gmail.com';
  }

  firstLoadHomeScreen = async () => {
    const {navigation} = this.props;
    let loggedInEmail = await this.getLoggedInEmail();
    let isAdmin = this.checkIsAdmin(loggedInEmail);
    const loggedInBy = navigation.getParam('loggedInBy');
    this.isAdmin = isAdmin;
    if (isAdmin)
      navigation.navigate('AdminHomeStack', {loggedInBy: loggedInBy});
    let info = await getCurrentPosition();
    this.setState({
      isLoading: false,
      currentLocation: {lat: info.coords.latitude, lng: info.coords.longitude},
    });
    this.locationsFetcher.searchLocations();
  };

  componentWillUnmount() {
    this.voiceRecognition.cleanRecognition();
  }

  updateSearchText = text => this.setState({searchText: text});
  updateShowFilters = flag => this.setState({showFilters: flag});
  updateFiltersData = data => this.setState({filtersData: data});
  clearFiltersData = () => this.setState({filtersData: new Map()});
  setShowFilters = flag => this.setState({showFilters: flag});
  updateToursIndex = dir => {
    let newIndex = this.state.currentToursIndex + dir;
    let maxIndex = this.state.maxToursIndex;
    if (newIndex < 0) {
      newIndex = 0;
    }
    if (newIndex > maxIndex) {
      newIndex = maxIndex;
    }
    this.setState({currentToursIndex: newIndex});
  };

  fetchToursList = async () => {
    this.setState({fetchingLocations: true, tours: []});
    let toursData = [];
    if (this.state.locations.size != 0) {
      let placeIds = [...this.state.locations.values()].map(
        location => location.place_id,
      );
      let response = await fetchTours(placeIds);
      toursData = response.data;
    }
    let maxIndex = Math.floor(toursData.length / this.maxNbToursShown);
    toursData.sort(() => Math.random() - 0.5);
    let splitedData = [];
    for (let i = 0; i <= maxIndex; i++) {
      splitedData.push(
        toursData.slice(
          i * this.maxNbToursShown,
          i * this.maxNbToursShown + this.maxNbToursShown,
        ),
      );
    }
    this.setState({
      fetchingLocations: false,
      tours: splitedData,
      maxToursIndex: maxIndex,
    });
  };

  renderLocationList() {
    let data = [...this.state.locations.values()];
    data = ClientFilter.filter(data, this.state.filtersData);
    return data.sort((a, b) => a.distance > b.distance);
  }

  render() {
    // console.log(this.state.tours);

    // this.offlineFilter.updateData(
    //   this.state.locationsDetail,
    //   this.state.filtersData,
    // );
    // console.log(this.offlineFilter.getResult());
    // console.log(this.state.locations.size);
    // console.log(this.state.filtersData);
    // console.log(
    //   [...this.state.locations.values()]
    //     .map(location => location.place_id)
    //     .join('\n'),
    // );
    // console.log(
    //   [...this.state.locations.values()]
    //     .map(location => location.name)
    //     .join('\n'),
    // );
    // SELECT * FROM TOUR WHERE T_Id in (SELECT DISTINCT TOUR_PLACE.T_Id FROM TOUR_PLACE WHERE TOUR_PLACE.P_Id in ('ChIJp8jxUTuIoDERyBcwpCPpzQM',...));
    // ('ChIJp8jxUTuIoDERyBcwpCPpzQM','ChIJ60pywR6IoDERhfZEhWlmn2s','ChIJ0VRx_gOIoDER0lUk8X0mtt4','ChIJ5f1X5R-IoDERoa8wRZ-qo1M','ChIJEUcyC8aJoDERifNoSARsqZI','ChIJEb4JocWJoDERJLvFAoiBPBw','ChIJV6JsWT6IoDEREaLArv999RQ','ChIJTXcDk0eJoDERdJa0O22aeeM','ChIJ6V-lFEeJoDERMCvFnIHIvAA','ChIJuYb_h5WJoDERctRVzWmAaGk','ChIJ5UsFYNyJoDERgR1JXN1ltWg','ChIJa0hrbaBioDERVyjh1sbkvyQ','ChIJmRMrNp9ioDERFTTz_SX0q98','ChIJh5k_pDiJoDERz8bYV7hN8DI','ChIJMyZt7juJoDERZefxD9QMs-Q','ChIJi61qC0uJoDERw-SB7t-3VAw','ChIJ_bOU9qFioDERbj90-AO96U0','ChIJ3R5lgDWIoDERBbJIUDznp4E','ChIJkYsYSYCJoDERlz-f5guV8Vk','ChIJt6mxpgKIoDERNh6JLOAiH4U','ChIJeQMGhqWJoDERsoJbIYX9MrM','ChIJMUiaCcGJoDERAaVgMFBR-Qk','ChIJbwhuWiOIoDER65Fiyhg7igk','ChIJ13HN4OSJoDER7tXLeIFGlVs','ChIJqRhwS7KJoDERMcQ0Br7S_QY','ChIJo61LXCWIoDERSJJP1s_rh00','ChIJDQtAqSaIoDER1P9k3g5B5wc','ChIJQRnBMEKIoDERf4x_L7J4qps','ChIJ-x4BNY-JoDERZotWzLvtMSc','ChIJJ06SxZtjoDERDf6VilBheGs','ChIJwSKEAoiJoDER5DgwRrEWZJY','ChIJ54eipQKIoDERIm8DOOcsvuc','ChIJpR0e8aGJoDERlknCWe30GeU','ChIJYxX15cCOoDER5L7Q9HssDQk','ChIJ_2I9E7GJoDERNbHmqePQe2g','ChIJE1UNZwaIoDERev8caxlFa5k','ChIJpY4pDq9ioDERfrBz2X3wDyc','ChIJJQH8VTKJoDERxa7OqXN6OCw','ChIJU0S0fdtjoDERpIVwsbbhazg','ChIJgdjFNZyJoDERcVTVRSlPJ7o','ChIJBaCU6ahioDERWz1GFHCzVBs','ChIJl1Itx1GGoDERW50fvPAmqDw','ChIJTU4fPKBioDERUxdmkOJUHFM','ChIJWR2TuhCIoDERxAmY3u_KZg4','ChIJ3YD53eCEoDERybLIPgYpUPE','ChIJ6SPycoSJoDER9mNGNZ1JT5g','ChIJ7yVT2B-IoDERc_XozfIkSjk','ChIJTy8754iJoDER3JZDksH3ZHM','ChIJBWqKXzeIoDERidjeHXVN9UM','ChIJZYGTmxiJoDERiC8lQjc0bJ8','ChIJrysGDK9ioDERTleWW1Ugd4Q','ChIJp2c-JA6IoDERlKdoeyx1J9E','ChIJYUQggaFioDERA9jQdLhuN6g','ChIJl_JGML-JoDERjZfu5jQBGf4','ChIJ0WXQK5KJoDERCMv3QhR7dk8','ChIJB-oGOw6IoDERi3BuQcHBjlg','ChIJe_SlTJ9ioDERl2nd20r35jM','ChIJ5zrOMs2JoDERabb5TltvVYM','ChIJqzF1n55ioDERHFz6CJAnQAk','ChIJt2icrkBnoDERlZUsPLSw3qg')
    let willLogout = this.props.navigation.getParam('willLogout');
    let logout = this.props.navigation.getParam('logouter');
    return this.state.isLoading ? (
      <View style={styles.indicatorContainer}>
        <ActivityIndicator size="large" color={theme.lightElementColor} />
      </View>
    ) : (
      <View style={styles.container}>
        {willLogout ? (
          <Dialog
            title="Đăng xuất"
            description="Bạn có chắc muốn đăng xuất khỏi hệ thống ?"
            type="prompt"
            onAccept={logout}
            onCancel={() =>
              this.props.navigation.setParams({willLogout: false})
            }
          />
        ) : null}
        <View style={styles.contentWrapper}>
          <SearchBar
            value={this.state.searchText}
            searchTextCallback={this.updateSearchText}
            onRecognizeVoice={this.voiceRecognition.startRecognition}
            onSearchText={this.locationsFetcher.searchLocations}
          />
          <FiltersButton
            callbackValue={this.updateFiltersData}
            filtersData={this.state.filtersData}
            onSearchText={this.locationsFetcher.searchLocations}
          />
          <View style={styles.toggleContainer}>
            <Text style={styles.resultCaption}>Địa điểm/Tour gần bạn</Text>
            <Switch
              trackColor={{
                false: theme.darkBackground,
                true: theme.darkBackground,
              }}
              thumbColor={
                this.state.showPlaces ? theme.lightElementColor : '#f4f3f4'
              }
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => {
                if (this.state.showPlaces) {
                  this.fetchToursList();
                }
                this.setState({showPlaces: !this.state.showPlaces});
              }}
              value={this.state.showPlaces}
            />
          </View>
        </View>
        {this.flatListRenderer.renderLocationsFlatList(styles)}
        {this.flatListRenderer.renderToursFlatList(styles)}
        {this.state.fetchingLocations ? (
          <View style={styles.smallIndicator}>
            <ActivityIndicator color={theme.lightElementColor} />
          </View>
        ) : null}
        {this.state.started ? (
          <RecordingAminated
            onDestroyVoice={this.voiceRecognition.destroyRecognition}
          />
        ) : null}
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
  toggleContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  resultCaption: {
    marginTop: RFValue(13),
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: RFValue(21),
    lineHeight: RFValue(32),
    color: theme.fontColor,
    marginBottom: RFValue(15),
  },
  indicatorContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.pageColor,
  },
  smallIndicator: {
    width: '100%',
    height: RFValue(30),
    marginBottom: RFValue(10),
  },
});

export default Home;
