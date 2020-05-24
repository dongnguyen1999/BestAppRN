import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import Input from './Input';
import {RFValue} from 'react-native-responsive-fontsize';

function LoginForm(props) {
  const {usernameCallback, passwordCallback} = props;
  return (
    <View style={styles.container}>
      <Input
        title="Tên đăng nhập hoặc Email"
        autoCorrect={true}
        callbackValue={usernameCallback}
      />
      <Input
        title="Mật khẩu"
        secureTextEntry={true}
        autoCorrect={true}
        callbackValue={passwordCallback}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: RFValue(170),
    width: '100%',
  },
});

export default LoginForm;
