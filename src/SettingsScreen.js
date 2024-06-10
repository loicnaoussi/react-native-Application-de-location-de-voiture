import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import axios from 'axios';

const SettingsScreen = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/users/register', {
        username,
        password,
      });
      Alert.alert('Success', response.data.message);
    } catch (error) {
      Alert.alert('Error', error.response.data.error);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', {
        username,
        password,
      });
      Alert.alert('Success', `Token: ${response.data.token}`);
    } catch (error) {
      Alert.alert('Error', error.response.data.error);
    }
  };

  const logo = require('/home/fores06/Documents/Projets Actuels/Formation expo/react-native-rent-a-car/assets/splash.png');

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <Text style={styles.title}>{isLogin ? 'Login' : 'Register'}</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        placeholderTextColor="#A0A0A0"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor="#A0A0A0"
      />
      <TouchableOpacity
        style={styles.button}
        onPress={isLogin ? handleLogin : handleRegister}
      >
        <Text style={styles.buttonText}>{isLogin ? 'Login' : 'Register'}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.toggleButton}
        onPress={() => setIsLogin(!isLogin)}
      >
        <Text style={styles.toggleButtonText}>
          {isLogin ? "Don't have an account? Register" : 'Have an account? Login'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003366',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#ffd700',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ffd700',
    borderRadius: 5,
    backgroundColor: '#f0f4f8',
    color: '#003366',
  },
  button: {
    width: '100%',
    padding: 15,
    backgroundColor: '#ffd700',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#003366',
    fontWeight: 'bold',
    fontSize: 16,
  },
  toggleButton: {
    marginVertical: 10,
  },
  toggleButtonText: {
    color: '#ffd700',
    fontWeight: 'bold',
  },
});

export default SettingsScreen;
