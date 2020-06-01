import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const BASE_WITH = 360;
const BASE_HEIGHT = 640;

export const width = pixcel => {
  let percent = (pixcel / BASE_WITH) * 100;
  return wp(percent);
};
export const height = pixcel => {
  let percent = (pixcel / BASE_HEIGHT) * 100;
  return hp(percent);
};
export const fontSize = size => {
  // let percent = (size / (2 * (this.baseHeight + this.baseWidth))) * 100;
  // return hp(percent);
  return height(size);
};
