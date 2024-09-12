import React, {useState} from 'react';
import {Alert, Button, StyleSheet, Text, View} from 'react-native';

import {RootStackParamList, RouteNames} from '../navigators/AppNavigator';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useAuth} from '../hooks';
import {CustomInput} from '../components';

const AuthScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const {register, login} = useAuth();

  const handleAuth = () => {
    if (isLoginMode) {
      login(email).then(userId => {
        if (userId) {
          navigation.navigate(RouteNames.HomeScreen, {userId});
        } else {
          Alert.alert('Пользователь не найден');
        }
      });
    } else {
      if (!email || !username) {
        Alert.alert('Email и User Name обязательны');
        return;
      }
      register(email, username).then(userId => {
        if (userId) {
          navigation.navigate(RouteNames.HomeScreen, {userId});
        }
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isLoginMode ? 'Вход' : 'Регистрация'}</Text>
      <CustomInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        type={'email'}
      />
      {!isLoginMode && (
        <CustomInput
          placeholder="User Name"
          value={username}
          onChangeText={setUsername}
          type={'username'}
        />
      )}
      <View style={styles.registerButtonContainer}>
        <Button
          title={isLoginMode ? 'Войти' : 'Зарегистрироваться'}
          onPress={handleAuth}
        />
      </View>

      <Button
        title={isLoginMode ? 'Перейти к регистрации' : 'Перейти ко входу'}
        onPress={() => setIsLoginMode(prev => !prev)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  registerButtonContainer: {
    marginBottom: 10,
  },
});

export default AuthScreen;
