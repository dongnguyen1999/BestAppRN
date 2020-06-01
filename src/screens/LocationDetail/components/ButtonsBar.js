import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import theme from '../../../themes/default';
import Button from './Button';
import * as Scaled from '../../../utilities/scaled';

function ButtonsBar(props) {
  function renderTabs() {
    const {tabs, activeTab, onChangeTab} = props;
    return tabs
      ? tabs.map((title, index) => {
          return (
            <Button
              title={title}
              key={index}
              id={index}
              isActive={index == activeTab}
              onPress={onChangeTab}
            />
          );
        })
      : [];
  }
  return <View style={styles.container}>{renderTabs()}</View>;
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: Scaled.height(48),
    backgroundColor: theme.darkBackground,
    display: 'flex',
    flexDirection: 'row',
    borderTopWidth: Scaled.width(1.5),
    borderTopColor: theme.borderTabs,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 5,
  },
});

export default ButtonsBar;
