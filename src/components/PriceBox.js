import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import theme from '../themes/default';
import * as Scaled from '../utilities/scaled';

class PriceBox extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
  }

  render() {
    const {price} = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.priceText}>{`${this.formatNumber(
          price,
        )} vnđ`}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: Scaled.height(34),
    width: Scaled.width(136),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: theme.lightElementColor,
    borderWidth: Scaled.width(1),
    borderRadius: Scaled.fontSize(17),
  },
  priceText: {
    fontFamily: theme.fontFamily,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: Scaled.width(17),
    lineHeight: Scaled.height(20),
    color: theme.lightElementColor,
  },
});

export default PriceBox;
