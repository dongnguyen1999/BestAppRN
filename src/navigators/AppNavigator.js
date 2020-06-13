import {createSwitchNavigator} from 'react-navigation';
import Auth from '../screens/Auth';
import HomeNavigator from './HomeNavigator';
import AdminHomeNavigator from './AdminHomeNavigator';

const AppNavigator = createSwitchNavigator(
  {
    // Register: {screen: Auth.Register},
    Login: {screen: Auth.Login},
    Register: {screen: Auth.Register},
    HomeStack: {screen: HomeNavigator},
    AdminHomeStack: {screen: AdminHomeNavigator},
  },
  {
    initialRouteName: 'Login',
  },
);

export default AppNavigator;
