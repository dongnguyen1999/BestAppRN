import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import ModalDropdown from './ModalDropdown';
import {FacebookIcon, ArrowDownIcon, ArrowUpIcon} from '../assets/images';
import theme from '../themes/default';
import * as Scaled from '../utilities/scaled';

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
      show,
      onPop,
    } = this.props;
    return (
      <View onTouchStart={onPop} style={[styles.container, style]}>
        <View>
          <Text style={styles.caption}>{title}</Text>
        </View>
        <ModalDropdown
          options={listItem}
          onDropdownWillShow={
            show ? async () => this.changeDropDownState(true) : undefined
          }
          onDropdownWillHide={() => this.changeDropDownState(false)}
          dropdownStyle={[
            styles.dropdownStyle,
            style
              ? {width: `${parseFloat(style.width.replace('%', '')) - 4}%`}
              : undefined,
          ]}
          show={show}
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
                <ArrowUpIcon
                  width={Scaled.width(10)}
                  height={Scaled.height(6)}
                />
              ) : (
                <ArrowDownIcon
                  width={Scaled.width(10)}
                  height={Scaled.height(6)}
                />
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
    width: Scaled.width(160),
    display: 'flex',
    flexDirection: 'column',
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

export default Filter;
