import React from 'react';
import {View, StyleSheet} from 'react-native';
import DialogBuilder from 'react-native-dialog';
import theme from '../themes/default';

function Dialog(props) {
  const {
    title,
    description,
    type,
    onAccept,
    onCancel,
    acceptLabel,
    cancelLabel,
    suggestion,
  } = props;
  return (
    <View>
      <DialogBuilder.Container visible={true}>
        <DialogBuilder.Title>{title}</DialogBuilder.Title>
        <DialogBuilder.Description>{description}</DialogBuilder.Description>
        {suggestion ? (
          <DialogBuilder.Description>{suggestion}</DialogBuilder.Description>
        ) : (
          undefined
        )}
        {type === 'prompt' ? (
          <View style={styles.prompt}>
            <DialogBuilder.Button
              label={cancelLabel ? cancelLabel : 'Cancel'}
              onPress={onCancel}
              style={styles.button}
            />
            <DialogBuilder.Button
              label={acceptLabel ? acceptLabel : 'Oki'}
              onPress={onAccept}
              style={styles.button}
            />
          </View>
        ) : (
          <DialogBuilder.Button
            label={acceptLabel ? acceptLabel : 'Oki'}
            onPress={onAccept}
            style={styles.button}
          />
        )}
      </DialogBuilder.Container>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    color: theme.lightElementColor,
  },
  prompt: {
    display: 'flex',
    flexDirection: 'row-reverse',
  },
});

export default Dialog;
