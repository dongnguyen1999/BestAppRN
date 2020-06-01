import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {PixelRatio} from 'react-native';

export default class Scaled {
  constructor(baseWidth, baseHeight) {
    this.baseWidth = baseWidth;
    this.baseHeight = baseHeight;
  }
  width(pixcel) {
    let percent = (pixcel / this.baseWidth) * 100;
    return wp(percent);
  }
  height(pixcel) {
    let percent = (pixcel / this.baseHeight) * 100;
    return hp(percent);
  }
  fontSize(size) {
    // let percent = (size / (2 * (this.baseHeight + this.baseWidth))) * 100;
    // return hp(percent);
    return this.height(size);
  }
}
