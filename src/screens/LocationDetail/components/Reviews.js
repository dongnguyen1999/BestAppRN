import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import theme from '../../../themes/default';
import Comment from './Comment';
import {FlatList} from 'react-native-gesture-handler';

function Reviews(props) {
  const {reviews} = props;
  function renderComments({index, item}) {
    let key = index;
    let review = item;
    return (
      <Comment
        key={key}
        imgSrc={{uri: review.profile_photo_url}}
        name={review.author_name}
        time={review.relative_time_description}
        comment={review.text}
      />
    );
  }
  return (
    <View style={styles.container}>
      <FlatList data={reviews} renderItem={renderComments} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.pageColor,
  },
});

export default Reviews;
