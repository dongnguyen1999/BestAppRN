import Geolocation from '@react-native-community/geolocation';

const getCurrentPosition = () => {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      info => {
        resolve(info);
      },
      error => reject(error),
    );
  });
};

export default getCurrentPosition;
