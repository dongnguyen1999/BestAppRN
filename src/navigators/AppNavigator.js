import {createSwitchNavigator} from 'react-navigation';
import Auth from '../screens/Auth';
import HomeNavigator from './HomeNavigator';

const AppNavigator = createSwitchNavigator(
  {
    // Register: {screen: Auth.Register},
    Login: {screen: Auth.Login},
    Register: {screen: Auth.Register},
    HomeStack: {screen: HomeNavigator},
    // Auth: {screen: Auth, navigationOptions: {title: 'Log in'}},
  },
  {
    initialRouteName: 'Login',
  },
);

export default AppNavigator;
