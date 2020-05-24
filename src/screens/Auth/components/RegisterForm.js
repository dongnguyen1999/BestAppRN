import React from 'react';
import {View, StyleSheet} from 'react-native';
import Input from './Input';
import {RFValue} from 'react-native-responsive-fontsize';

function RegisterForm(props) {
  const {usernameCallback, passwordCallback, confirmPasswordCallback} = props;
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
      <Input
        title="Nhập lại mật khẩu"
        secureTextEntry={true}
        autoCorrect={true}
        callbackValue={confirmPasswordCallback}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'absolute',
    top: RFValue(170),
  },
});

export default RegisterForm;
