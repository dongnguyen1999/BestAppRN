import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import Home from '../screens/Home';
import theme from '../themes/default';
import {StyleSheet} from 'react-native';
import LogoutButton from '../components/LogoutButton';
import LocationDetail from '../screens/LocationDetail';
import TourDetail from '../screens/TourDetail';
import AdjustTour from '../screens/AdjustTour';
import AdminHome from '../screens/AdminHome';
import * as Scaled from '../utilities/scaled';

const homeNavigationOptions = (navigation, title) => {
  return {
    title: title,
    headerStyle: styles.header,
    headerTitleStyle: styles.headerTitle,
    headerTitleContainerStyle: styles.titleContainer,
    headerTintColor: theme.headerTintColor,
    headerRightContainerStyle: styles.rightContainer,
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
    title: title,
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
      navigationOptions(navigation, 'Chi tiết tour'),
  },
  LocationDetail: {
    screen: LocationDetail,
    navigationOptions: ({navigation}) =>
      navigationOptions(navigation, 'Chi tiết địa điểm'),
  },
});

const HomeNavigator = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: ({navigation}) =>
      homeNavigationOptions(navigation, 'Stour'),
  },
  AdminHomeStack: {
    screen: AdminHomeNavigator,
    navigationOptions: {headerShown: false},
  },
  TourDetail: {
    screen: TourDetail,
    navigationOptions: ({navigation}) =>
      navigationOptions(navigation, 'Chi tiết tour du lịch'),
  },
  LocationDetail: {
    screen: LocationDetail,
    navigationOptions: ({navigation}) =>
      navigationOptions(navigation, 'Chi tiết địa điểm'),
  },
});

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
    fontFamily: 'Roboto',
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

export default HomeNavigator;
