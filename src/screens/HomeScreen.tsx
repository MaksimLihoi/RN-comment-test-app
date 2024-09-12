import React, {FC, useState} from 'react';
import {Button, FlatList, StyleSheet, View} from 'react-native';
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

  const {comments, addComment} = useComments();

  const handleAddComment = () => {
    addComment(userId, newComment);
    setNewComment('');
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={comments.filter(comment => comment.parent_id === null)} // Фильтруем только корневые комментарии
        keyExtractor={comment => comment.id.toString()}
        renderItem={({item}) => (
          <Comment
            key={item.id}
            id={item.id}
            userName={item.username}
            text={item.comment}
            userId={userId}
            timeCreated={item.created_at}
          />
        )}
        contentContainerStyle={styles.listContent}
      />
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  listContent: {
    paddingBottom: 16,
  },
  addCommentsButtonContainer: {
    marginBottom: 10,
  },
});
export default HomeScreen;
