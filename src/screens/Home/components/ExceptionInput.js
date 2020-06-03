import React, {Component} from 'react';
import {View, Text, TextInput} from 'react-native';
import {StyleSheet} from 'react-native';
import theme from '../../../themes/default';
import {EXCEPT} from '../../../constants/offlineFilters';
import * as Scaled from '../../../utilities/scaled';

class ExceptionInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: this.props.value,
    };
  }

  componentDidMount() {
    const {callbackValue, value} = this.props;
    callbackValue(EXCEPT, value);
  }

  render() {
    const {value, callbackValue} = this.props;
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.caption}>Loại trừ</Text>
        </View>
        <View style={styles.title}>
          <TextInput
            style={[styles.titleText, styles.text]}
            placeholder="Danh sách từ khóa bị loại trừ: word1, word2, word3,..."
            placeholderTextColor="rgba(255, 255, 255, 0.2)"
            onSubmitEditing={() => callbackValue(EXCEPT, this.state.text)}
            onBlur={() => callbackValue(EXCEPT, this.state.text)}
            onChangeText={text => this.setState({text: text})}>
            {value}
          </TextInput>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    marginBottom: Scaled.height(3),
  },
  title: {
    height: Scaled.height(40),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: theme.pageColor,
    borderWidth: Scaled.width(1),
    borderColor: theme.lightElementColor,
    borderRadius: Scaled.fontSize(3),
  },
  titleText: {
    flex: 5,
    display: 'flex',
    justifyContent: 'center',
    paddingLeft: Scaled.width(8),
  },
  iconContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: theme.fontFamily,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: Scaled.fontSize(12),
    lineHeight: Scaled.height(20),
    color: theme.fontColor,
  },
  dropdownStyle: {
    width: Scaled.width(160),
    height: 'auto',
    borderWidth: Scaled.width(1),
    borderColor: theme.lightElementColor,
    borderRadius: Scaled.fontSize(3),
    backgroundColor: theme.darkElementColor,
  },
  dropdownTextStyle: {
    height: Scaled.height(36),
    fontFamily: theme.fontFamily,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: Scaled.fontSize(12),
    lineHeight: Scaled.height(20),
    color: theme.fontColor,
    backgroundColor: theme.darkElementColor,
    display: 'flex',
    justifyContent: 'center',
  },
  selectedTextStyle: {
    color: theme.fontColor,
  },
  caption: {
    fontFamily: theme.fontFamily,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: Scaled.fontSize(12),
    lineHeight: Scaled.height(20),
    paddingLeft: Scaled.width(8),
    color: theme.fontColor,
  },
});

export default ExceptionInput;
