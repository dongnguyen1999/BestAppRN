/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  LayoutAnimation,
  Image,
  ScrollView,
  Animated,
} from 'react-native';
import {recordingIcon} from '../../../assets/images';
import {RFValue} from 'react-native-responsive-fontsize';
import Voice from '@react-native-community/voice';

export default class RecordingAminated extends Component {
  state = {
    isPressed: true,
    animated: new Animated.Value(0),
    opacityA: new Animated.Value(1),
  };
  constructor(props) {
    super(props);
    this._onPress = this._onPress.bind(this);
  }
  _runAnimation() {
    const {animated, opacityA} = this.state;

    Animated.loop(
      Animated.parallel([
        Animated.timing(animated, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(opacityA, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: false,
        }),
      ]),
    ).start();
  }
  _stopAnimation() {
    Animated.loop(
      Animated.parallel([
        Animated.timing(this.state.animated),
        Animated.timing(this.state.opacityA),
      ]),
    ).stop();
  }
  _onPress() {
    this.setState(state => ({isPressed: false}));
  }
  _micButton() {
    const {isPressed, animated, opacityA} = this.state;
    if (isPressed) {
      //some function
      this._runAnimation();
      return (
        <Animated.View
          style={{
            width: RFValue(100),
            height: RFValue(100),
            borderRadius: RFValue(50),
            backgroundColor: 'rgba(255,0,0,1)',
            opacity: opacityA,
            transform: [
              {
                scale: animated,
              },
            ],
          }}>
          {/* icon or image */}
        </Animated.View>
      );
    } else {
      //some function
      return (
        <View
          style={{
            width: RFValue(100),
            height: RFValue(100),
            borderRadius: RFValue(50),
            backgroundColor: 'rgba(255,0,0,0.7)',
          }}>
          {/* icon or image */}
        </View>
      );
    }
  }

  render() {
    console.disableYellowBox = true;
    const {onDestroyVoice} = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => onDestroyVoice()}>
          {this._micButton()}
          <View style={styles.imgContainer}>
            <Image source={recordingIcon} style={styles.recordingIcon} />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: RFValue(450),
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  recordingIcon: {
    width: RFValue(75),
    height: RFValue(75),
  },
  imgContainer: {
    position: 'absolute',
    zIndex: -100,
    width: RFValue(100),
    height: RFValue(100),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
});
