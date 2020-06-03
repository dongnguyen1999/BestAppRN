import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {SearchIcon, VoiceInputIcon} from '../assets/images';
import theme from '../themes/default';
import Voice from '@react-native-community/voice';
import * as Scaled from '../utilities/scaled';

function SearchBar(props) {
  const {searchTextCallback, value, onRecognizeVoice, onSearchText} = props;
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.searchIcon}
        onPress={() => onSearchText()}>
        <SearchIcon width={Scaled.width(18)} height={Scaled.height(18)} />
      </TouchableOpacity>
      <TextInput
        style={styles.textInput}
        placeholder="Nhập địa điểm"
        placeholderTextColor={theme.placeholderColor}
        onChangeText={text => searchTextCallback(text)}
        onSubmitEditing={onSearchText}>
        {value}
      </TextInput>
      <TouchableOpacity
        style={styles.voiceInputIcon}
        onPress={onRecognizeVoice}>
        <VoiceInputIcon width={Scaled.width(18)} height={Scaled.height(18)} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: Scaled.height(48),
    marginTop: Scaled.height(15),
    marginBottom: Scaled.height(12),
    width: '100%',
    backgroundColor: theme.darkElementColor,
    borderRadius: Scaled.fontSize(3),
  },
  searchIcon: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    flex: 4,
    fontFamily: theme.fontFamily,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: Scaled.fontSize(16),
    lineHeight: Scaled.height(24),
    color: theme.fontColor,
  },
  voiceInputIcon: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SearchBar;
