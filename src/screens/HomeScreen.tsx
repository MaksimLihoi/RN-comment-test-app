import React, {useEffect, useState} from 'react';
import {Button, ScrollView, StyleSheet, View} from 'react-native';
import db from '../database/database.js';
import {Comment, CustomInput} from '../components';

const HomeScreen = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [page, setPage] = useState(1);

  const fetchComments = () => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT Comments.*, Users.username FROM Comments
                   JOIN Users ON Comments.user_id = Users.id
                   WHERE parent_id IS NULL
                   ORDER BY created_at DESC
                   LIMIT 25 OFFSET ${(page - 1) * 25}`,
        [],
        (_, results) => {
          const rows = results.rows.raw();
          setComments(rows);
        },
      );
    });
  };

  const handleAddComment = () => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO Comments (user_id, comment) VALUES (?, ?)',
        [1, newComment],
        () => {
          fetchComments();
          setNewComment('');
        },
      );
    });
  };

  useEffect(() => {
    fetchComments();
  }, [page]);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {comments.map(comment => (
          <Comment
            key={comment.id}
            userName={comment.username}
            comment={comment.comment}
          />
        ))}
      </ScrollView>
      <CustomInput
        placeholder="Ваш комментарий"
        value={newComment}
        onChangeText={setNewComment}
      />
      <Button title="Добавить комментарий" onPress={handleAddComment} />
      <View style={styles.paginationButtons}>
        <Button
          title="Предыдущая"
          disabled={page <= 1}
          onPress={() => setPage(page - 1)}
        />

        <Button title="Следующая" onPress={() => setPage(page + 1)} />
      </View>
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
