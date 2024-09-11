import React, {FC} from 'react';
import {CustomInput} from '../index.ts';
import {Button, StyleSheet, View} from 'react-native';

interface AnswerCommentControlsProps {
  value: string;
  onChangeText: (value: string) => void;
  onDeclineButtonPress: () => void;
  onAddCommentPress: () => void;
}

const AnswerCommentControls: FC<AnswerCommentControlsProps> = ({
  value,
  onDeclineButtonPress,
  onChangeText,
  onAddCommentPress,
}) => {
  return (
    <View>
      <CustomInput
        placeholder={'Введите ответ'}
        value={value}
        onChangeText={onChangeText}
      />
      <View style={styles.buttonsContainer}>
        <Button
          title={'Отменить'}
          color={'red'}
          onPress={onDeclineButtonPress}
        />
        <Button title={'Отправить'} onPress={onAddCommentPress} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
});

export default AnswerCommentControls;
