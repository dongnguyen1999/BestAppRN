import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {createAppContainer} from 'react-navigation';
import AppNavigator from './src/navigators/AppNavigator';
import HomeNavigator from './src/navigators/HomeNavigator';

const App = createAppContainer(AppNavigator);

export default App;
