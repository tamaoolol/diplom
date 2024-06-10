import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { signOut } from '../store';
import { auth } from './firebase';

const SettingsScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    auth.signOut().then(() => {
      dispatch(signOut());
      navigation.replace('Login');
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Хотите выйти с аккаунта?</Text>
      <Button title="Выход" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default SettingsScreen;