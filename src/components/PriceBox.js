import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import theme from '../themes/default';

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
    height: RFValue(34),
    width: '40%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: theme.lightElementColor,
    borderWidth: RFValue(1),
    borderRadius: RFValue(17),
  },
  priceText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: RFValue(17),
    lineHeight: RFValue(20),
    color: theme.lightElementColor,
  },
});

export default PriceBox;
