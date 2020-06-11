import Geolocation from '@react-native-community/geolocation';
import {PermissionsAndroid} from 'react-native';

const getCurrentPosition = () => {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      info => {
        resolve(info);
      },
      error => reject(error),
      {
        enableHighAccuracy: false,
        timeout: 5000,
        maximumAge: 0,
      },
    );
  });
};

export default getCurrentPosition;
