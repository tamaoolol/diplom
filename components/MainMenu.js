import React from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';

const MainMenu = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Обучалка</Text>
      <Text style={styles.description}>Выбери тип задания</Text>
      <Button
        title="Тесты по языкам"
        onPress={() => navigation.navigate('Lesson')}
        color="#0782F9"
      />
      <Button
        title="Свободный редактор кода"
        onPress={() => navigation.navigate('FreeCodeEditor')}
        color="#0782F9"
        style={styles.button}
      />
      <Button
        title="Задачи в редакторе кода"
        onPress={() => navigation.navigate('Tasks')}
        color="#0782F9"
        style={styles.button}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333333',
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    color: '#666666',
  },
  button: {
    marginTop: 10,
  },
});

export default MainMenu;
