import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {SearchIcon, VoiceInputIcon} from '../assets/images';
import {RFValue} from 'react-native-responsive-fontsize';
import theme from '../themes/default';
import Voice from '@react-native-community/voice';

function SearchBar(props) {
  const {searchTextCallback, value, onRecognizeVoice, onSearchText} = props;
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.searchIcon}
        onPress={() => onSearchText()}>
        <SearchIcon width={RFValue(18)} height={RFValue(18)} />
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
        <VoiceInputIcon width={RFValue(18)} height={RFValue(18)} />
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
    height: RFValue(48),
    marginTop: RFValue(15),
    marginBottom: RFValue(12),
    width: '100%',
    backgroundColor: theme.darkElementColor,
    borderRadius: RFValue(3),
  },
  searchIcon: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    flex: 4,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: RFValue(16),
    lineHeight: RFValue(24),
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
