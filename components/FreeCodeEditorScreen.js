import React, { useState } from 'react';
import { View, Button, StyleSheet, ScrollView, Text, TextInput } from 'react-native';

const FreeCodeEditorScreen = () => {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');

  const runCode = () => {
    let resultOutput = '';
    const consoleLog = console.log;

    // Перехват console.log
    console.log = (message) => {
      resultOutput += message + '\n';
    };

    try {
      // Создаем новую функцию для выполнения кода
      const resultFunction = new Function(code);
      // Выполняем созданную функцию
      resultFunction();
    } catch (error) {
      resultOutput = 'Error: ' + error.message;
    }

    // Восстанавливаем оригинальный console.log
    console.log = consoleLog;
    setOutput(resultOutput.trim() || 'No output');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Редактор кода</Text>
      <TextInput
        style={styles.textInput}
        multiline
        numberOfLines={10}
        placeholder="Начни писать код JavaScript..."
        value={code}
        onChangeText={setCode}
      />
      <Button title="Запустить" onPress={runCode} />
      <Text style={styles.resultHeader}>Вывод:</Text>
      <Text style={styles.output}>{output}</Text>
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
});

export default FreeCodeEditorScreen;
