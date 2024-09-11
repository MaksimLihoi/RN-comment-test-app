import React, {useState} from 'react';
import {Button, ScrollView, StyleSheet, View} from 'react-native';
import {Comment, CustomInput} from '../components';
import {useDatabase} from '../hooks';

const HomeScreen = () => {
  const [newComment, setNewComment] = useState('');

  const {fetchMoreComments, comments, addComment} = useDatabase();

  const handleAddComment = () => {
    // TODO:: Mock user id change when login with 'auth' will be ready
    addComment(1, newComment);
    setNewComment('');
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {comments.map(comment => {
          if (comment.parent_id === null) {
            return (
              <Comment
                key={comment.id}
                id={comment.id}
                userName={comment.username}
                text={comment.comment}
              />
            );
          }
        })}
      </ScrollView>
      <CustomInput
        placeholder="Ваш комментарий"
        value={newComment}
        onChangeText={setNewComment}
      />
      <Button title="Добавить комментарий" onPress={handleAddComment} />

      <Button title="Загрузить больше" onPress={fetchMoreComments} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    marginBottom: 16,
  },
  paginationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});
export default HomeScreen;
