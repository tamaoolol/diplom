import React, { useState, useEffect } from 'react';
import { View, Button, StyleSheet, ScrollView, Text, TextInput } from 'react-native';

const CodeEditorScreen = ({ route }) => {
  const { task } = route.params;
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    if (task) {
      setCode(task.codeTemplate);
    }
  }, [task]);

  const runCode = () => {
    let resultOutput = '';
    const consoleLog = console.log;

    // Перехват console.log
    console.log = (message) => {
      resultOutput += message + '\n';
    };

    try {
      // Добавляем функцию к глобальной области видимости
      const functionCode = `
        ${code}
        return ${task.testFunction};
      `;

      // Создаем новую функцию для выполнения кода
      const resultFunction = new Function(functionCode);

      // Выполняем созданную функцию и получаем результат
      const result = resultFunction();

      // Проверяем результат
      resultOutput = result.toString();
      setIsCorrect(result.toString() === task.correctAnswer.toString());
    } catch (error) {
      resultOutput = 'Error: ' + error.message;
      setIsCorrect(false);
    }

    // Восстанавливаем оригинальный console.log
    console.log = consoleLog;
    setOutput(resultOutput.trim() || 'No output');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Задача</Text>
      {task && <Text style={styles.description}>{task.description}</Text>}
      <TextInput
        style={styles.textInput}
        multiline
        numberOfLines={10}
        placeholder="Write your JavaScript code here"
        value={code}
        onChangeText={setCode}
      />
      <Button title="Запустить" onPress={runCode} />
      <Text style={styles.resultHeader}>Вывод:</Text>
      <Text style={styles.output}>{output}</Text>
      {output && (
        <Text style={styles.result}>
          {isCorrect ? "Правильно!" : "Попробуй еще раз"}
        </Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
    color: '#666666',
  },
  textInput: {
    height: 200,
    borderColor: '#cccccc',
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
  },
  resultHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  output: {
    fontSize: 16,
    color: '#333333',
    marginTop: 10,
  },
  result: {
    marginTop: 20,
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
});

export default CodeEditorScreen;