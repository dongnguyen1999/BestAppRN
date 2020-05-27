import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
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

function FunctionOptionsBar(props) {
  const {onDirection, onChangeTab, activeTab} = props;
  return (
    <View style={styles.container}>
      <FunctionOption
        icon={
          activeTab == 0 ? (
            <BlueDirection width={RFValue(20)} height={RFValue(20)} />
          ) : (
            <Direction width={RFValue(20)} height={RFValue(20)} />
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
              width={RFValue(22)}
              height={RFValue(22)}
              color={theme.lightElementColor}
            />
          ) : (
            <CommentIcon
              width={RFValue(22)}
              height={RFValue(22)}
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
            <BlueImagesLib width={RFValue(17)} height={RFValue(17)} />
          ) : (
            <ImagesLib width={RFValue(17)} height={RFValue(17)} />
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
    height: RFValue(75),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: theme.borderTabs,
    borderWidth: RFValue(1.5),
    elevation: 5,
  },
});

export default FunctionOptionsBar;
