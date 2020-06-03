import React, {Component} from 'react';
import {View, Text, StyleSheet, ActivityIndicator, Button} from 'react-native';
import {usernameIcon} from '../../assets/images';
import firebaseApp from '../../utilities/firebaseApp';
import LoginForm from './components/LoginForm';
import FormButtons from './components/FormButtons';
import Suggestion from './components/Suggestion';
import {Screen} from '../../constants/sizes';
import RegisterForm from './components/RegisterForm';
import Dialog from '../../components/Dialog';
import {loginWithGoogle} from '../../utilities/googleSignIn';
import theme from '../../themes/default';
import * as Scaled from '../../utilities/scaled';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      username: '',
      password: '',
      confirmPassword: '',
      error: undefined,
      loggedInBy: undefined,
    };
    this.updateUsername = this.updateUsername.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.updateConfirmPassword = this.updateConfirmPassword.bind(this);
    this.errorCallback = this.errorCallback.bind(this);
    this.loggedInCallback = this.loggedInCallback.bind(this);
  }

  verifyAndRegister() {
    if (this.state.username === '' || this.state.password === '') {
      this.setState({error: 'FIELD_EMPTY_ERROR'});
    } else if (this.state.password !== this.state.confirmPassword) {
      this.setState({error: 'PASSWORD_CONFIRM_ERROR'});
    } else {
      this.registerAnAccount(this.state.username, this.state.password);
    }
  }

  showErrorDialog() {
    var onConfirmErrorMessage = () => {
      this.setState({error: undefined});
    };
    onConfirmErrorMessage = onConfirmErrorMessage.bind(this);
    let title, description;
    switch (this.state.error) {
      case 'PASSWORD_CONFIRM_ERROR':
        title = 'Mật khẩu không khớp';
        description =
          'Mật khẩủ và mật khẩu xác nhận không trùng khớp!\nVui lòng nhập lại';
        break;
      case 'FIELD_EMPTY_ERROR':
        title = 'Đầu vào không hợp lệ';
        description = 'Tài khoản và mật khẩu không được bỏ trống';
        break;
      default:
        if (this.state.error) {
          title = 'Lỗi đăng ký';
          description = this.state.error;
          break;
        }
        return null;
    }
    return (
      <Dialog
        title={title}
        description={description}
        onAccept={onConfirmErrorMessage}
      />
    );
  }

  registerAnAccount(username, password) {
    this.setState({isLoading: true});
    firebaseApp
      .auth()
      .createUserWithEmailAndPassword(username, password)
      .then(() => this.setState({isLoading: false, loggedInBy: 'EMAIL'}))
      .catch(this.errorCallback);
    // .catch(function(error) {
    //   // Handle Errors here.
    //   let errorCode = error.code;
    //   let errorMessage = error.message;
    //   this.setState({error: errorMessage});
    //   // console.log(errorCode);
    // });
  }

  updateUsername = username => this.setState({username: username});

  updatePassword = password => this.setState({password: password});

  updateConfirmPassword = password =>
    this.setState({confirmPassword: password});

  errorCallback = error =>
    this.setState({error: error.message, isLoading: false});

  loggedInCallback = method => this.setState({loggedInBy: method});

  render() {
    const {navigation} = this.props;
    if (this.state.loggedInBy) {
      navigation.navigate('Home', {loggedInBy: this.state.loggedInBy});
    }
    return this.state.isLoading ? (
      <View style={styles.indicatorContainer}>
        <ActivityIndicator size="large" color="theme.lightElementColor" />
      </View>
    ) : (
      <View style={styles.container}>
        <View>{this.showErrorDialog()}</View>
        <View style={styles.formWrapper}>
          <Text style={styles.appName}>STour</Text>
          <RegisterForm
            usernameCallback={this.updateUsername}
            passwordCallback={this.updatePassword}
            confirmPasswordCallback={this.updateConfirmPassword}
          />
          <FormButtons
            style={styles.formButtons}
            title="ĐĂNG KÝ"
            onPress={() => this.verifyAndRegister()}
            onGoogleSignIn={() =>
              loginWithGoogle(this.loggedInCallback, this.errorCallback)
            }
          />
          <Suggestion
            message="Có tài khoản?"
            action="Đăng nhập"
            onAction={() => navigation.navigate('Login')}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.pageColor,
    alignItems: 'center',
  },
  formWrapper: {
    width: '100%',
    paddingLeft: Scaled.width(16),
    paddingRight: Scaled.width(16),
    alignItems: 'center',
  },
  appName: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: Scaled.fontSize(44),
    lineHeight: Scaled.height(52),
    color: theme.lightElementColor,
    marginTop: Scaled.height(71),
  },
  formButtons: {
    marginTop: Scaled.height(24),
  },
  indicatorContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.pageColor,
  },
});

export default Register;
