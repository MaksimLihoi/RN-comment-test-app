import React, {useState} from 'react';
import {Alert, Button, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {RouteNames} from '../navigators/AppNavigator.tsx';
import db from '../database/database.js';
import {CustomInput} from '../components';

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');

  const handleRegister = () => {
    if (!email || !username) {
      Alert.alert('Email и User Name обязательны');
      return;
    }

    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO Users (email, username) VALUES (?, ?)',
        [email, username],
        (_, results) => {
          if (results.rowsAffected > 0) {
            Alert.alert('Пользователь успешно зарегистрирован');
            navigation.navigate(RouteNames.HomeScreen);
          }
        },
        error => {
          Alert.alert('Ошибка регистрации: ', error.message);
        },
      );
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Регистрация</Text>
      <CustomInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        type="email"
      />
      <CustomInput
        placeholder="User Name"
        value={username}
        onChangeText={setUsername}
        type="text"
      />
      <Button title="Зарегистрироваться" onPress={handleRegister} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
});

export default RegisterScreen;
