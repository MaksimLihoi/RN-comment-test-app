import React, {FC, useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import AnswerCommentControls from './AnswerCommentControls.tsx';

export interface CommentProps {
  userName: string;
  comment: string;
}

const Comment: FC<CommentProps> = ({userName, comment}) => {
  const [isAnswerActive, setIsAnswerActive] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');

  return (
    <View style={styles.commentContainer}>
      <Text style={styles.userName}>{userName}</Text>
      <Text style={styles.commentText}>{comment}</Text>
      <Button
        title={'Ответить'}
        onPress={() => setIsAnswerActive(true)}
        disabled={isAnswerActive}
      />
      {isAnswerActive && (
        <AnswerCommentControls
          onDeclineButtonPress={() => setIsAnswerActive(false)}
          value={value}
          onChangeText={setValue}
        />
      )}
    </View>
  );
};

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

export default Comment;
