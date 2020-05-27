import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import theme from '../../../themes/default';

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
    marginLeft: RFValue(10),
    marginRight: RFValue(10),
  },
  activeContainer: {
    borderBottomColor: theme.lightElementColor,
    borderBottomWidth: RFValue(1),
  },
  icon: {
    flex: 1,
    margin: RFValue(20),
    marginBottom: -RFValue(10),
  },
  title: {
    flex: 1,
  },
  textTitle: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: RFValue(14),
    lineHeight: RFValue(24),
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
