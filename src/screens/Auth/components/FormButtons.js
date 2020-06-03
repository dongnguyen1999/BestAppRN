import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import SignInButton from './SignInButton';
import {GoogleIcon, FacebookIcon} from '../../../assets/images';
import StourButton from '../../../components/StourButton';
import * as Scaled from '../../../utilities/scaled';

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
            <GoogleIcon width={Scaled.height(18)} height={Scaled.height(18)} />
          </SignInButton>
        </View>
        <View style={styles.rightHalf}>
          <SignInButton title="FACEBOOK" onPress={() => console.log('press')}>
            <FacebookIcon
              width={Scaled.height(18)}
              height={Scaled.height(18)}
            />
          </SignInButton>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: Scaled.height(9),
  },
  text: {
    padding: Scaled.width(7),
    textAlign: 'center',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: Scaled.fontSize(13),
    lineHeight: Scaled.height(24),
    color: '#FFFFFF',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
export default FormButtons;
