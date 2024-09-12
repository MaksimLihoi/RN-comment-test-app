import React, {FC, useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';

interface CustomInputProps {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  type?: 'text' | 'email' | 'username';
}

const CustomInput: FC<CustomInputProps> = ({
  placeholder,
  value,
  onChangeText,
  type = 'text',
}) => {
  const [error, setError] = useState<string | null>(null);

  const validate = (text: string) => {
    if (type === 'email') {
      const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
      if (!emailRegex.test(text)) {
        setError('Invalid email address');
      } else {
        setError(null);
      }
    }

    if (type === 'username') {
      const usernameRegex = /^[a-zA-Z0-9]+$/;
      if (!usernameRegex.test(text)) {
        setError('Username can only contain letters and numbers');
      } else {
        setError(null);
      }
    }
  };

  const handleChangeText = (text: string) => {
    validate(text);
    onChangeText(text);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, error ? styles.invalidInput : null]}
        placeholder={placeholder}
        value={value}
        onChangeText={handleChangeText}
        keyboardType={type === 'email' ? 'email-address' : 'default'}
        autoCapitalize="none"
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    backgroundColor: '#fff',
  },
  invalidInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginTop: 4,
    fontSize: 12,
  },
});

export default CustomInput;
