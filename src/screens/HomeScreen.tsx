import React, {useEffect, useState} from 'react';
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import db from '../database/database.js';

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
          <View key={comment.id} style={styles.commentContainer}>
            <Text style={styles.username}>{comment.username}</Text>
            <Text style={styles.commentText}>{comment.comment}</Text>
          </View>
        ))}
      </ScrollView>
      <TextInput
        style={styles.input}
        placeholder="Ваш комментарий"
        value={newComment}
        onChangeText={setNewComment}
      />
      <Button title="Добавить комментарий" onPress={handleAddComment} />
      <View style={styles.paginationButtons}>
        <Button title="Следующая страница" onPress={() => setPage(page + 1)} />
        {page > 1 && (
          <Button
            title="Предыдущая страница"
            onPress={() => setPage(page - 1)}
          />
        )}
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
  commentContainer: {
    backgroundColor: '#fff',
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  commentText: {
    fontSize: 14,
    color: '#555',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  paginationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});
export default HomeScreen;
