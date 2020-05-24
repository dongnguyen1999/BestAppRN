import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {RFValue} from 'react-native-responsive-fontsize';
import theme from '../../../themes/default';

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textInside: '',
    };
  }

  render() {
    const {
      title,
      placeholder,
      secureTextEntry,
      autoCorrect,
      autoCapitalize,
      returnKeyType,
      callbackValue,
    } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <TextInput
          style={styles.textInput}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          autoCorrect={autoCorrect}
          autoCapitalize={autoCapitalize}
          returnKeyType={returnKeyType}
          onChangeText={text => {
            callbackValue(text);
            this.setState({textInside: text});
          }}
          // onBlur={() => callbackValue(this.state.textInside)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    display: 'flex',
    flexDirection: 'column',
  },
  textInput: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: RFValue(16),
    lineHeight: RFValue(18),
    color: 'rgba(255, 255, 255, 0.87)',
    borderBottomColor: theme.lightBackground,
    borderBottomWidth: RFValue(2),
    paddingTop: RFValue(1),
    paddingBottom: RFValue(8),
  },
  title: {
    marginTop: RFValue(30),
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: RFValue(12),
    lineHeight: RFValue(12),
    color: theme.lightBackground,
    opacity: 0.87,
  },
});

export default Input;
