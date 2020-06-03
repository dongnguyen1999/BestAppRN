import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import theme from '../themes/default';
import * as Scaled from '../utilities/scaled';

class Input extends Component {
  constructor(props) {
    super(props);
    let value = props.value;
    this.state = {
      textInside: value ? value : '',
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
      titleStyle,
      value,
      type,
    } = this.props;
    return (
      <View style={styles.container}>
        <Text style={[styles.title, titleStyle]}>{title}</Text>
        <TextInput
          style={styles.textInput}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          keyboardType={type}
          autoCorrect={autoCorrect}
          autoCapitalize={autoCapitalize}
          returnKeyType={returnKeyType}
          onChangeText={text => {
            callbackValue(text);
            this.setState({textInside: text});
          }}
          value={value}
          // onBlur={() => callbackValue(this.state.textInside)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // display: 'flex',
    // flexDirection: 'column',
  },
  textInput: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: Scaled.fontSize(16),
    lineHeight: Scaled.height(18),
    color: 'rgba(255, 255, 255, 0.87)',
    borderBottomColor: theme.lightBackground,
    borderBottomWidth: Scaled.width(2),
    paddingTop: Scaled.height(1),
    paddingBottom: Scaled.height(8),
  },
  title: {
    marginTop: Scaled.height(30),
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: Scaled.fontSize(12),
    lineHeight: Scaled.height(12),
    color: theme.lightBackground,
    opacity: 0.87,
  },
});

export default Input;
