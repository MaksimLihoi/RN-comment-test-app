import React, {FC, useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';

interface CustomInputProps {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  type?: 'text' | 'email';
}

const CustomInput: FC<CustomInputProps> = ({
  placeholder,
  value,
  onChangeText,
  type = 'text',
}) => {
  const [isValid, setIsValid] = useState<boolean>(true);

  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return emailRegex.test(email);
  };

  const handleChangeText = (text: string) => {
    if (type === 'email') {
      setIsValid(validateEmail(text));
    }
    onChangeText(text);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={[
          styles.input,
          !isValid && type === 'email' ? styles.invalidInput : null,
        ]}
        placeholder={placeholder}
        value={value}
        onChangeText={handleChangeText}
        keyboardType={type === 'email' ? 'email-address' : 'default'}
        autoCapitalize="none"
      />
      {!isValid && type === 'email' && (
        <Text style={styles.errorText}>Неверный email</Text>
      )}
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
