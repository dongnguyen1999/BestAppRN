import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import FunctionOption from './FunctionOption';
import {
  Direction,
  CommentIcon,
  ImagesLib,
  BlueDirection,
  BlueCommentIcon,
  BlueImagesLib,
} from '../../../assets/images';
import theme from '../../../themes/default';
import * as Scaled from '../../../utilities/scaled';

function FunctionOptionsBar(props) {
  const {onDirection, onChangeTab, activeTab} = props;
  return (
    <View style={styles.container}>
      <FunctionOption
        icon={
          activeTab == 0 ? (
            <BlueDirection
              width={Scaled.height(20)}
              height={Scaled.height(20)}
            />
          ) : (
            <Direction width={Scaled.height(20)} height={Scaled.height(20)} />
          )
        }
        title="DẪN ĐƯỜNG"
        onPress={() => {
          onChangeTab(0);
          onDirection();
        }}
        isActive={activeTab == 0}
      />
      <FunctionOption
        icon={
          activeTab == 1 ? (
            <BlueCommentIcon
              width={Scaled.height(22)}
              height={Scaled.height(22)}
              color={theme.lightElementColor}
            />
          ) : (
            <CommentIcon
              width={Scaled.height(22)}
              height={Scaled.height(22)}
              color={theme.lightElementColor}
            />
          )
        }
        title="ĐÁNH GIÁ"
        onPress={() => onChangeTab(1)}
        isActive={activeTab == 1}
      />
      <FunctionOption
        icon={
          activeTab == 2 ? (
            <BlueImagesLib
              width={Scaled.width(17)}
              height={Scaled.height(17)}
            />
          ) : (
            <ImagesLib width={Scaled.width(17)} height={Scaled.height(17)} />
          )
        }
        title="HÌNH ẢNH"
        onPress={() => onChangeTab(2)}
        isActive={activeTab == 2}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.darkElementColor,
    width: '100%',
    height: Scaled.height(65),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: theme.borderTabs,
    borderWidth: Scaled.width(1.5),
    elevation: 5,
  },
});

export default FunctionOptionsBar;
