import React, {FC, memo, useEffect, useState} from 'react';
import {
  Button,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AnswerCommentControls from './AnswerCommentControls.tsx';
import {useComments} from '../../hooks';
import {Comment as CommentType} from '../../types/comentTypes.ts';

export interface CommentProps {
  userName: string;
  text: string;
  id: number;
  userId: number;
  timeCreated: string;
}

const Comment: FC<CommentProps> = memo(
  ({userName, text, id, userId, timeCreated}) => {
    const [isAnswerActive, setIsAnswerActive] = useState<boolean>(false);
    const [reply, setReply] = useState<string>('');
    const [replies, setReplies] = useState<CommentType[]>([]);
    const {addComment, fetchReplies} = useComments();

    const handleAddComment = () => {
      addComment(userId, reply, id);
      setReply('');
      setIsAnswerActive(false);
      fetchReplies(id).then(setReplies);
    };

    useEffect(() => {
      fetchReplies(id).then(setReplies);
    }, [id]);

    return (
      <View style={styles.commentContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.userName}>{userName}</Text>
          <Text>{timeCreated}</Text>
        </View>

        <Text style={styles.commentText}>{text}</Text>
        {[...replies].reverse().map(repliedComment => (
          <Comment
            key={repliedComment.id}
            userName={repliedComment.username}
            text={repliedComment.comment}
            id={repliedComment.id}
            userId={userId}
            timeCreated={repliedComment.created_at}
          />
        ))}
        {Platform.OS === 'ios' ? (
          <Button
            title={'Ответить'}
            onPress={() => setIsAnswerActive(true)}
            disabled={isAnswerActive}
          />
        ) : (
          <TouchableOpacity
            style={styles.buttonAndroid}
            onPress={() => setIsAnswerActive(true)}
            disabled={isAnswerActive}>
            <Text
              style={
                isAnswerActive
                  ? styles.disabledButtonTextColor
                  : styles.activeButtonTextColor
              }>
              Ответить
            </Text>
          </TouchableOpacity>
        )}
        {isAnswerActive && (
          <AnswerCommentControls
            onDeclineButtonPress={() => setIsAnswerActive(false)}
            value={reply}
            onChangeText={setReply}
            onAddCommentPress={handleAddComment}
          />
        )}
      </View>
    );
  },
);

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
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    marginBottom: 8,
  },
  buttonAndroid: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 16,
  },
  activeButtonTextColor: {
    color: 'blue',
  },
  disabledButtonTextColor: {
    color: 'grey',
  },
});

export default Comment;
