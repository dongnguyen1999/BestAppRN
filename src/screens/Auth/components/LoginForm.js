import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import Input from '../../../components/Input';
import * as Scaled from '../../../utilities/scaled';

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
    marginTop: Scaled.height(20),
    width: '100%',
    height: Scaled.height(160),
  },
});

export default LoginForm;
