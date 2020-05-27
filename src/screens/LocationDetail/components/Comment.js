import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {Image} from 'react-native';
import {minhthu1Img, minhthuImg} from '../../../assets/images';
import theme from '../../../themes/default';

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {imgSrc, name, time, comment} = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.avatarView}>
          <Image source={imgSrc} style={styles.avatar} />
        </View>
        <View style={styles.contentView}>
          <Text style={styles.username} numberOfLines={1}>
            {name}
          </Text>
          <Text style={styles.time} numberOfLines={1}>
            {time}
          </Text>
          <Text style={styles.comment}>"{comment}"</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    // height: RFValue(115),
    display: 'flex',
    flexDirection: 'row',
    borderBottomWidth: RFValue(1),
    borderBottomColor: theme.commentDividers,
  },
  username: {
    marginTop: RFValue(11),
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: RFValue(14),
    lineHeight: RFValue(24),
    color: theme.fontColor,
  },
  time: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: RFValue(12),
    lineHeight: RFValue(24),
    color: theme.fontColor,
  },
  comment: {
    fontFamily: 'Roboto',
    fontStyle: 'italic',
    fontWeight: 'normal',
    fontSize: RFValue(13),
    lineHeight: RFValue(16),
    color: theme.fontColor,
    paddingRight: RFValue(15),
    paddingBottom: RFValue(11),
  },
  avatarView: {
    width: '20%',
    alignItems: 'center',
  },
  contentView: {
    flex: 1,
  },
  avatar: {
    width: RFValue(50),
    height: RFValue(50),
    borderRadius: RFValue(25),
    marginBottom: RFValue(13),
    marginTop: RFValue(13),
  },
});

export default Comment;
