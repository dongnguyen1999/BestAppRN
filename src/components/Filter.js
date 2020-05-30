import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import ModalDropdown from './ModalDropdown';
import {FacebookIcon, ArrowDownIcon, ArrowUpIcon} from '../assets/images';
import {RFValue} from 'react-native-responsive-fontsize';
import theme from '../themes/default';

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDropDown: false,
    };
  }

  componentDidMount() {
    const {title, callbackValue, selectedValue} = this.props;
    if (callbackValue) callbackValue(title, selectedValue);
  }

  changeDropDownState = flag => this.setState({isDropDown: flag});

  render() {
    const {
      title,
      listItem,
      callbackValue,
      style,
      selectedValue,
      onPop,
    } = this.props;
    return (
      <View onTouchStart={onPop} style={[styles.container, style]}>
        <View>
          <Text style={styles.caption}>{title}</Text>
        </View>
        <ModalDropdown
          options={listItem}
          onDropdownWillShow={async () => this.changeDropDownState(true)}
          onDropdownWillHide={() => this.changeDropDownState(false)}
          dropdownStyle={[
            styles.dropdownStyle,
            style
              ? {width: `${parseFloat(style.width.replace('%', '')) - 4}%`}
              : undefined,
          ]}
          dropdownTextStyle={styles.dropdownTextStyle}
          dropdownTextHighlightStyle={styles.selectedTextStyle}
          onSelect={(index, value) => {
            callbackValue(title, value);
            this.setState({selectedText: value});
          }}>
          <View style={styles.title}>
            <View style={styles.titleText}>
              <Text style={styles.text}>
                {selectedValue ? selectedValue : `Chọn ${title.toLowerCase()}`}
              </Text>
            </View>
            <View style={styles.iconContainer}>
              {this.state.isDropDown ? (
                <ArrowUpIcon width={RFValue(10)} height={RFValue(6)} />
              ) : (
                <ArrowDownIcon width={RFValue(10)} height={RFValue(6)} />
              )}
            </View>
          </View>
        </ModalDropdown>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: RFValue(160),
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

export default Filter;
