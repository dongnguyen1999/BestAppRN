import React, {Component} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import Dialog from '../../components/Dialog';
import theme from '../../themes/default';
import {RFValue} from 'react-native-responsive-fontsize';
import FlatListRenderer from '../../utilities/FlatListRenderer';
import fetchTours from '../../api/fetchTours';
import getCurrentPosition from '../../api/getCurrentLocation';

class AdminHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchingLocations: false,
      tours: [],
      currentToursIndex: 0,
      currentLocation: undefined,
    };
    this.isAdmin = true;
    this.maxNbToursShown = 15;
    this.updateToursIndex = this.updateToursIndex.bind(this);
    this.fetchToursList = this.fetchToursList.bind(this);
    this.flatListRenderer = new FlatListRenderer(this);
  }

  componentDidMount() {
    this.fetchToursList();
  }

  fetchToursList = async () => {
    this.setState({fetchingLocations: true, tours: []});
    let info = await getCurrentPosition();
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
      currentLocation: {lat: info.coords.latitude, lng: info.coords.longitude},
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
    let willLogout = this.props.navigation.getParam('willLogout');
    let logout = this.props.navigation.getParam('logouter');
    return (
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
        <View style={{flex: 1, width: '100%'}}>
          <Text style={styles.adminHeader}>Danh sách tour</Text>
          {this.state.fetchingLocations ? (
            <View style={styles.smallIndicator}>
              <ActivityIndicator color={theme.lightElementColor} />
            </View>
          ) : (
            this.flatListRenderer.renderToursFlatList(styles, false)
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
  adminHeader: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: RFValue(20),
    lineHeight: RFValue(32),
    color: 'white',
    marginTop: RFValue(14),
    marginBottom: RFValue(6),
    paddingLeft: RFValue(16),
    paddingRight: RFValue(16),
  },
  smallIndicator: {
    width: '100%',
    height: RFValue(30),
    marginBottom: RFValue(10),
  },
});

export default AdminHome;
