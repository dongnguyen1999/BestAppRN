import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Image} from 'react-native';
import {minhthu1Img, minhthuImg} from '../../../assets/images';
import theme from '../../../themes/default';
import * as Scaled from '../../../utilities/scaled';

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
    // height: Scaled.height(115),
    display: 'flex',
    flexDirection: 'row',
    borderBottomWidth: Scaled.width(1),
    borderBottomColor: theme.commentDividers,
  },
  username: {
    marginTop: Scaled.height(11),
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: Scaled.fontSize(14),
    lineHeight: Scaled.height(24),
    color: theme.fontColor,
  },
  time: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: Scaled.fontSize(12),
    lineHeight: Scaled.height(24),
    color: theme.fontColor,
  },
  comment: {
    fontFamily: 'Roboto',
    fontStyle: 'italic',
    fontWeight: 'normal',
    fontSize: Scaled.fontSize(13),
    lineHeight: Scaled.height(16),
    color: theme.fontColor,
    paddingRight: Scaled.width(15),
    paddingBottom: Scaled.height(11),
  },
  avatarView: {
    width: '20%',
    alignItems: 'center',
  },
  contentView: {
    flex: 1,
  },
  avatar: {
    width: Scaled.height(50),
    height: Scaled.height(50),
    borderRadius: Scaled.fontSize(25),
    marginBottom: Scaled.height(13),
    marginTop: Scaled.height(13),
  },
});

export default Comment;
