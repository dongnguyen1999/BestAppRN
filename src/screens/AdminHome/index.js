import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  BackHandler,
} from 'react-native';
import Dialog from '../../components/Dialog';
import theme from '../../themes/default';
import FlatListRenderer from '../../utilities/FlatListRenderer';
import fetchTours from '../../api/fetchTours';
import * as Scaled from '../../utilities/scaled';
import StourButton from '../../components/StourButton';
import defaultLocation from '../../constants/defaultLocation';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import getCurrentPosition from '../../api/getCurrentLocation';

class AdminHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchingLocations: false,
      tours: [],
      currentToursIndex: 0,
      currentLocation: undefined,
      showErrorDialog: false,
    };
    this.isAdmin = true;
    this.maxNbToursShown = 15;
    this.updateToursIndex = this.updateToursIndex.bind(this);
    this.fetchToursList = this.fetchToursList.bind(this);
    this.flatListRenderer = new FlatListRenderer(this);
  }

  async componentDidMount() {
    await this.firstLoadScreen();
    await this.fetchToursList();
  }

  firstLoadScreen = async () => {
    this.setState({isLoading: true});
    let info = {};
    await RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
      interval: 10000,
      fastInterval: 5000,
    }).catch(e => this.setState({showErrorDialog: true, isLoading: false}));
    info = await getCurrentPosition().catch(e =>
      this.setState({showErrorDialog: true, isLoading: false}),
    );
    // console.log(info);
    let currentLocation =
      info && info.coords
        ? {
            lat: info.coords.latitude,
            lng: info.coords.longitude,
          }
        : defaultLocation;
    this.setState({
      isLoading: false,
      currentLocation: currentLocation,
    });
  };

  fetchToursList = async () => {
    this.setState({fetchingLocations: true, tours: []});
    let toursData = [];
    let response = await fetchTours();
    toursData = response.data;
    let maxIndex = Math.floor(toursData.length / this.maxNbToursShown);
    // toursData.sort(() => Math.random() - 0.5);
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

  render() {
    const {navigation} = this.props;
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
        {this.state.showErrorDialog ? (
          <Dialog
            title="Unknown location"
            description="Ứng dụng không thể truy cập vị trí hiện tại của bạn."
            suggestion="Hãy chắc chắn rằng bạn đã cấp quyền truy cập vị trí và có kết nối mạng ổn định"
            acceptLabel="Sử dụng vị trí mặc định"
            cancelLabel="Thoát"
            type="prompt"
            onAccept={() =>
              this.setState({
                currentLocation: defaultLocation,
                showErrorDialog: false,
              })
            }
            onCancel={() =>
              this.props.navigation.navigate('Login', {showSplashScreen: false})
            }
          />
        ) : null}
        <View style={{flex: 1, width: '100%'}}>
          <StourButton
            style={styles.insertButton}
            title="THÊM TOUR"
            tittleStyle={styles.insertButtonText}
            onPress={() =>
              navigation.navigate('AdjustTour', {
                id: undefined,
                onRefreshTours: this.fetchToursList,
                currentLocation: this.state.currentLocation,
              })
            }
          />
          <Text style={styles.adminHeader}>Danh sách tour</Text>
          {this.state.fetchingLocations ? (
            <View style={styles.smallIndicator}>
              <ActivityIndicator color={theme.lightElementColor} />
            </View>
          ) : (
            this.flatListRenderer.renderToursFlatList(styles)
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
    paddingRight: Scaled.height(16),
    marginBottom: Scaled.height(13),
  },
  adminHeader: {
    fontFamily: theme.fontFamily,
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: Scaled.fontSize(20),
    lineHeight: Scaled.height(32),
    color: 'white',
    marginTop: Scaled.height(14),
    marginBottom: Scaled.height(6),
    paddingLeft: Scaled.width(16),
    paddingRight: Scaled.width(16),
  },
  smallIndicator: {
    width: '100%',
    height: Scaled.height(30),
    marginBottom: Scaled.height(10),
  },
  insertButton: {
    marginLeft: Scaled.width(16),
    marginRight: Scaled.height(16),
    marginTop: Scaled.height(24),
    backgroundColor: theme.pageColor,
    borderWidth: Scaled.width(1),
    borderColor: theme.lightElementColor,
  },
  insertButtonText: {
    fontFamily: theme.fontFamily,
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: Scaled.fontSize(14),
    lineHeight: Scaled.height(24),
  },
  indicatorContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.pageColor,
  },
});

export default AdminHome;
