import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import SignInButton from './SignInButton';
import {GoogleIcon, FacebookIcon} from '../../../assets/images';
import StourButton from '../../../components/StourButton';

function FormButtons(props) {
  const {title, onPress, style, onGoogleSignIn} = props;
  return (
    <View style={[styles.container, style]}>
      <StourButton title={title} onPress={onPress} />
      <Text style={styles.text}>Hoặc</Text>
      <View style={styles.flexRow}>
        <View style={styles.leftHalf}>
          {/* <GoogleSignIn /> */}
          <SignInButton title="GOOGLE" onPress={onGoogleSignIn}>
            <GoogleIcon width={RFValue(18)} height={RFValue(18)} />
          </SignInButton>
        </View>
        <View style={styles.rightHalf}>
          <SignInButton title="FACEBOOK" onPress={() => console.log('press')}>
            <FacebookIcon width={RFValue(18)} height={RFValue(18)} />
          </SignInButton>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'absolute',
    top: RFValue(360),
  },
  text: {
    padding: RFValue(7),
    textAlign: 'center',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: RFValue(13),
    lineHeight: RFValue(24),
    color: '#FFFFFF',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
export default FormButtons;
