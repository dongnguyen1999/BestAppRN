import Geolocation from '@react-native-community/geolocation';

const getCurrentPosition = () => {
  return new Promise(resolve => {
    Geolocation.getCurrentPosition(info => {
      resolve(info);
    });
  });
};

export default getCurrentPosition;
