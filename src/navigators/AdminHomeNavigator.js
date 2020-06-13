import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import Home from '../screens/Home';
import theme from '../themes/default';
import {StyleSheet, Text, View} from 'react-native';
import LogoutButton from '../components/LogoutButton';
import LocationDetail from '../screens/LocationDetail';
import TourDetail from '../screens/TourDetail';
import AdjustTour from '../screens/AdjustTour';
import AdminHome from '../screens/AdminHome';
import * as Scaled from '../utilities/scaled';
import {SmallPalm, HeaderLogo} from '../assets/images';
import HomeHeader from '../components/HomeHeader';

const homeNavigationOptions = (navigation, title) => {
  return {
    title: title,
    headerStyle: styles.header,
    headerTitleStyle: styles.headerTitle,
    headerTitleContainerStyle: styles.titleContainer,
    headerTintColor: theme.headerTintColor,
    headerRightContainerStyle: styles.rightContainer,
    headerLeft: <View />,
    headerRight: () => {
      return (
        <LogoutButton
          navigation={navigation}
          loggedInBy={navigation.getParam('loggedInBy', undefined)}
        />
      );
    },
  };
};

const navigationOptions = (navigation, title) => {
  return {
    title: typeof title === 'string' ? title : title(navigation),
    headerStyle: styles.header,
    headerTitleStyle: [styles.headerTitle, styles.detailHeaderTitle],
    headerTitleContainerStyle: styles.titleContainer,
    headerTintColor: theme.headerTintColor,
  };
};

const AdminHomeNavigator = createStackNavigator({
  AdminHome: {
    screen: AdminHome,
    navigationOptions: ({navigation}) =>
      homeNavigationOptions(navigation, 'Admin'),
  },
  AdjustTour: {
    screen: AdjustTour,
    navigationOptions: ({navigation}) =>
      navigationOptions(navigation, nav => {
        let id = nav.getParam('id');
        return id ? 'Chi tiết tour' : 'Thêm tour';
      }),
  },
  LocationDetail: {
    screen: LocationDetail,
    navigationOptions: ({navigation}) =>
      navigationOptions(navigation, 'Chi tiết địa điểm'),
  },
});

export default AdminHomeNavigator;

const styles = StyleSheet.create({
  header: {
    backgroundColor: theme.lightBackground,
    height: Scaled.height(56),
  },
  titleContainer: {
    position: 'absolute',
    left: Scaled.width(24),
  },
  headerTitle: {
    fontFamily: theme.fontFamily,
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: Scaled.fontSize(19),
    lineHeight: Scaled.height(32),
    letterSpacing: Scaled.width(0.5),
  },
  detailHeaderTitle: {
    paddingLeft: Scaled.width(36),
  },
  rightContainer: {
    marginRight: Scaled.width(20),
  },
});
