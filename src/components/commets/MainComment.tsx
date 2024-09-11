import React, {FC, memo, useEffect, useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import AnswerCommentControls from './AnswerCommentControls.tsx';
import {useDatabase} from '../../hooks';
import {Comment} from '../../types/comentTypes.ts';

export interface MainComment {
  userName: string;
  text: string;
  id: number;
}

const MainComment: FC<MainComment> = memo(({userName, text, id}) => {
  const [isAnswerActive, setIsAnswerActive] = useState<boolean>(false);
  const [reply, setReply] = useState<string>('');
  const [replies, setReplies] = useState<Comment[]>([]);
  const {addComment, fetchReplies} = useDatabase();

  const handleAddComment = () => {
    // TODO:: Mock user id change when login with 'auth' will be ready
    addComment(2, reply, id);
    setReply('');
    setIsAnswerActive(false);
    fetchReplies(id).then(setReplies);
  };

  useEffect(() => {
    fetchReplies(id).then(setReplies);
  }, [id]);

  return (
    <View style={styles.commentContainer}>
      <Text style={styles.userName}>{userName}</Text>
      <Text style={styles.commentText}>{text}</Text>
      <Button
        title={'Ответить'}
        onPress={() => setIsAnswerActive(true)}
        disabled={isAnswerActive}
      />
      {isAnswerActive && (
        <AnswerCommentControls
          onDeclineButtonPress={() => setIsAnswerActive(false)}
          value={reply}
          onChangeText={setReply}
          onAddCommentPress={handleAddComment}
        />
      )}
      {replies.map(repliedComment => (
        <MainComment
          userName={repliedComment.username}
          text={repliedComment.comment}
          id={repliedComment.id}
        />
      ))}
    </View>
  );
});

const styles = StyleSheet.create({
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
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  commentText: {
    fontSize: 14,
    color: '#555',
  },
});

export default MainComment;
