import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import firebaseApp from '../utilities/firebaseApp';
import {GoogleSignin} from '@react-native-community/google-signin';
import theme from '../themes/default';
import {LogoutIcon} from '../assets/images';
import * as Scaled from '../utilities/scaled';

class LogoutButton extends Component {
  constructor(props) {
    super(props);
    this.loggedInBy = this.props.loggedInBy || undefined;
    this.state = {
      willLogout: false,
    };
    this.logout = this.logout.bind(this);
  }

  willLogout = () =>
    this.props.navigation.setParams({willLogout: true, logouter: this.logout});

  logout() {
    switch (this.loggedInBy) {
      case 'EMAIL':
        this.logoutAccount();
        break;
      case 'GOOGLE':
        this.logoutGoogle();
        break;
    }
  }

  logoutAccount() {
    firebaseApp
      .auth()
      .signOut()
      .then(() => this.props.navigation.navigate('Login', {loggedOut: true}))
      .catch(function(error) {
        console.log(error);
      });
  }
  logoutGoogle = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      this.props.navigation.navigate('Login', {loggedOut: true});
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    return (
      <TouchableOpacity
        style={styles.logoutButton}
        activeOpacity={0.5}
        onPress={() => this.willLogout()}>
        <LogoutIcon width={Scaled.width(22)} height={Scaled.height(18)} />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutButton: {
    backgroundColor: theme.lightElementColor,
  },
});

export default LogoutButton;
