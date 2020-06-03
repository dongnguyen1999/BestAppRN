import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import theme from '../../themes/default';
import {SplashLogo} from '../../assets/images';
import * as Scaled from '../../utilities/scaled';

class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <SplashLogo width={Scaled.width(141)} height={Scaled.height(109)} />
        <Text style={styles.welcomeText}>
          Tìm kiếm địa điểm và tour phù hợp với sở thích của bạn
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.lightElementColor,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    width: Scaled.width(250),
    fontFamily: theme.fontFamily,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: Scaled.height(16),
    lineHeight: Scaled.height(22),
    textAlign: 'center',
    color: 'white',
    marginTop: Scaled.height(45),
  },
});

export default SplashScreen;
