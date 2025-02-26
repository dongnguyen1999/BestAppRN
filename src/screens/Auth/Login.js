import React, {Component} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import firebaseApp from '../../utilities/firebaseApp';
import LoginForm from './components/LoginForm';
import FormButtons from './components/FormButtons';
import Suggestion from './components/Suggestion';
import Dialog from '../../components/Dialog';
import {GoogleSignin} from '@react-native-community/google-signin';
import {
  loginWithGoogle,
  googleSignInConfig,
} from '../../utilities/googleSignIn';
import theme from '../../themes/default';
import * as Scaled from '../../utilities/scaled';
import SplashScreen from '../SplashScreen';
import {SmallPalm, BlueBestTour} from '../../assets/images';
class Login extends Component {
  constructor(props) {
    super(props);
    const {navigation} = props;
    let showSplashScreen = navigation.getParam('showSplashScreen');
    this.state = {
      isLoading: true,
      username: '',
      password: '',
      error: undefined,
      loggedInBy: undefined,
      showSplashScreen: showSplashScreen === false ? false : true,
    };
    this.updateUsername = this.updateUsername.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.errorCallback = this.errorCallback.bind(this);
    this.loggedInCallback = this.loggedInCallback.bind(this);
  }

  componentDidMount() {
    this.showSplashScreen();
    this.checkLoggedIn();
    googleSignInConfig();
  }

  showSplashScreen = async () => {
    const showingTime = 2000;
    setTimeout(() => this.setState({showSplashScreen: false}), showingTime);
  };

  checkLoggedIn = async () => {
    const user = await this.isLoggedInWithAccount();
    if (user) {
      this.loggedInCallback('EMAIL');
    }
    const isSignedIn = await this.isLoggedInWithGoogle();
    if (isSignedIn) {
      this.loggedInCallback('GOOGLE');
    }
    this.setState({isLoading: false});
  };

  isLoggedInWithAccount() {
    return new Promise(resolve => {
      firebaseApp.auth().onAuthStateChanged(user => {
        resolve(user);
      });
    });
  }

  isLoggedInWithGoogle = async () => {
    let profile = await GoogleSignin.getCurrentUser();
    return profile ? profile.user : null;
  };

  verifyAndLogin() {
    if (this.state.username === '' || this.state.password === '') {
      this.setState({error: 'FIELD_EMPTY_ERROR'});
    } else {
      this.loginWithAccount(this.state.username, this.state.password);
    }
  }

  loginWithAccount(username, password) {
    this.setState({isLoading: true});
    firebaseApp
      .auth()
      .signInWithEmailAndPassword(username, password)
      .then(() => this.setState({isLoading: false, loggedInBy: 'EMAIL'}))
      .catch(this.errorCallback);
  }

  showErrorDialog() {
    var onConfirmErrorMessage = () => {
      this.setState({error: undefined});
    };
    onConfirmErrorMessage = onConfirmErrorMessage.bind(this);
    let title, description;
    switch (this.state.error) {
      case 'FIELD_EMPTY_ERROR':
        title = 'Đầu vào không hợp lệ';
        description = 'Tài khoản và mật khẩu không được bỏ trống';
        break;
      default:
        if (this.state.error) {
          title = 'Lỗi đăng nhập';
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

  updateUsername = username => this.setState({username: username});

  updatePassword = password => this.setState({password: password});

  errorCallback = error =>
    this.setState({error: error.message, isLoading: false});

  loggedInCallback = method =>
    this.setState({loggedInBy: method, isLoading: false});

  getLoggedInEmail = async () => {
    const loggedInBy = this.state.loggedInBy;
    let user;
    if (loggedInBy === 'GOOGLE') {
      user = await this.isLoggedInWithGoogle();
    }
    if (loggedInBy === 'EMAIL') {
      user = await this.isLoggedInWithAccount();
    }
    return user ? user.email : null;
  };

  checkIsAdmin(email) {
    //...temp
    // console.log(email);
    return email === 'huynhhoangan@gmail.com';
  }

  render() {
    // console.log(this.state.isLoading);
    // console.log(this.state.loggedInBy);
    console.disableYellowBox = true;
    const {navigation} = this.props;
    if (this.state.loggedInBy && !this.state.showSplashScreen) {
      this.getLoggedInEmail().then(email => {
        let isAdmin = this.checkIsAdmin(email);
        console.log(isAdmin);
        if (isAdmin)
          navigation.navigate('AdminHome', {
            loggedInBy: this.state.loggedInBy,
          });
        else navigation.navigate('Home', {loggedInBy: this.state.loggedInBy});
      });
    }
    if (this.state.showSplashScreen) return <SplashScreen />;
    return this.state.isLoading ? (
      <View style={styles.indicatorContainer}>
        <ActivityIndicator size="large" color={theme.lightElementColor} />
      </View>
    ) : (
      <View style={styles.container}>
        {this.showErrorDialog()}
        <View style={styles.formWrapper}>
          {/* <Text style={styles.appName}>STour</Text> */}
          <View style={styles.appName}>
            <BlueBestTour
              width={Scaled.width(250)}
              height={Scaled.height(100)}
            />
          </View>

          <LoginForm
            usernameCallback={this.updateUsername}
            passwordCallback={this.updatePassword}
          />
          <FormButtons
            title="ĐĂNG NHẬP"
            onPress={() => this.verifyAndLogin()}
            onGoogleSignIn={() => {
              this.setState({isLoading: true});
              loginWithGoogle(this.loggedInCallback, this.errorCallback);
            }}
          />
          <Suggestion
            message="Chưa có tài khoản?"
            action="Đăng ký"
            onAction={() => navigation.navigate('Register')}
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
    fontFamily: theme.fontFamily,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: Scaled.fontSize(44),
    lineHeight: Scaled.height(52),
    color: theme.lightElementColor,
    marginTop: Scaled.height(71),
  },
  indicatorContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.pageColor,
  },
  appNameContainer: {
    width: '100%',
    textAlign: 'center',
    backgroundColor: 'pink',
  },
});

export default Login;
