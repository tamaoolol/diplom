import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const tasks = [
  {
    id: 1,
    description: "Напишите функцию, которая возвращает сумму двух чисел.",
    codeTemplate: `function sum(a, b) {
  // Ваш код здесь
}`,
    correctAnswer: `5`,
    testFunction: `sum(2, 3)`,
  },
  {
    id: 2,
    description: "Напишите функцию, которая проверяет, является ли число четным.",
    codeTemplate: `function isEven(num) {
  // Ваш код здесь
}`,
    correctAnswer: `true`,
    testFunction: `isEven(2)`,
  },
  {
    id: 3,
    description: "Допишите функцию, которая возвращает квадрат числа.",
    codeTemplate: `function square(num) {
  // Ваш код здесь
}`,
    correctAnswer: `9`,
    testFunction: `square(3)`,
  },
  {
    id: 4,
    description: "Допишите функцию, которая возвращает первый элемент массива.",
    codeTemplate: `function getFirstElement(arr) {
  // Ваш код здесь
}`,
    correctAnswer: `1`,
    testFunction: `getFirstElement([1, 2, 3])`,
  },
  {
    id: 5,
    description: "Допишите функцию, которая проверяет, является ли строка пустой.",
    codeTemplate: `function isEmptyString(str) {
  // Ваш код здесь
}`,
    correctAnswer: `true`,
    testFunction: `isEmptyString('')`,
  },
];

const TasksScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Задачи для обучения</Text>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.taskContainer}
            onPress={() => navigation.navigate('CodeEditor', { task: item })}
          >
            <Text style={styles.taskDescription}>{item.description}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333333',
    textAlign: 'center',
  },
  taskContainer: {
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#dddddd',
  },
  taskDescription: {
    fontSize: 18,
    color: '#333333',
  },
});

export default TasksScreen;
