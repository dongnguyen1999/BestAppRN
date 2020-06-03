import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import theme from '../../../themes/default';
import * as Scaled from '../../../utilities/scaled';

function FunctionOption(props) {
  const {title, icon, onPress, isActive} = props;
  return (
    <TouchableOpacity
      style={[styles.container, isActive ? styles.activeContainer : undefined]}
      onPress={onPress}>
      <View style={styles.content}>
        <View style={styles.icon}>{icon}</View>
        <View style={styles.title}>
          <Text
            style={[
              styles.textTitle,
              isActive ? styles.activeTextTitle : undefined,
            ]}>
            {title}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: Scaled.width(10),
    marginRight: Scaled.width(10),
  },
  activeContainer: {
    borderBottomColor: theme.lightElementColor,
    borderBottomWidth: Scaled.width(1),
  },
  icon: {
    flex: 1,
    margin: Scaled.width(10),
    marginBottom: -Scaled.height(10),
  },
  title: {
    flex: 1,
  },
  textTitle: {
    fontFamily: theme.fontFamily,
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: Scaled.fontSize(14),
    lineHeight: Scaled.height(24),
    color: theme.fontButtonTabs,
  },
  activeTextTitle: {
    color: theme.lightElementColor,
  },
  content: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
});

export default FunctionOption;
