import React, {FC, useState} from 'react';
import {Button, ScrollView, StyleSheet, View} from 'react-native';
import {Comment, CustomInput} from '../components';
import {useComments} from '../hooks';
import {RootStackParamList, RouteNames} from '../navigators/AppNavigator.tsx';
import {RouteProp} from '@react-navigation/native';

type HomeScreenRouteProp = RouteProp<RootStackParamList, RouteNames.HomeScreen>;

interface HomeScreenProps {
  route: HomeScreenRouteProp;
}

const HomeScreen: FC<HomeScreenProps> = ({route}) => {
  const {userId} = route.params;
  const [newComment, setNewComment] = useState('');

  const {fetchMoreComments, comments, addComment} = useComments();

  const handleAddComment = () => {
    addComment(userId, newComment);
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
                userId={userId}
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
      <View style={styles.addCommentsButtonContainer}>
        <Button
          disabled={!newComment}
          title="Добавить комментарий"
          onPress={handleAddComment}
        />
      </View>

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
  addCommentsButtonContainer: {
    marginBottom: 10,
  },
});
export default HomeScreen;
