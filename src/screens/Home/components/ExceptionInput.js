import React, {Component} from 'react';
import {View, Text, TextInput} from 'react-native';
import {StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import theme from '../../../themes/default';
import {EXCEPT} from '../../../constants/offlineFilters';

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
  },
  title: {
    height: RFValue(40),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: theme.pageColor,
    borderWidth: RFValue(1),
    borderColor: theme.lightElementColor,
    borderRadius: RFValue(3),
  },
  titleText: {
    flex: 5,
    display: 'flex',
    justifyContent: 'center',
    paddingLeft: RFValue(8),
  },
  iconContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: RFValue(12),
    lineHeight: RFValue(20),
    color: theme.fontColor,
  },
  dropdownStyle: {
    width: RFValue(160),
    height: 'auto',
    borderWidth: RFValue(1),
    borderColor: theme.lightElementColor,
    borderRadius: RFValue(3),
    backgroundColor: theme.darkElementColor,
  },
  dropdownTextStyle: {
    height: RFValue(36),
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: RFValue(12),
    lineHeight: RFValue(20),
    color: theme.fontColor,
    backgroundColor: theme.darkElementColor,
    display: 'flex',
    justifyContent: 'center',
  },
  selectedTextStyle: {
    color: theme.fontColor,
  },
  caption: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: RFValue(12),
    lineHeight: RFValue(20),
    paddingLeft: RFValue(8),
    color: theme.fontColor,
  },
});

export default ExceptionInput;
