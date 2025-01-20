import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { useTheme } from './ThemeContext';
import { db } from './firebase';

const TaskDetailsScreen = ({ route }) => {
  const { language, section } = route.params;
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const { theme } = useTheme();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasksSnapshot = await db.collection('tasks')
          .doc(language)
          .collection('sections')
          .doc(section)
          .collection('tasks')
          .get();
        const tasksData = tasksSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setTasks(tasksData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching tasks: ', error);
        setLoading(false);
      }
    };

    fetchTasks();
  }, [language, section]);

  const handleAnswerSubmit = (correctAnswer) => {
    if (correctAnswer.trim().toLowerCase() === userAnswer.trim().toLowerCase()) {
      setFeedback('Правильно!');
    } else {
      setFeedback('Ошибка. Попробуйте снова.');
    }
    setUserAnswer('');
  };

  const renderTaskItem = ({ item }) => (
    <View style={[styles.taskContainer, { backgroundColor: theme.buttonBackground }]}>
      <Text style={[styles.taskText, { color: theme.text }]}>{item.question}</Text>
      <Text style={[styles.taskText, { color: theme.text }]}>{item.codeTemplate}</Text>
      <TextInput
        style={[styles.input, { color: theme.text, borderColor: theme.text }]}
        placeholder="Ваш ответ"
        placeholderTextColor={theme.text}
        value={userAnswer}
        onChangeText={setUserAnswer}
      />
      <Button title="Отправить" onPress={() => handleAnswerSubmit(item.correctAnswer)} />
      {feedback ? (
        <Text style={[styles.feedback, { color: feedback === 'Правильно!' ? 'green' : 'red' }]}>{feedback}</Text>
      ) : null}
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.header, { color: theme.text }]}>Задачи для {language} - {section}</Text>
      {loading ? (
        <ActivityIndicator size="large" color={theme.text} />
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={renderTaskItem}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  taskContainer: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#dddddd',
  },
  taskText: {
    fontSize: 18,
  },
  list: {
    paddingHorizontal: 10,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  feedback: {
    fontSize: 16,
    marginTop: 10,
  },
});

export default TaskDetailsScreen;
