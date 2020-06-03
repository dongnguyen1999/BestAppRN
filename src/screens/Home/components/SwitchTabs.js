import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import * as Scaled from '../../../utilities/scaled';
import theme from '../../../themes/default';

class SwitchTabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      switchValue: true,
    };
  }

  pressTabHandler = () => {
    const {callbackValue} = this.props;
    callbackValue(this.state.switchValue);
    this.setState({switchValue: !this.state.switchValue});
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => this.pressTabHandler()}
          style={[
            styles.tab,
            this.state.switchValue ? styles.activeTab : undefined,
          ]}>
          <Text
            style={[
              styles.text,
              this.state.switchValue ? styles.activeText : undefined,
            ]}>
            Địa điểm
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.pressTabHandler()}
          style={[
            styles.tab,
            !this.state.switchValue ? styles.activeTab : undefined,
          ]}>
          <Text
            style={[
              styles.text,
              !this.state.switchValue ? styles.activeText : undefined,
            ]}>
            Tour
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: Scaled.height(60),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: Scaled.height(10),
    paddingBottom: Scaled.height(10),
  },
  tab: {
    width: '46%',
    height: '100%',
    borderWidth: Scaled.width(1),
    borderColor: theme.lightElementColor,
    borderRadius: Scaled.fontSize(22),
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Nunito',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: Scaled.fontSize(18),
    lineHeight: Scaled.height(29),
    color: theme.lightElementColor,
  },
  activeTab: {
    backgroundColor: theme.lightElementColor,
  },
  activeText: {
    color: theme.fontColor,
  },
});

export default SwitchTabs;
